import gsap from 'gsap';

// Debounce function for performance optimization
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function for performance optimization
export const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle: boolean;
  return (...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// GSAP animation presets
export const fadeIn = (target: gsap.TweenTarget, duration = 0.6, delay = 0) => {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
  );
};

export const slideIn = (
  target: gsap.TweenTarget,
  direction: 'left' | 'right' = 'left',
  duration = 0.6,
  delay = 0
) => {
  const x = direction === 'left' ? -50 : 50;
  return gsap.fromTo(
    target,
    { opacity: 0, x },
    { opacity: 1, x: 0, duration, delay, ease: 'power2.out' }
  );
};

export const scaleIn = (target: gsap.TweenTarget, duration = 0.6, delay = 0) => {
  return gsap.fromTo(
    target,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' }
  );
};

// Stagger animation helper
export const staggerFadeIn = (
  targets: gsap.TweenTarget,
  stagger = 0.1,
  duration = 0.6
) => {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power2.out',
    }
  );
};