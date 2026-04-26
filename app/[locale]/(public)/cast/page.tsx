'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CastCard from '@/components/CastCard';

gsap.registerPlugin(ScrollTrigger);

const castMembers = [
  { nameEn: 'Abebe Tadesse', nameAm: 'አበበ ታደሰ', roleEn: 'Dawit', roleAm: 'ዳዊት', bioEn: 'A father navigating a changing Ethiopia, torn between tradition and progress.', bioAm: 'በባህልና በእድገት መካከል የሚቸገር ኢትዮጵያን በለውጥ ውስጥ የሚመራ አባት።' },
  { nameEn: 'Sara Mengistu', nameAm: 'ሳራ መንግሥቱ', roleEn: 'Tigist', roleAm: 'ትግስት', bioEn: 'A young woman fighting for her dreams against all odds.', bioAm: 'ከሁሉም ችግሮች ጋር ለህልሟ የምትታገል ወጣት ሴት።' },
  { nameEn: 'Yonas Bekele', nameAm: 'ዮናስ በቀለ', roleEn: 'Solomon', roleAm: 'ሰሎሞን', bioEn: 'A loyal friend with a hidden past that threatens everything.', bioAm: 'ሁሉንም የሚያሰጋ የተደበቀ ያለፈ ታሪክ ያለው ታማኝ ጓደኛ።' },
  { nameEn: 'Hiwot Alemayehu', nameAm: 'ሕይወት አለማየሁ', roleEn: 'Meron', roleAm: 'መሮን', bioEn: 'The matriarch holding the family together through turbulent times.', bioAm: 'በአስቸጋሪ ጊዜያት ቤተሰቡን የምታስተሳስር እናት።' },
  { nameEn: 'Dereje Hailu', nameAm: 'ደረጀ ኃይሉ', roleEn: 'Ato Kebede', roleAm: 'አቶ ከበደ', bioEn: 'A powerful businessman whose decisions affect the entire community.', bioAm: 'ውሳኔዎቹ ማህበረሰቡን ሁሉ የሚነኩ ኃያል ነጋዴ።' },
  { nameEn: 'Bethlehem Teshome', nameAm: 'ቤተልሔም ተሾመ', roleEn: 'Selam', roleAm: 'ሰላም', bioEn: 'A journalist uncovering truths that some want buried.', bioAm: 'አንዳንዶች እንዲቀበሩ የሚፈልጉ እውነቶችን የምታጋልጥ ጋዜጠኛ።' },
];

export default function CastPage() {
  const t = useTranslations('cast');
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const fontFamily = locale === 'am' ? 'var(--font-ethiopic)' : 'var(--font-heading)';

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.from(containerRef.current.querySelectorAll('.cast-card'), {
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ paddingTop: '7rem' }}>
      <div className="section-container section-padding">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="section-title" style={{ fontFamily }}>
            <span className="gold-text">{t('pageTitle')}</span>
          </h1>
          <div className="ethiopic-divider" style={{ margin: '1rem auto' }} />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>{t('pageSubtitle')}</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem',
        }}>
          {castMembers.map((c, i) => (
            <div key={i} className="cast-card"><CastCard {...c} /></div>
          ))}
        </div>
      </div>
    </div>
  );
}
