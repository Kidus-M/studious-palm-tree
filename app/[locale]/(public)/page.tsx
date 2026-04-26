'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Play, ChevronDown, Star, Film, Heart, ArrowRight } from 'lucide-react';
import CastCard from '@/components/CastCard';
import EpisodeCard from '@/components/EpisodeCard';
import PricingCard from '@/components/PricingCard';

gsap.registerPlugin(ScrollTrigger);

const castMembers = [
  { nameEn: 'Abebe Tadesse', nameAm: 'አበበ ታደሰ', roleEn: 'Dawit', roleAm: 'ዳዊት', bioEn: 'A father navigating a changing Ethiopia.', bioAm: 'ኢትዮጵያን በለውጥ ውስጥ የሚመራ አባት።' },
  { nameEn: 'Sara Mengistu', nameAm: 'ሳራ መንግሥቱ', roleEn: 'Tigist', roleAm: 'ትግስት', bioEn: 'A young woman fighting for her dreams.', bioAm: 'ለህልሟ የምትታገል ወጣት ሴት።' },
  { nameEn: 'Yonas Bekele', nameAm: 'ዮናስ በቀለ', roleEn: 'Solomon', roleAm: 'ሰሎሞን', bioEn: 'A loyal friend with a hidden past.', bioAm: 'የተደበቀ ያለፈ ታሪክ ያለው ታማኝ ጓደኛ።' },
  { nameEn: 'Hiwot Alemayehu', nameAm: 'ሕይወት አለማየሁ', roleEn: 'Meron', roleAm: 'መሮን', bioEn: 'The matriarch holding everything together.', bioAm: 'ሁሉንም የምታስተሳስር እናት።' },
  { nameEn: 'Dereje Hailu', nameAm: 'ደረጀ ኃይሉ', roleEn: 'Ato Kebede', roleAm: 'አቶ ከበደ', bioEn: 'A businessman with questionable morals.', bioAm: 'አጠራጣሪ ሥነ ምግባር ያለው ነጋዴ።' },
];

const episodes = [
  { id: '1', episodeNumber: 1, titleEn: 'New Dawn', titleAm: 'አዲስ ንጋት', durationSec: 2700, isFree: true },
  { id: '2', episodeNumber: 2, titleEn: 'Crossroads', titleAm: 'መንገድ ላይ', durationSec: 2580, isFree: false },
  { id: '3', episodeNumber: 3, titleEn: 'Echoes', titleAm: 'ድምጾች', durationSec: 2640, isFree: false },
  { id: '4', episodeNumber: 4, titleEn: 'The Promise', titleAm: 'ቃል ኪዳን', durationSec: 2820, isFree: false },
  { id: '5', episodeNumber: 5, titleEn: 'Unraveled', titleAm: 'የተፈታ', durationSec: 2760, isFree: false },
  { id: '6', episodeNumber: 6, titleEn: 'Homecoming', titleAm: 'መመለስ', durationSec: 3000, isFree: false },
];

