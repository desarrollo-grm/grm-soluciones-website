'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function Providers({ children }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not configured.');
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey || ''}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
