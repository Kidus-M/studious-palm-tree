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
  id,
  episodeNumber,
  titleEn,
  titleAm,
  thumbnailUrl,
  durationSec,
  isFree,
  isUnlocked,
}: EpisodeCardProps) {
  const locale = useLocale();
  const t = useTranslations('episodes');
  const title = locale === 'am' ? titleAm : titleEn;
  const minutes = Math.floor(durationSec / 60);
  const canWatch = isFree || isUnlocked;

  return (
    <div className="card-hover" style={{
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      background: 'var(--color-surface)',
      border: '1px solid rgba(212, 168, 67, 0.1)',
    }}>
      {/* Thumbnail */}
      <div style={{
        position: 'relative',
        aspectRatio: '16/9',
        background: thumbnailUrl
          ? `url(${thumbnailUrl}) center/cover`
          : 'linear-gradient(135deg, var(--color-surface), var(--color-brown-deep))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Episode Number Overlay */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          background: 'rgba(0,0,0,0.7)',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--color-ivory-muted)',
        }}>
          {t('episode')} {episodeNumber}
        </div>

        {/* Free Badge */}
        {isFree && (
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'linear-gradient(135deg, #4A6741, #3A5233)',
            padding: '0.25rem 0.6rem',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {t('free')}
          </div>
        )}

        {/* Duration */}
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '0.75rem',
          background: 'rgba(0,0,0,0.7)',
          padding: '0.2rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          color: 'var(--color-ivory-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
        }}>
          <Clock size={12} />
          {minutes} {t('minutes')}
        </div>

        {/* Lock Overlay */}
        {!canWatch && (
          <div className="lock-overlay" style={{ borderRadius: '12px 12px 0 0' }}>
            <div style={{ textAlign: 'center' }}>
              <Lock size={28} style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }} />
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{t('locked')}</p>
            </div>
          </div>
        )}

        {/* Play Button */}
        {canWatch && (
          <Link href={`/watch/${id}`} style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(212, 168, 67, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 2,
          }}>
            <Play size={20} fill="#0D0907" color="#0D0907" />
          </Link>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '1rem' }}>
        <h3 style={{
          fontFamily: locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-heading)',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--color-ivory)',
          marginBottom: '0.25rem',
        }}>
          {title}
        </h3>
      </div>
    </div>
  );
}
