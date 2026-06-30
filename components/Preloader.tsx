'use client';

import { useEffect, useRef } from 'react';

export default function Preloader() {
  const lottieContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('is-loading');

    let animInstance: { destroy: () => void } | null = null;

    // Dynamically import lottie-web so it only runs client-side
    import('lottie-web').then((lottieModule) => {
      const lottie = lottieModule.default;
      if (!lottieContainerRef.current) return;

      animInstance = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lottie/data.json',
      });
    });

    const phase1 = document.getElementById('phase1');
    const phase2 = document.getElementById('phase2');
    const fill = document.getElementById('progress-fill');

    function easeLoader(t: number): number {
      if (t < 0.4) return (t / 0.4) * 0.55;
      if (t < 0.85) return 0.55 + ((t - 0.4) / 0.45) * 0.27;
      return 0.82 + ((t - 0.85) / 0.15) * 0.18;
    }

    const duration = 5000;
    let startTime: number | null = null;
    let rafId: number;

    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const t = Math.min((ts - startTime) / duration, 1);
      if (fill) fill.style.width = `${easeLoader(t) * 100}%`;
      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        phase1?.classList.add('out');
        phase2?.classList.add('in');
      }
    }

    rafId = requestAnimationFrame(animate);

    // Phase 2 video
    const video = document.querySelector<HTMLVideoElement>('#phase2 video');
    if (video) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          const tryPlay = () => video.play();
          document.addEventListener('touchstart', tryPlay, { once: true });
          document.addEventListener('click', tryPlay, { once: true });
        });
      }
    }

    function handleEnter() {
      document.getElementById('preloader')?.remove();
      document.body.style.overflow = '';
      document.body.classList.remove('is-loading');
    }

    phase2?.addEventListener('click', handleEnter);

    return () => {
      cancelAnimationFrame(rafId);
      animInstance?.destroy();
      phase2?.removeEventListener('click', handleEnter);
    };
  }, []);

  return (
    <div id="preloader">
      {/* Phase 1: loading bar */}
      <div id="phase1">
        <div ref={lottieContainerRef} style={{ width: 280, height: 280 }} />
        <div id="progress-wrapper">
          <div id="progress-fill" />
        </div>
      </div>

      {/* Phase 2: click to enter */}
      <div id="phase2">
        <video autoPlay muted loop playsInline preload="auto">
          <source
            src="https://pub-23c9d7cb793f4f3aa4454db4a91905ef.r2.dev/Vitor%20Ono%20Loading%20Screen.mp4"
            type="video/mp4"
          />
        </video>
        <div id="phase2-content">
          <img src="/images/click-anywhere.svg" alt="Click Anywhere" />
          <p>to enter</p>
        </div>
      </div>
    </div>
  );
}
