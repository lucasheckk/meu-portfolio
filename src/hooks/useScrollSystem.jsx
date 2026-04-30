import { useEffect, useRef } from 'react';
import { animate } from 'motion/react';

// ── Constantes tunáveis ───────────────────────────────────────────
const LERP_EASE       = 0.09;  
const PIXELS_PER_TICK = 90;    
const NAV_OFFSET      = 96;   

export function useScrollSystem() {
  const s = useRef({
    current:          0,
    target:           0,
    rafId:            null,
    isAnchorAnimating: false,
    anchorControl:    null,
  });

  useEffect(() => {
    const state = s.current;
    state.current = window.scrollY;
    state.target  = window.scrollY;

    // ── RAF loop: lerp suave ────────────────────────────────────
    const tick = () => {
      if (!state.isAnchorAnimating) {
        const diff = state.target - state.current;
        if (Math.abs(diff) > 0.2) {
          state.current += diff * LERP_EASE;
          window.scrollTo(0, state.current);
        } else {
          state.current = state.target;
        }
      }
      state.rafId = requestAnimationFrame(tick);
    };

    // ── Wheel: delta normalizado → target acumulado ─────────────
    const onWheel = (e) => {
      e.preventDefault();

      if (state.isAnchorAnimating) {
        state.anchorControl?.stop();
        state.isAnchorAnimating = false;
        state.current = window.scrollY;
        state.target  = window.scrollY;
      }

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      state.target = Math.max(
        0,
        Math.min(state.target + Math.sign(e.deltaY) * PIXELS_PER_TICK, maxScroll)
      );
    };

    // ── Click em âncora: Motion animate com easing spring ──────
    const onAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();

      const targetY = Math.max(
        0,
        el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
      );

      state.isAnchorAnimating = true;
      state.anchorControl?.stop();

      state.anchorControl = animate(window.scrollY, targetY, {
        duration: 1.05,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          window.scrollTo(0, v);
          state.current = v;
          state.target  = v;
        },
        onComplete: () => {
          state.isAnchorAnimating = false;
          state.current = targetY;
          state.target  = targetY;
        },
      });
    };

    state.rafId = requestAnimationFrame(tick);
    window.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('click', onAnchorClick);

    return () => {
      cancelAnimationFrame(state.rafId);
      window.removeEventListener('wheel', onWheel);
      document.removeEventListener('click', onAnchorClick);
      state.anchorControl?.stop();
    };
  }, []);
}