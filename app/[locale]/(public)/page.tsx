'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Play, ChevronDown, Star, Film, Heart } from 'lucide-react';
import CastCard from '@/components/CastCard';
import EpisodeCard from '@/components/EpisodeCard';
import PricingCard from '@/components/PricingCard';

gsap.registerPlugin(ScrollTrigger);

// Placeholder data
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
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const castRef = useRef<HTMLElement>(null);
  const episodesRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Hero timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-title', { y: 60, opacity: 0, duration: 1, delay: 0.3 })
      .from('.hero-subtitle', { y: 40, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.hero-cta', { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.4')
      .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2');

    // Section animations
    const sections = [aboutRef, castRef, episodesRef, pricingRef];
    sections.forEach((ref) => {
      if (!ref.current) return;
      gsap.from(ref.current.querySelectorAll('.animate-item'), {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      });
    });
  }, { scope: heroRef });

  const fontFamily = locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-heading)';

  return (
    <div ref={heroRef}>
      {/* ── HERO ────────────────────────────── */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/hero-banner.png)', backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.35)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(13,9,7,0.3) 0%, rgba(13,9,7,0.6) 60%, var(--color-background) 100%)',
        }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '8rem 1.5rem 4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem',
            background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)',
            borderRadius: '100px', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-primary)',
          }}>
            <Film size={14} /> {t('about.era')}
          </div>
          <h1 className="hero-title" style={{
            fontFamily, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800,
            lineHeight: 1.1, maxWidth: '800px', margin: '0 auto 1rem',
          }}>
            <span className="gold-text">{t('hero.title')}</span>
          </h1>
          <p className="hero-title font-ethiopic" style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--color-ivory-muted)',
            marginBottom: '0.75rem', fontFamily: locale === 'am' ? 'var(--font-heading)' : 'var(--font-ethiopic)',
          }}>
            {t('hero.titleAm')}
          </p>
          <p className="hero-subtitle" style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--color-muted)',
            maxWidth: '600px', margin: '0 auto 2.5rem',
          }}>
            {t('hero.subtitle')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/subscribe" className="btn-primary hero-cta" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
              <Play size={18} fill="currentColor" /> {t('hero.cta')}
            </Link>
            <Link href="/trailer" className="btn-secondary hero-cta" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
              {t('hero.ctaTrailer')}
            </Link>
          </div>
          <div className="hero-scroll" style={{ marginTop: '4rem' }}>
            <ChevronDown size={24} style={{ color: 'var(--color-muted)', animation: 'pulse-gold 2s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────── */}
      <section ref={aboutRef} className="section-padding" style={{ background: 'var(--color-background)' }}>
        <div className="section-container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-item section-title" style={{ fontFamily }}>
              <span className="gold-text">{t('about.sectionTitle')}</span>
            </h2>
            <div className="animate-item ethiopic-divider" style={{ margin: '1rem auto' }} />
            <p className="animate-item" style={{
              fontSize: '1.1rem', color: 'var(--color-ivory-muted)', lineHeight: 1.8, marginBottom: '2rem',
              fontFamily: locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-body)',
            }}>
              {t('about.synopsis')}
            </p>
            <div className="animate-item" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {(['drama', 'historical', 'romance'] as const).map((g) => (
                <span key={g} style={{
                  padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.85rem',
                  background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.15)', color: 'var(--color-primary)',
                }}>
                  {g === 'drama' && <Star size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />}
                  {g === 'romance' && <Heart size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />}
                  {t(`about.genre.${g}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAST ────────────────────────────── */}
      <section ref={castRef} className="section-padding" style={{ background: 'var(--color-background-light)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="animate-item section-title" style={{ fontFamily }}>
              <span className="gold-text">{t('cast.sectionTitle')}</span>
            </h2>
            <div className="animate-item ethiopic-divider" style={{ margin: '1rem auto' }} />
            <p className="animate-item section-subtitle" style={{ margin: '0 auto' }}>{t('cast.subtitle')}</p>
          </div>
          <div className="animate-item" style={{
            display: 'flex', gap: '1.25rem', overflowX: 'auto', paddingBottom: '1rem',
            scrollSnapType: 'x mandatory',
          }}>
            {castMembers.map((c, i) => (
              <div key={i} style={{ scrollSnapAlign: 'start' }}>
                <CastCard {...c} compact />
              </div>
            ))}
          </div>
          <div className="animate-item" style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/cast" className="btn-secondary">{t('cast.viewAll')}</Link>
          </div>
        </div>
      </section>

      {/* ── EPISODES ────────────────────────── */}
      <section ref={episodesRef} className="section-padding">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="animate-item section-title" style={{ fontFamily }}>
              <span className="gold-text">{t('episodes.sectionTitle')}</span>
            </h2>
            <div className="animate-item ethiopic-divider" style={{ margin: '1rem auto' }} />
            <p className="animate-item section-subtitle" style={{ margin: '0 auto' }}>{t('episodes.subtitle')}</p>
          </div>
          <div className="animate-item" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem',
          }}>
            {episodes.map((ep) => (
              <EpisodeCard key={ep.id} {...ep} isUnlocked={false} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────── */}
      <section ref={pricingRef} className="section-padding" style={{ background: 'var(--color-background-light)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="animate-item section-title" style={{ fontFamily }}>
              <span className="gold-text">{t('pricing.sectionTitle')}</span>
            </h2>
            <div className="animate-item ethiopic-divider" style={{ margin: '1rem auto' }} />
            <p className="animate-item section-subtitle" style={{ margin: '0 auto' }}>{t('pricing.subtitle')}</p>
          </div>
          <div className="animate-item" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem', maxWidth: '960px', margin: '0 auto', alignItems: 'center',
          }}>
            <PricingCard
              name={t('pricing.free.name')} price={t('pricing.free.price')} currency={t('pricing.free.currency')}
              description={t('pricing.free.description')}
              features={[t('pricing.free.features.0'), t('pricing.free.features.1'), t('pricing.free.features.2')]}
              cta={t('pricing.free.cta')} onSelect={() => {}}
            />
            <PricingCard
              name={t('pricing.season.name')} price={t('pricing.season.price')} currency={t('pricing.season.currency')}
              description={t('pricing.season.description')}
              features={[t('pricing.season.features.0'), t('pricing.season.features.1'), t('pricing.season.features.2'), t('pricing.season.features.3'), t('pricing.season.features.4')]}
              cta={t('pricing.season.cta')} popular={t('pricing.season.popular')} isHighlighted onSelect={() => {}}
            />
            <PricingCard
              name={t('pricing.episode.name')} price={t('pricing.episode.price')} currency={t('pricing.episode.currency')}
              description={t('pricing.episode.description')}
              features={[t('pricing.episode.features.0'), t('pricing.episode.features.1'), t('pricing.episode.features.2'), t('pricing.episode.features.3')]}
              cta={t('pricing.episode.cta')} onSelect={() => {}}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
