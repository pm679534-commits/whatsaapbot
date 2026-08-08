'use client'

import Script from 'next/script'

export default function FacebookSDK() {
  return (
    <Script
      src="https://connect.facebook.net/en_US/sdk.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (window.FB) {
          window.FB.init({
            appId: process.env.NEXT_PUBLIC_META_APP_ID,
            version: 'v23.0',
          })
        }
      }}
    />
  )
}
