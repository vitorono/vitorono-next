'use client';

import { useEffect, useRef } from 'react';

export default function Preloader() {
  const lottieContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('is-loading');

    let animInstance: { destroy: () => void } | null = null;

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
    const fill = document.getElementById('progress-fill') as HTMLElement | null;
    const video = document.querySelector<HTMLVideoElement>('#phase2 video');

    let rafId: number;
    let maxTimeoutId: ReturnType<typeof setTimeout>;

    function easeLoader(t: number): number {
      if (t < 0.4) return (t / 0.4) * 0.55;
      if (t < 0.85) return 0.55 + ((t - 0.4) / 0.45) * 0.27;
      return 0.82 + ((t - 0.85) / 0.15) * 0.18;
    }

    function transitionToPhase2() {
      cancelAnimationFrame(rafId);
      clearTimeout(maxTimeoutId);
      if (fill) {
        fill.style.transition = 'width 0.3s ease';
        fill.style.width = '100%';
      }
      setTimeout(() => {
        phase1?.classList.add('out');
        phase2?.classList.add('in');
      }, 350);
    }

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      // iOS ignores preload — fake animation as fallback
      const duration = 6000;
      let startTime: number | null = null;
      function animate(ts: number) {
        if (!startTime) startTime = ts;
        const t = Math.min((ts - startTime) / duration, 1);
        if (fill) fill.style.width = `${easeLoader(t) * 100}%`;
        if (t < 1) {
          rafId = requestAnimationFrame(animate);
        } else {
          transitionToPhase2();
        }
      }
      rafId = requestAnimationFrame(animate);
    } else {
      // Android / Desktop: drive bar from real buffering progress
      // Both conditions must be true before transitioning: video ready + 3s minimum
      let canPlayReady = false;
      let minTimeReady = false;

      function tryTransition() {
        if (canPlayReady && minTimeReady) transitionToPhase2();
      }

      setTimeout(() => { minTimeReady = true; tryTransition(); }, 3000);
      maxTimeoutId = setTimeout(transitionToPhase2, 8000);

      if (video) {
        video.addEventListener('progress', () => {
          if (!video.duration || !video.buffered.length) return;
          const pct = video.buffered.end(video.buffered.length - 1) / video.duration;
          if (fill) fill.style.width = `${Math.min(pct * 100, 92)}%`;
        });

        video.addEventListener('canplay', () => {
          canPlayReady = true;
          tryTransition();
        }, { once: true });

        if (video.readyState >= 3) { canPlayReady = true; tryTransition(); }
      }
    }

    // Start video playback (both paths)
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

    // Click to enter — only enabled after "CLICK ANYWHERE" finishes fading in
    const phase2Content = document.getElementById('phase2-content');
    function handleEnter() {
      document.getElementById('preloader')?.remove();
      document.body.style.overflow = '';
      document.body.classList.remove('is-loading');
    }
    function enableClick() {
      phase2?.classList.add('ready');
      phase2?.addEventListener('click', handleEnter);
    }
    phase2Content?.addEventListener('transitionend', enableClick, { once: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(maxTimeoutId);
      animInstance?.destroy();
      phase2Content?.removeEventListener('transitionend', enableClick);
      phase2?.removeEventListener('click', handleEnter);
    };
  }, []);

  return (
    <div id="preloader">
      <div id="phase1">
        <div ref={lottieContainerRef} style={{ width: 280, height: 280 }} />
        <div id="progress-wrapper">
          <div id="progress-fill" />
        </div>
      </div>
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
