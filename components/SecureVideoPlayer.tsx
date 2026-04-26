'use client';

import { useEffect, useRef } from 'react';

interface SecureVideoPlayerProps {
  src: string;
  watermarkText?: string;
  poster?: string;
}

export default function SecureVideoPlayer({ src, watermarkText, poster }: SecureVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable right-click on the video container
    const container = containerRef.current;
    if (!container) return;

    const handleContextMenu = (e: Event) => { e.preventDefault(); };
    container.addEventListener('contextmenu', handleContextMenu);

    // Pause on visibility change (tab switch)
    const handleVisibility = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Block common screen-record keyboard shortcuts
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['S', 's', 'I', 'i'].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'PrintScreen') {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeydown);

    return () => {
      container.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div ref={containerRef} style={{
      position: 'relative', width: '100%', maxWidth: '1100px', margin: '0 auto',
      borderRadius: '12px', overflow: 'hidden', background: '#000',
      border: '1px solid rgba(212,168,67,0.15)',
    }}>
      {/* Transparent overlay to interfere with screen capture */}
      <div className="video-protection-overlay" />

      {/* Dynamic watermark */}
      {watermarkText && <div className="watermark">{watermarkText}</div>}

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        playsInline
        style={{ width: '100%', display: 'block' }}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
