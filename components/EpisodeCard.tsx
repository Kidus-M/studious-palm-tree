'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Lock, Play, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface EpisodeCardProps {
  id: string;
  episodeNumber: number;
  titleEn: string;
  titleAm: string;
  thumbnailUrl?: string;
  durationSec: number;
  isFree: boolean;
  isUnlocked: boolean;
}

export default function EpisodeCard({
  id, episodeNumber, titleEn, titleAm, thumbnailUrl, durationSec, isFree, isUnlocked,
}: EpisodeCardProps) {
  const locale = useLocale();
  const t = useTranslations('episodes');
  const title = locale === 'am' ? titleAm : titleEn;
  const minutes = Math.floor(durationSec / 60);
  const canWatch = isFree || isUnlocked;

  return (
    <div className="float-card" style={{
      position: 'relative', background: 'var(--color-surface)',
      border: '1px solid var(--color-border-light)',
      boxShadow: '0 2px 20px rgba(59,35,20,0.04)',
    }}>
      <div style={{
        position: 'relative', aspectRatio: '16/9',
        background: thumbnailUrl ? `url(${thumbnailUrl}) center/cover`
          : 'linear-gradient(135deg, var(--color-background-warm), var(--color-border))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          position: 'absolute', top: '0.75rem', left: '0.75rem',
          background: 'var(--color-accent)', color: '#FFF',
          padding: '0.25rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700,
        }}>
          {t('episode')} {episodeNumber}
        </div>

        {isFree && (
          <div style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem',
            background: 'linear-gradient(135deg, #4A6741, #5C8253)', color: '#FFF',
            padding: '0.25rem 0.7rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>{t('free')}</div>
        )}

        <div style={{
          position: 'absolute', bottom: '0.75rem', right: '0.75rem',
          background: 'rgba(0,0,0,0.6)', color: '#FFF',
          padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.75rem',
          display: 'flex', alignItems: 'center', gap: '0.3rem',
        }}>
          <Clock size={12} /> {minutes} {t('minutes')}
        </div>

        {!canWatch && (
          <div className="lock-overlay" style={{ borderRadius: '20px 20px 0 0' }}>
            <div style={{ textAlign: 'center' }}>
              <Lock size={24} style={{ color: 'var(--color-primary)', marginBottom: '0.4rem' }} />
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 500 }}>{t('locked')}</p>
            </div>
          </div>
        )}

        {canWatch && (
          <Link href={`/watch/${id}`} style={{
            width: '50px', height: '50px', borderRadius: '50%',
            background: 'var(--color-accent)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 2,
            transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
            boxShadow: '0 8px 30px rgba(59,35,20,0.2)',
          }}>
            <Play size={18} fill="#FFF" color="#FFF" />
          </Link>
        )}
      </div>

      <div style={{ padding: '1.15rem' }}>
        <h3 style={{
          fontFamily: locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-heading)',
          fontSize: '1rem', fontWeight: 600, color: 'var(--color-foreground)',
        }}>{title}</h3>
      </div>
    </div>
  );
}
