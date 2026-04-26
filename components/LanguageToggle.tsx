'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('nav');

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'am' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button onClick={toggleLocale} aria-label="Toggle language" style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      padding: '0.45rem 0.85rem', background: 'rgba(139,105,20,0.06)',
      border: '1.5px solid var(--color-border)', borderRadius: '100px',
      color: 'var(--color-accent)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
      transition: 'all 0.3s ease',
      fontFamily: locale === 'en' ? 'var(--font-ethiopic)' : 'var(--font-body)',
    }}>
      <Globe size={14} /> {t('language')}
    </button>
  );
}
