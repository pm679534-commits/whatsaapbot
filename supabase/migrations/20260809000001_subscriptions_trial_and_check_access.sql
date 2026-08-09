-- ─────────────────────────────────────────────────────────────────────────────
-- 1. subscriptions cədvəli (yoxdursa yarat)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS subscriptions (
  id                 UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id          UUID        NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  status             TEXT        NOT NULL DEFAULT 'active'
                                 CHECK (status IN ('active', 'expired', 'cancelled')),
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_tenant_id
  ON subscriptions (tenant_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Trigger: yeni tenant yarananda 3 günlük sınaq abunəsi avtomatik əlavə et
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION trg_fn_create_trial_subscription()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO subscriptions (tenant_id, status, current_period_end)
  VALUES (NEW.id, 'active', now() + INTERVAL '3 days');
  RETURN NEW;
END;
$$;

-- Trigger artıq varsa sil, yenidən qur (idempotent)
DROP TRIGGER IF EXISTS trg_after_tenant_insert ON tenants;

CREATE TRIGGER trg_after_tenant_insert
  AFTER INSERT ON tenants
  FOR EACH ROW
  EXECUTE FUNCTION trg_fn_create_trial_subscription();

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. fn_check_access: tenant-ın aktiv abunəsi var və müddəti keçməyib?
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION fn_check_access(p_tenant_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_sub RECORD;
BEGIN
  -- Ən son abunəni götür
  SELECT status, current_period_end
  INTO   v_sub
  FROM   subscriptions
  WHERE  tenant_id = p_tenant_id
  ORDER  BY created_at DESC
  LIMIT  1;

  -- Abunə yoxdur
  IF NOT FOUND THEN
    RETURN jsonb_build_object('allowed', false, 'reason', 'no_subscription');
  END IF;

  -- Müddət keçib (status aktiv olsa belə)
  IF v_sub.current_period_end < now() THEN
    RETURN jsonb_build_object('allowed', false, 'reason', 'trial_expired');
  END IF;

  -- Status aktiv deyil
  IF v_sub.status <> 'active' THEN
    RETURN jsonb_build_object('allowed', false, 'reason', 'inactive');
  END IF;

  RETURN jsonb_build_object('allowed', true, 'reason', 'active');
END;
$$;
