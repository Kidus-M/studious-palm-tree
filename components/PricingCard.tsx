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
    <div className={isHighlighted ? '' : 'glass-card'} style={{
      position: 'relative', borderRadius: '24px', overflow: 'hidden',
      padding: isHighlighted ? '2.5rem' : '2rem',
      background: isHighlighted ? 'var(--color-accent)' : undefined,
      color: isHighlighted ? '#F5F0E8' : 'var(--color-foreground)',
      display: 'flex', flexDirection: 'column',
      transform: isHighlighted ? 'scale(1.05)' : undefined,
      transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)',
      boxShadow: isHighlighted ? '0 30px 80px rgba(59,35,20,0.2)' : undefined,
    }}>
      {popular && (
        <div style={{
          position: 'absolute', top: '1.25rem', right: '-2.5rem',
          background: 'linear-gradient(135deg, #D4A843, #C49B2A)', color: '#0D0907',
          fontSize: '0.65rem', fontWeight: 800, padding: '0.35rem 3rem',
          transform: 'rotate(45deg)', textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>{popular}</div>
      )}
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>{name}</h3>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '0.5rem' }}>
        <span style={{
          fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1,
          color: isHighlighted ? '#D4A843' : undefined,
          ...(isHighlighted ? {} : { background: 'linear-gradient(135deg, #6B4F0E, #8B6914)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }),
        }}>{price}</span>
        <span style={{ color: isHighlighted ? 'rgba(245,240,232,0.6)' : 'var(--color-muted)', fontSize: '0.9rem' }}>{currency}</span>
      </div>
      <p style={{ color: isHighlighted ? 'rgba(245,240,232,0.7)' : 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6 }}>{description}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem', flex: 1 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
              background: isHighlighted ? 'rgba(212,168,67,0.2)' : 'var(--color-background-warm)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Check size={12} style={{ color: isHighlighted ? '#D4A843' : 'var(--color-primary)' }} />
            </div>
            <span style={{ fontSize: '0.9rem', color: isHighlighted ? 'rgba(245,240,232,0.9)' : 'var(--color-foreground-soft)' }}>{f}</span>
          </div>
        ))}
      </div>
      <button onClick={onSelect} style={{
        width: '100%', padding: '1rem', borderRadius: '100px', fontFamily: 'var(--font-heading)',
        fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', border: 'none',
        background: isHighlighted ? 'linear-gradient(135deg, #D4A843, #C49B2A)' : 'var(--color-accent)',
        color: isHighlighted ? '#0D0907' : '#FFFFFF',
        transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
      }}>{cta}</button>
    </div>
  );
}
