'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Play } from 'lucide-react';

export default function TrailerPage() {
  const t = useTranslations('trailer');
  const locale = useLocale();
  const fontFamily = locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-heading)';

  return (
    <div style={{ paddingTop: '7rem' }}>
      <div className="section-container section-padding">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="section-title" style={{ fontFamily }}>
            <span className="gold-text">{t('pageTitle')}</span>
          </h1>
          <div className="ethiopic-divider" style={{ margin: '1rem auto' }} />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>{t('pageSubtitle')}</p>
        </div>

        {/* Trailer Player */}
        <div style={{
          maxWidth: '960px', margin: '0 auto 4rem', borderRadius: '16px', overflow: 'hidden',
          border: '1px solid rgba(212,168,67,0.15)', background: '#000',
        }}>
          <div style={{
            aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage: 'url(/hero-banner.png)', backgroundSize: 'cover', backgroundPosition: 'center',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.4)',
            }} />
            <button style={{
              position: 'relative', zIndex: 2, width: '80px', height: '80px', borderRadius: '50%',
              background: 'rgba(212,168,67,0.9)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease',
            }} className="animate-pulse-gold">
              <Play size={32} fill="#0D0907" color="#0D0907" />
            </button>
          </div>
        </div>

        {/* Behind the Scenes */}
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h2 style={{ fontFamily, fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-ivory)' }}>
            {t('behindScenes')}
          </h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem',
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                aspectRatio: '16/9', borderRadius: '8px',
                background: `linear-gradient(${135 + i * 30}deg, var(--color-surface), var(--color-brown-deep))`,
                border: '1px solid rgba(212,168,67,0.08)',
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
