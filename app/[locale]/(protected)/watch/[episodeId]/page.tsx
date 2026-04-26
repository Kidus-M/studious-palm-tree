'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useSession } from '@/lib/auth-client';
import { Link } from '@/i18n/navigation';
import SecureVideoPlayer from '@/components/SecureVideoPlayer';
import { Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { use } from 'react';

export default function WatchPage({ params }: { params: Promise<{ episodeId: string }> }) {
  const { episodeId } = use(params);
  const t = useTranslations('watch');
  const tEp = useTranslations('episodes');
  const locale = useLocale();
  const { data: session } = useSession();
  const fontFamily = locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-heading)';

  // If no session, show access denied
  if (!session) {
    return (
      <div className="section-container section-padding" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Lock size={48} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem' }} />
        <h1 style={{ fontFamily, fontSize: '2rem', marginBottom: '0.75rem' }}>
          <span className="gold-text">{t('accessDenied')}</span>
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', maxWidth: '400px', marginBottom: '2rem' }}>
          {t('accessDeniedMsg')}
        </p>
        <Link href="/subscribe" className="btn-primary">{t('subscribeCta')}</Link>
      </div>
    );
  }

  // Signed video URL — in production this would come from the server
  const videoSrc = `/api/stream/${episodeId}`;

  return (
    <div className="section-container section-padding">
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          {tEp('episode')} {episodeId}
        </p>
        <h1 style={{ fontFamily, fontSize: '1.5rem' }}>
          <span className="gold-text">{tEp('sectionTitle')}</span>
        </h1>
      </div>

      <SecureVideoPlayer
        src={videoSrc}
        watermarkText={session.user.email}
        poster="/hero-banner.png"
      />

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href={`/watch/${Math.max(1, Number(episodeId) - 1)}`} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} /> {t('prevEpisode')}
        </Link>
        <Link href={`/watch/${Number(episodeId) + 1}`} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {t('nextEpisode')} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
