'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageToggle from './LanguageToggle';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer style={{
      background: 'var(--color-accent)', color: '#F5F0E8', padding: '5rem 0 2rem',
    }}>
      <div className="section-container">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem', marginBottom: '3rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '34px', height: '34px', background: 'linear-gradient(135deg, #D4A843, #B8912E)',
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem', fontWeight: 800, color: '#0D0907',
              }}>SP</div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>Studio Palm</span>
            </div>
            <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '260px' }}>{t('tagline')}</p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: '#D4A843', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('links')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[{ href: '/', label: tNav('home') }, { href: '/cast', label: tNav('cast') }, { href: '/trailer', label: tNav('trailer') }, { href: '/subscribe', label: tNav('subscribe') }].map((l) => (
                <Link key={l.href} href={l.href} style={{ color: 'rgba(245,240,232,0.6)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}>{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: '#D4A843', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('legal')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <span style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.9rem' }}>{t('privacy')}</span>
              <span style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.9rem' }}>{t('terms')}</span>
              <span style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.9rem' }}>{t('contact')}</span>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: '#D4A843', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Language</h4>
            <LanguageToggle />
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(245,240,232,0.1)', paddingTop: '1.75rem', textAlign: 'center' }}>
          <p style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.85rem' }}>© {new Date().getFullYear()} Studio Palm Tree. {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
