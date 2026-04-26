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
    <button
      onClick={toggleLocale}
      aria-label="Toggle language"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem 0.75rem',
        background: 'rgba(212, 168, 67, 0.08)',
        border: '1px solid rgba(212, 168, 67, 0.2)',
        borderRadius: '6px',
        color: 'var(--color-primary)',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        fontFamily: locale === 'en' ? 'var(--font-ethiopic)' : 'var(--font-body)',
      }}
    >
      <Globe size={14} />
      {t('language')}
    </button>
  );
}
