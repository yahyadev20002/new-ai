'use client';

import { useRef, useEffect, useState } from 'react';
import { useShapeAnimation } from './useShapeAnimation';
import shapeData from './shapes.json';
import { motion } from 'framer-motion';

interface ShapeAnimatorProps {
  containerRef: React.RefObject<HTMLElement>;
}

export const ShapeAnimator: React.FC<ShapeAnimatorProps> = ({ containerRef }) => {
  const shapeRef = useRef<SVGPathElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useShapeAnimation({
    shapeRef,
    sections: shapeData.sections,
    containerRef,
  });

  // Ensure we only run client-side code
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        setScrollProgress(progress);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      
      // Initialize scroll progress
      handleScroll();
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Calculate parallax offset based on mouse position
  const calculateParallax = () => {
    if (!isMounted || typeof window === 'undefined') {
      return { x: 0, y: 0 };
    }
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = (mousePosition.x - centerX) / centerX;
    const offsetY = (mousePosition.y - centerY) / centerY;
    
    return {
      x: offsetX * 30,
      y: offsetY * 30
    };
  };

  const parallax = calculateParallax();

  // Don't render anything during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Main shape on the left side */}
      <motion.div
        className="fixed left-0 top-1/2 transform -translate-y-1/2 pointer-events-auto"
        animate={{
          x: parallax.x,
          y: parallax.y + (isHovering ? -15 : 0),
          scale: isHovering ? 1.15 : 1,
          rotate: isHovering ? 5 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 12,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          transformOrigin: 'center right',
        }}
      >
        <svg
          className="w-[28rem] h-[28rem]"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{
            filter: isHovering 
              ? 'drop-shadow(0 0 40px rgba(99, 102, 241, 0.8)) drop-shadow(0 0 60px rgba(139, 92, 246, 0.4))'
              : 'drop-shadow(0 0 25px rgba(99, 102, 241, 0.5))',
          }}
        >
          <defs>
            <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1">
                <animate attributeName="stop-color" values="#6366f1;#8b5cf6;#ec4899;#6366f1" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#8b5cf6">
                <animate attributeName="stop-color" values="#8b5cf6;#ec4899;#f59e0b;#8b5cf6" dur="6s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#ec4899">
                <animate attributeName="stop-color" values="#ec4899;#f59e0b;#10b981;#ec4899" dur="10s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="morph">
              <feTurbulence baseFrequency="0.02" numOctaves="3" result="turbulence"/>
              <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="8" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
          <motion.path
            ref={shapeRef}
            d={shapeData.sections[0].shapePath}
            fill="url(#shapeGradient)"
            opacity={0.85}
            filter="url(#glow)"
            style={{
              transformOrigin: 'center',
              willChange: 'transform, d, fill',
            }}
            animate={{
              scale: isHovering ? 1.08 : 1,
              rotate: isHovering ? 8 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>

      {/* Secondary shape on the right side */}
      <motion.div
        className="fixed right-0 top-1/2 transform -translate-y-1/2 pointer-events-auto"
        animate={{
          x: -parallax.x * 0.8,
          y: -parallax.y * 0.8,
          scale: isHovering ? 0.85 : 1,
          rotate: isHovering ? -5 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        style={{
          transformOrigin: 'center left',
        }}
      >
        <svg
          className="w-72 h-72"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{
            opacity: 0.7,
            filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))',
          }}
        >
          <defs>
            <radialGradient id="secondaryGradient">
              <stop offset="0%" stopColor="#f59e0b">
                <animate attributeName="stop-color" values="#f59e0b;#ef4444;#8b5cf6;#f59e0b" dur="5s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#ef4444">
                <animate attributeName="stop-color" values="#ef4444;#8b5cf6;#6366f1;#ef4444" dur="7s" repeatCount="indefinite" />
              </stop>
            </radialGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="url(#secondaryGradient)"
            style={{
              willChange: 'transform',
            }}
          />
        </svg>
      </motion.div>

      {/* Enhanced particle system */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 4 + 2;
          const duration = 4 + Math.random() * 3;
          const delay = Math.random() * 2;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: `radial-gradient(circle, ${i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#ec4899'} 0%, transparent 70%)`,
              }}
              animate={{
                y: [0, -150 - Math.random() * 100, 0],
                x: [0, (Math.random() - 0.5) * 100, 0],
                opacity: [0, 0.8, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* Connection lines */}
      <svg className="fixed inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        <motion.line
          x1="10%"
          y1="50%"
          x2="90%"
          y2="50%"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          opacity="0.3"
          animate={{
            strokeDasharray: [0, 1000],
            strokeDashoffset: [1000, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-50"
        style={{ width: `${scrollProgress * 100}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};