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
    <div className="card-hover" style={{
      position: 'relative', borderRadius: '12px', overflow: 'hidden',
      background: 'var(--color-surface)', border: '1px solid rgba(212,168,67,0.1)',
      minWidth: compact ? '200px' : undefined, flex: compact ? '0 0 200px' : undefined,
    }}>
      <div style={{
        aspectRatio: compact ? '3/4' : '4/5',
        background: photoUrl ? `url(${photoUrl}) center/cover` : 'linear-gradient(180deg, var(--color-surface-light), var(--color-brown-deep))',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(transparent, rgba(13,9,7,0.95))' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem' }}>
          <h3 style={{
            fontFamily: locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-heading)',
            fontSize: compact ? '0.95rem' : '1.1rem', fontWeight: 700, color: 'var(--color-ivory)', marginBottom: '0.2rem',
          }}>{name}</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 500 }}>
            {t('as')} {role}
          </p>
        </div>
      </div>
      {!compact && bio && (
        <div style={{ padding: '1rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.7, fontFamily: locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-body)' }}>{bio}</p>
        </div>
      )}
    </div>
  );
}
