'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageToggle from './LanguageToggle';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer style={{
      background: 'var(--color-background-light)',
      borderTop: '1px solid rgba(212, 168, 67, 0.1)',
      padding: '4rem 0 2rem',
    }}>
      <div className="section-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #D4A843, #B8912E)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                fontWeight: 800,
                color: '#0D0907',
              }}>
                SP
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>
                Studio Palm
              </span>
            </div>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '280px' }}>
              {t('tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {t('links')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/" style={{ color: 'var(--color-ivory-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>{tNav('home')}</Link>
              <Link href="/cast" style={{ color: 'var(--color-ivory-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>{tNav('cast')}</Link>
              <Link href="/trailer" style={{ color: 'var(--color-ivory-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>{tNav('trailer')}</Link>
              <Link href="/subscribe" style={{ color: 'var(--color-ivory-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>{tNav('subscribe')}</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {t('legal')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <span style={{ color: 'var(--color-ivory-muted)', fontSize: '0.9rem' }}>{t('privacy')}</span>
              <span style={{ color: 'var(--color-ivory-muted)', fontSize: '0.9rem' }}>{t('terms')}</span>
              <span style={{ color: 'var(--color-ivory-muted)', fontSize: '0.9rem' }}>{t('contact')}</span>
            </div>
          </div>

          {/* Language */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Language
            </h4>
            <LanguageToggle />
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(212, 168, 67, 0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Studio Palm Tree. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
