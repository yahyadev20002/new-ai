import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const useGsapContext = () => {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {});
    
    return () => {
      if (ctx.current) {
        ctx.current.revert();
        ctx.current = null;
      }
    };
  }, []);

  return ctx.current;
};