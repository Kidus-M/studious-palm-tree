'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useSession } from '@/lib/auth-client';
import { useRouter } from '@/i18n/navigation';
import PricingCard from '@/components/PricingCard';
import { useState } from 'react';

export default function SubscribePage() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const fontFamily = locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-heading)';

  const handleSelect = async (plan: string) => {
    if (!session) { router.push('/login'); return; }
    if (plan === 'FREE') return;
    setLoading(true);
    try {
      const res = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch (err) {
      console.error('Payment init failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container" style={{ maxWidth: '1000px', width: '100%', padding: '2rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="section-title" style={{ fontFamily }}>
          <span className="gold-text">{t('sectionTitle')}</span>
        </h1>
        <div className="ethiopic-divider" style={{ margin: '1rem auto' }} />
        <p className="section-subtitle" style={{ margin: '0 auto' }}>{t('subtitle')}</p>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem', alignItems: 'center',
      }}>
        <PricingCard
          name={t('free.name')} price={t('free.price')} currency={t('free.currency')}
          description={t('free.description')}
          features={[t('free.features.0'), t('free.features.1'), t('free.features.2')]}
          cta={t('free.cta')} onSelect={() => handleSelect('FREE')}
        />
        <PricingCard
          name={t('season.name')} price={t('season.price')} currency={t('season.currency')}
          description={t('season.description')}
          features={[t('season.features.0'), t('season.features.1'), t('season.features.2'), t('season.features.3'), t('season.features.4')]}
          cta={loading ? '...' : t('season.cta')} popular={t('season.popular')} isHighlighted
          onSelect={() => handleSelect('FULL_SEASON')}
        />
        <PricingCard
          name={t('episode.name')} price={t('episode.price')} currency={t('episode.currency')}
          description={t('episode.description')}
          features={[t('episode.features.0'), t('episode.features.1'), t('episode.features.2'), t('episode.features.3')]}
          cta={t('episode.cta')} onSelect={() => handleSelect('PER_EPISODE')}
        />
      </div>
    </div>
  );
}
