import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapContext } from '@/hooks/useGsapContext';

interface ShapeState {
  id: string;
  shapePath: string;
  color: string;
  scale: number;
  rotation: number;
  opacity: number;
}

interface UseShapeAnimationProps {
  shapeRef: React.RefObject<SVGPathElement>;
  sections: ShapeState[];
  containerRef: React.RefObject<HTMLElement>;
}

export const useShapeAnimation = ({
  shapeRef,
  sections,
  containerRef,
}: UseShapeAnimationProps) => {
  const ctx = useGsapContext();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const shapeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!shapeRef.current || !containerRef.current || !ctx) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Kill existing timelines
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    if (shapeTimelineRef.current) {
      shapeTimelineRef.current.kill();
    }

    // Create main shape morphing timeline
    shapeTimelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    // Add shape transformations with more dramatic effects
    sections.forEach((section, index) => {
      const progress = (index + 1) / sections.length;
      
      shapeTimelineRef.current?.to(shapeRef.current, {
        attr: { d: section.shapePath },
        duration: 1.5,
        ease: 'power2.inOut',
      }, progress);

      shapeTimelineRef.current?.to(shapeRef.current, {
        scale: section.scale,
        rotation: section.rotation,
        duration: 1.2,
        ease: 'power1.inOut',
      }, progress);

      shapeTimelineRef.current?.to(shapeRef.current, {
        opacity: section.opacity,
        duration: 0.8,
        ease: 'power2.inOut',
      }, progress);
    });

    // Create interactive timeline for scroll-based position changes
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Add horizontal movement based on scroll
    timelineRef.current?.to(shapeRef.current, {
      x: () => window.innerWidth * 0.3,
      duration: 1,
      ease: 'power1.inOut',
    }, 0.2);

    timelineRef.current?.to(shapeRef.current, {
      x: () => -window.innerWidth * 0.1,
      duration: 1,
      ease: 'power1.inOut',
    }, 0.8);

    // Add vertical floating effect
    timelineRef.current?.to(shapeRef.current, {
      y: '+=50',
      duration: 2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    }, 0);

    // Add rotation pulse effect
    timelineRef.current?.to(shapeRef.current, {
      rotation: '+=10',
      duration: 3,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    }, 0);

    // Create section-based interactions
    sections.forEach((section, index) => {
      const sectionElement = document.getElementById(section.id);
      if (!sectionElement) return;

      // Shape reacts when section is in view
      gsap.to(shapeRef.current, {
        scale: section.scale * 1.1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionElement,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play reverse play reverse',
        },
      });

      // Add color transition effect
      gsap.to(shapeRef.current, {
        attr: { fill: section.color },
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionElement,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
        },
      });
    });

    // Add mouse interaction effects
    const handleMouseMove = (e: MouseEvent) => {
      if (!shapeRef.current) return;
      
      const rect = shapeRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / window.innerWidth;
      const deltaY = (e.clientY - centerY) / window.innerHeight;
      
      gsap.to(shapeRef.current, {
        x: deltaX * 30,
        y: deltaY * 30,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (shapeTimelineRef.current) {
        shapeTimelineRef.current.kill();
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [sections, shapeRef, containerRef, ctx]);

  return { timelineRef, shapeTimelineRef };
};