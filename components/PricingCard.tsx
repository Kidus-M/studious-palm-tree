'use client';

import { Check } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: string;
  currency: string;
  description: string;
  features: string[];
  cta: string;
  popular?: string;
  isHighlighted?: boolean;
  onSelect: () => void;
}

export default function PricingCard({
  name, price, currency, description, features, cta, popular, isHighlighted, onSelect,
}: PricingCardProps) {
  return (
    <div className="card-hover" style={{
      position: 'relative', borderRadius: '16px', overflow: 'hidden',
      background: isHighlighted ? 'linear-gradient(180deg, rgba(212,168,67,0.08), rgba(212,168,67,0.02))' : 'var(--color-surface)',
      border: isHighlighted ? '2px solid var(--color-primary)' : '1px solid rgba(212,168,67,0.1)',
      padding: '2rem', display: 'flex', flexDirection: 'column',
      transform: isHighlighted ? 'scale(1.05)' : undefined,
    }}>
      {popular && (
        <div style={{
          position: 'absolute', top: '1rem', right: '-2rem',
          background: 'linear-gradient(135deg, #D4A843, #B8912E)',
          color: '#0D0907', fontSize: '0.7rem', fontWeight: 700,
          padding: '0.3rem 2.5rem', transform: 'rotate(45deg)',
          textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>{popular}</div>
      )}
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-ivory)', marginBottom: '0.5rem' }}>{name}</h3>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.5rem' }}>
        <span className="gold-text" style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{price}</span>
        <span style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>{currency}</span>
      </div>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{description}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', flex: 1 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Check size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--color-ivory-muted)' }}>{f}</span>
          </div>
        ))}
      </div>
      <button onClick={onSelect} className={isHighlighted ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%' }}>{cta}</button>
    </div>
  );
}