export default function LandingPage() {
  const t = useTranslations();
  const locale = useLocale();
  const mainRef = useRef<HTMLDivElement>(null);
  const fontFamily = locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-heading)';

  useGSAP(() => {
    // ── Hero entrance timeline ──
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    heroTl
      .from('.hero-badge', { y: 30, opacity: 0, duration: 0.8 })
      .from('.hero-title-line', { y: '110%', opacity: 0, stagger: 0.15, duration: 1 }, '-=0.4')
      .from('.hero-subtitle-am', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
      .from('.hero-desc', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.hero-btn', { y: 20, opacity: 0, stagger: 0.12, duration: 0.6 }, '-=0.4')
      .from('.hero-scroll-indicator', { opacity: 0, y: -10, duration: 0.6 }, '-=0.2')
      .to('.hero-scroll-indicator', { y: 10, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut' });

    // ── Hero parallax background ──
    gsap.to('.hero-bg-img', {
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 },
      y: 200, scale: 1.1,
    });

    // ── Horizontal scroll line reveals ──
    gsap.utils.toArray<HTMLElement>('.scroll-line').forEach((line) => {
      gsap.to(line, {
        scrollTrigger: { trigger: line, start: 'top 90%' },
        scaleX: 1, duration: 1.2, ease: 'power3.inOut',
      });
    });

    // ── Section reveals ──
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      });
    });

    gsap.utils.toArray<HTMLElement>('.reveal-left').forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
      });
    });

    gsap.utils.toArray<HTMLElement>('.reveal-right').forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
      });
    });

    gsap.utils.toArray<HTMLElement>('.reveal-scale').forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        scale: 1, opacity: 1, duration: 1, ease: 'power3.out',
      });
    });

    // ── Staggered card reveals ──
    gsap.utils.toArray<HTMLElement>('.stagger-container').forEach((container) => {
      const items = container.querySelectorAll('.stagger-item');
      gsap.from(items, {
        scrollTrigger: { trigger: container, start: 'top 80%' },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      });
    });

    // ── Floating elements ──
    gsap.utils.toArray<HTMLElement>('.float-element').forEach((el, i) => {
      gsap.to(el, {
        y: '+=15', duration: 2.5 + i * 0.3, repeat: -1, yoyo: true, ease: 'power1.inOut',
      });
    });

    // ── Parallax sections ──
    gsap.utils.toArray<HTMLElement>('.parallax-slow').forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
        y: -40,
      });
    });

  }, { scope: mainRef });

  return (
    <div ref={mainRef}>
      {/* ══════════════ HERO (Dark) ══════════════ */}
      <section className="hero-section">
        <div className="hero-bg-img" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/hero-banner.png)', backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.3) saturate(0.8)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(13,9,7,0.4) 0%, rgba(13,9,7,0.2) 40%, rgba(13,9,7,0.85) 100%)',
        }} />

        {/* Decorative floating shapes */}
        <div className="float-element" style={{
          position: 'absolute', top: '15%', right: '10%', width: '120px', height: '120px',
          border: '1px solid rgba(212,168,67,0.1)', borderRadius: '50%',
        }} />
        <div className="float-element" style={{
          position: 'absolute', bottom: '25%', left: '8%', width: '80px', height: '80px',
          border: '1px solid rgba(212,168,67,0.08)', borderRadius: '12px', transform: 'rotate(45deg)',
        }} />

        <div className="section-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '10rem 2rem 6rem' }}>
          <div className="hero-badge" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 1.25rem',
            background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)',
            borderRadius: '100px', marginBottom: '2rem', fontSize: '0.9rem', color: '#D4A843',
            backdropFilter: 'blur(10px)',
          }}>
            <Film size={15} /> {t('about.era')}
          </div>

          <h1 style={{ fontFamily, fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800, lineHeight: 1.05, maxWidth: '900px', margin: '0 auto 1.5rem', letterSpacing: '-0.03em' }}>
            <span className="hero-title-line" style={{ display: 'block' }}>
              <span style={{ background: 'linear-gradient(135deg, #D4A843, #E8C76B, #D4A843)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t('hero.title')}
              </span>
            </span>
          </h1>

          <p className="hero-subtitle-am font-ethiopic" style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'rgba(245,240,232,0.6)',
            marginBottom: '1rem',
            fontFamily: locale === 'am' ? 'var(--font-heading)' : 'var(--font-ethiopic)',
          }}>
            {t('hero.titleAm')}
          </p>

          <p className="hero-desc" style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: 'rgba(245,240,232,0.5)',
            maxWidth: '550px', margin: '0 auto 3rem', lineHeight: 1.7,
          }}>
            {t('hero.subtitle')}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/subscribe" className="hero-btn" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '1.1rem 2.75rem',
              background: 'linear-gradient(135deg, #D4A843, #B8912E)', color: '#0D0907',
              borderRadius: '100px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none', border: 'none', cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
            }}>
              <Play size={18} fill="currentColor" /> {t('hero.cta')}
            </Link>
            <Link href="/trailer" className="hero-btn" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '1.1rem 2.75rem',
              background: 'transparent', color: '#F5F0E8',
              border: '1.5px solid rgba(245,240,232,0.2)', borderRadius: '100px',
              fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem',
              textDecoration: 'none', cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
            }}>
              {t('hero.ctaTrailer')}
            </Link>
          </div>

          <div className="hero-scroll-indicator" style={{ marginTop: '5rem' }}>
            <ChevronDown size={22} style={{ color: 'rgba(212,168,67,0.5)' }} />
          </div>
        </div>
      </section>

      {/* ══════════════ ABOUT (Light) ══════════════ */}
      <section className="section-padding" style={{ background: 'var(--color-background)' }}>
        <div className="section-container">
          <div className="scroll-line" style={{ marginBottom: '4rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <p className="reveal" style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                {t('about.era')}
              </p>
              <h2 className="reveal section-title" style={{ fontFamily }}>
                {t('about.sectionTitle')}
              </h2>
              <div className="reveal ethiopic-divider" />
              <p className="reveal" style={{
                fontSize: '1.1rem', color: 'var(--color-foreground-soft)', lineHeight: 1.85, marginBottom: '2rem',
                fontFamily: locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-body)',
              }}>
                {t('about.synopsis')}
              </p>
              <div className="reveal" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {(['drama', 'historical', 'romance'] as const).map((g) => (
                  <span key={g} style={{
                    padding: '0.5rem 1.15rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 500,
                    background: 'var(--color-background-warm)', color: 'var(--color-accent)', border: '1px solid var(--color-border)',
                  }}>
                    {g === 'drama' && <Star size={13} style={{ marginRight: 5, verticalAlign: 'middle' }} />}
                    {g === 'romance' && <Heart size={13} style={{ marginRight: 5, verticalAlign: 'middle' }} />}
                    {t(`about.genre.${g}`)}
                  </span>
                ))}
              </div>
            </div>
            <div className="reveal-scale" style={{
              aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden',
              background: 'url(/hero-banner.png) center/cover',
              boxShadow: '0 30px 80px rgba(59,35,20,0.12)',
            }}>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, transparent 60%, rgba(59,35,20,0.3))' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CAST (Warm) ══════════════ */}
      <section className="section-padding" style={{ background: 'var(--color-background-warm)' }}>
        <div className="section-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="reveal" style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                {t('cast.sectionTitle')}
              </p>
              <h2 className="reveal section-title" style={{ fontFamily, marginBottom: '0.5rem' }}>
                {t('cast.subtitle')}
              </h2>
            </div>
            <Link href="/cast" className="reveal btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
              {t('cast.viewAll')} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="stagger-container" style={{
            display: 'flex', gap: '1.25rem', overflowX: 'auto', paddingBottom: '1rem',
            scrollSnapType: 'x mandatory',
          }}>
            {castMembers.map((c, i) => (
              <div key={i} className="stagger-item" style={{ scrollSnapAlign: 'start' }}>
                <CastCard {...c} compact />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ EPISODES (White) ══════════════ */}
      <section className="section-padding" style={{ background: 'var(--color-surface)' }}>
        <div className="section-container">
          <div className="scroll-line" style={{ marginBottom: '4rem' }} />
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="reveal" style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
              {t('episodes.subtitle')}
            </p>
            <h2 className="reveal section-title" style={{ fontFamily }}>
              {t('episodes.sectionTitle')}
            </h2>
            <div className="reveal ethiopic-divider" style={{ margin: '1rem auto' }} />
          </div>
          <div className="stagger-container" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem',
          }}>
            {episodes.map((ep) => (
              <div key={ep.id} className="stagger-item">
                <EpisodeCard {...ep} isUnlocked={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PRICING (Cream) ══════════════ */}
      <section className="section-padding" style={{ background: 'var(--color-background-cream)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="reveal" style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
              {t('pricing.sectionTitle')}
            </p>
            <h2 className="reveal section-title" style={{ fontFamily }}>
              {t('pricing.subtitle')}
            </h2>
            <div className="reveal ethiopic-divider" style={{ margin: '1rem auto' }} />
          </div>
          <div className="stagger-container" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '1.75rem', maxWidth: '1000px', margin: '0 auto', alignItems: 'center',
          }}>
            <div className="stagger-item">
              <PricingCard
                name={t('pricing.free.name')} price={t('pricing.free.price')} currency={t('pricing.free.currency')}
                description={t('pricing.free.description')}
                features={[t('pricing.free.features.0'), t('pricing.free.features.1'), t('pricing.free.features.2')]}
                cta={t('pricing.free.cta')} onSelect={() => {}}
              />
            </div>
            <div className="stagger-item">
              <PricingCard
                name={t('pricing.season.name')} price={t('pricing.season.price')} currency={t('pricing.season.currency')}
                description={t('pricing.season.description')}
                features={[t('pricing.season.features.0'), t('pricing.season.features.1'), t('pricing.season.features.2'), t('pricing.season.features.3'), t('pricing.season.features.4')]}
                cta={t('pricing.season.cta')} popular={t('pricing.season.popular')} isHighlighted onSelect={() => {}}
              />
            </div>
            <div className="stagger-item">
              <PricingCard
                name={t('pricing.episode.name')} price={t('pricing.episode.price')} currency={t('pricing.episode.currency')}
                description={t('pricing.episode.description')}
                features={[t('pricing.episode.features.0'), t('pricing.episode.features.1'), t('pricing.episode.features.2'), t('pricing.episode.features.3')]}
                cta={t('pricing.episode.cta')} onSelect={() => {}}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
