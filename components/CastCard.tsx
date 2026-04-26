'use client';

import { useLocale, useTranslations } from 'next-intl';

interface CastCardProps {
  nameEn: string;
  nameAm: string;
  roleEn: string;
  roleAm: string;
  photoUrl?: string;
  bioEn?: string;
  bioAm?: string;
  compact?: boolean;
}

export default function CastCard({
  nameEn, nameAm, roleEn, roleAm, photoUrl, bioEn, bioAm, compact = false,
}: CastCardProps) {
  const locale = useLocale();
  const t = useTranslations('cast');
  const name = locale === 'am' ? nameAm : nameEn;
  const role = locale === 'am' ? roleAm : roleEn;
  const bio = locale === 'am' ? bioAm : bioEn;

  return (
    <div className="float-card" style={{
      position: 'relative', overflow: 'hidden',
      background: 'var(--color-surface)', border: '1px solid var(--color-border-light)',
      boxShadow: '0 2px 20px rgba(59,35,20,0.04)',
      minWidth: compact ? '220px' : undefined, flex: compact ? '0 0 220px' : undefined,
    }}>
      <div style={{
        aspectRatio: compact ? '3/4' : '4/5',
        background: photoUrl ? `url(${photoUrl}) center/cover`
          : 'linear-gradient(180deg, var(--color-background-warm) 0%, var(--color-border) 100%)',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(transparent, rgba(59,35,20,0.85))' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.15rem' }}>
          <h3 style={{
            fontFamily: locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-heading)',
            fontSize: compact ? '1rem' : '1.15rem', fontWeight: 700, color: '#F5F0E8', marginBottom: '0.2rem',
          }}>{name}</h3>
          <p style={{ fontSize: '0.8rem', color: '#D4A843', fontWeight: 600 }}>{t('as')} {role}</p>
        </div>
      </div>
      {!compact && bio && (
        <div style={{ padding: '1.15rem' }}>
          <p style={{
            fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.7,
            fontFamily: locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-body)',
          }}>{bio}</p>
        </div>
      )}
    </div>
  );
}
