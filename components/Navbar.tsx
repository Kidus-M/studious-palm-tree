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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/cast', label: t('cast') },
    { href: '/trailer', label: t('trailer') },
    { href: '/subscribe', label: t('subscribe') },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isScrolled ? '0.75rem 0' : '1.25rem 0',
        background: isScrolled ? 'rgba(13, 9, 7, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(212, 168, 67, 0.1)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #D4A843, #B8912E)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            fontWeight: 800,
            color: '#0D0907',
            fontFamily: 'var(--font-heading)',
          }}>
            SP
          </div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'var(--color-ivory)',
          }}>
            Studio Palm
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
          className="desktop-nav"
        >
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  color: pathname === link.href ? 'var(--color-primary)' : 'var(--color-ivory-muted)',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  transition: 'color 0.3s ease',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <LanguageToggle />

          {/* Auth Buttons */}
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
                {session.user.name}
              </span>
              <button
                onClick={() => signOut()}
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link href="/login" className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
                {t('login')}
              </Link>
              <Link href="/register" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
                {t('register')}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-toggle"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--color-ivory)',
            cursor: 'pointer',
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(13, 9, 7, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '1.5rem',
          borderBottom: '1px solid rgba(212, 168, 67, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                textDecoration: 'none',
                color: pathname === link.href ? 'var(--color-primary)' : 'var(--color-ivory-muted)',
                fontWeight: 500,
                fontSize: '1.1rem',
                padding: '0.5rem 0',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ borderTop: '1px solid rgba(212, 168, 67, 0.1)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <LanguageToggle />
            {session ? (
              <button onClick={() => signOut()} className="btn-secondary" style={{ width: '100%' }}>
                {t('logout')}
              </button>
            ) : (
              <>
                <Link href="/login" className="btn-secondary" style={{ textAlign: 'center', width: '100%' }}>
                  {t('login')}
                </Link>
                <Link href="/register" className="btn-primary" style={{ textAlign: 'center', width: '100%' }}>
                  {t('register')}
                </Link>
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
