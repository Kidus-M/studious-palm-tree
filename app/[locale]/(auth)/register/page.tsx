'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { signUp } from '@/lib/auth-client';
import { UserPlus, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fontFamily = locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-heading)';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);
    try {
      const result = await signUp.email({ email, password, name });
      if (result.error) {
        setError(result.error.message || 'Registration failed');
      } else {
        router.push('/');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container" style={{ maxWidth: '440px', width: '100%' }}>
      <div className="glass" style={{ borderRadius: '16px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily, fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            <span className="gold-text">{t('registerTitle')}</span>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>{t('registerSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="form-label">{t('name')}</label>
            <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="form-label">{t('email')}</label>
            <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div>
            <label className="form-label">{t('phone')}</label>
            <input type="tel" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+251..." />
          </div>
          <div>
            <label className="form-label">{t('password')}</label>
            <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <div>
            <label className="form-label">{t('confirmPassword')}</label>
            <input type="password" className="form-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="••••••••" />
          </div>

          {error && <p style={{ color: 'var(--color-danger)', fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '0.5rem' }}>
            {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <UserPlus size={18} />}
            {t('registerBtn')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
            {t('hasAccount')}{' '}
            <Link href="/login" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              {t('loginBtn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
