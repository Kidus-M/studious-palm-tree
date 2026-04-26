'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import LanguageToggle from './LanguageToggle';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const t = useTranslations('nav');
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHeroSection, setIsHeroSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsHeroSection(window.scrollY < window.innerHeight - 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = isHeroSection && pathname === '/';
  const textColor = isDark ? '#F5F0E8' : 'var(--color-foreground)';
  const activeColor = isDark ? '#D4A843' : 'var(--color-primary)';
  const mutedColor = isDark ? 'rgba(245,240,232,0.6)' : 'var(--color-muted)';

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/cast', label: t('cast') },
    { href: '/trailer', label: t('trailer') },
    { href: '/subscribe', label: t('subscribe') },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: isScrolled ? '0.6rem 0' : '1.25rem 0',
      background: isScrolled ? 'rgba(250,250,248,0.85)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--color-border-light)' : 'none',
      transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)',
    }}>
      <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '38px', height: '38px',
            background: isDark ? 'linear-gradient(135deg, #D4A843, #B8912E)' : 'var(--color-accent)',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-heading)',
            transition: 'all 0.4s ease',
          }}>SP</div>
          <span style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: textColor,
            transition: 'color 0.4s ease',
          }}>Studio Palm</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          <div style={{ display: 'flex', gap: '1.75rem' }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{
                textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem',
                color: pathname === link.href ? activeColor : mutedColor,
                transition: 'color 0.3s ease',
              }}>{link.label}</Link>
            ))}
          </div>
          <LanguageToggle />
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: mutedColor, fontSize: '0.85rem' }}>{session.user.name}</span>
              <button onClick={() => signOut()} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>{t('logout')}</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link href="/login" className="btn-secondary" style={{ padding: '0.55rem 1.35rem', fontSize: '0.85rem' }}>{t('login')}</Link>
              <Link href="/register" className="btn-primary" style={{ padding: '0.55rem 1.35rem', fontSize: '0.85rem' }}>{t('register')}</Link>
            </div>
          )}
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-toggle" style={{
          display: 'none', background: 'none', border: 'none', color: textColor, cursor: 'pointer',
        }}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(250,250,248,0.97)', backdropFilter: 'blur(20px)',
          padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-border)',
          display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
              textDecoration: 'none', color: pathname === link.href ? 'var(--color-primary)' : 'var(--color-foreground-soft)',
              fontWeight: 500, fontSize: '1.05rem', padding: '0.4rem 0',
            }}>{link.label}</Link>
          ))}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <LanguageToggle />
            {!session && (
              <>
                <Link href="/login" className="btn-secondary" style={{ textAlign: 'center' }}>{t('login')}</Link>
                <Link href="/register" className="btn-primary" style={{ textAlign: 'center' }}>{t('register')}</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
