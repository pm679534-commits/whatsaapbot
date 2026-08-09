-- Migration: wa_accounts cədvəlinə owner_phone sütunu əlavə et
-- Sahə 2-dən gələn şəxsi nömrə (bildirişlər üçün) saxlanılır.
-- Sütun artıq varsa xəta verməsin.

ALTER TABLE wa_accounts
  ADD COLUMN IF NOT EXISTS owner_phone TEXT;

COMMENT ON COLUMN wa_accounts.owner_phone IS
  'Sahibin şəxsi WhatsApp nömrəsi (yalnız rəqəmlər, 10–15 simvol). AI cavab verə bilmədikdə bildiriş göndərilir.';
