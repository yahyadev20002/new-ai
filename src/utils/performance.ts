// Performance monitoring and optimization utilities

// FPS monitoring
export class FPSMonitor {
  private frames: number[] = [];
  private lastTime: number = performance.now();
  private callback: (fps: number) => void;

  constructor(callback: (fps: number) => void) {
    this.callback = callback;
    this.start();
  }

  private start = () => {
    const measure = (currentTime: number) => {
      const delta = currentTime - this.lastTime;
      const fps = 1000 / delta;
      
      this.frames.push(fps);
      if (this.frames.length > 60) {
        this.frames.shift();
      }

      const avgFps = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
      this.callback(avgFps);

      this.lastTime = currentTime;
      requestAnimationFrame(measure);
    };

    requestAnimationFrame(measure);
  };
}

// Lazy loading helper
export const lazyLoad = (
  element: HTMLElement,
  onLoad: () => void,
  rootMargin = '100px'
) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        onLoad();
        observer.unobserve(element);
      }
    },
    { rootMargin }
  );

  observer.observe(element);
  return () => observer.disconnect();
};

// Performance metrics
export const getPerformanceMetrics = () => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');
  
  return {
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
  };
};

// Request animation frame helper for smooth animations
export const rafThrottle = (callback: FrameRequestCallback) => {
  let rafId: number | null = null;
  
  return (...args: any[]) => {
    if (rafId === null) {
      rafId = requestAnimationFrame((time) => {
        callback(time, ...args);
        rafId = null;
      });
    }
  };
};