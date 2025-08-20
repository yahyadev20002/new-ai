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
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

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
      
      // Calculate parallax offset based on mouse position
      if (typeof window !== 'undefined') {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = (e.clientX - centerX) / centerX;
        const offsetY = (e.clientY - centerY) / centerY;
        
        setParallax({
          x: offsetX * 30,
          y: offsetY * 30
        });
      }
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

  // Don't render anything during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
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
          className="w-[24rem] h-[24rem]"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{
            filter: isHovering 
              ? 'drop-shadow(0 0 60px rgba(99, 102, 241, 0.9)) drop-shadow(0 0 80px rgba(139, 92, 246, 0.6)) drop-shadow(0 0 100px rgba(236, 72, 153, 0.4))'
              : 'drop-shadow(0 0 40px rgba(99, 102, 241, 0.7)) drop-shadow(0 0 60px rgba(139, 92, 246, 0.4))',
          }}
        >
          <defs>
            {/* Enhanced gradient with more stops */}
            <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1">
                <animate attributeName="stop-color" values="#6366f1;#8b5cf6;#ec4899;#f59e0b;#10b981;#6366f1" dur="12s" repeatCount="indefinite" />
              </stop>
              <stop offset="25%" stopColor="#8b5cf6">
                <animate attributeName="stop-color" values="#8b5cf6;#ec4899;#f59e0b;#10b981;#6366f1;#8b5cf6" dur="10s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#ec4899">
                <animate attributeName="stop-color" values="#ec4899;#f59e0b;#10b981;#6366f1;#8b5cf6;#ec4899" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="75%" stopColor="#f59e0b">
                <animate attributeName="stop-color" values="#f59e0b;#10b981;#6366f1;#8b5cf6;#ec4899;#f59e0b" dur="14s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#10b981">
                <animate attributeName="stop-color" values="#10b981;#6366f1;#8b5cf6;#ec4899;#f59e0b;#10b981" dur="16s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            
            {/* Multiple glow filters for enhanced effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feGaussianBlur stdDeviation="4" result="coloredBlur2"/>
              <feMerge>
                <feMergeNode in="coloredBlur2"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Enhanced morph filter */}
            <filter id="morph">
              <feTurbulence baseFrequency="0.015" numOctaves="4" result="turbulence" seed="5">
                <animate attributeName="baseFrequency" values="0.015;0.025;0.015" dur="8s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="12" xChannelSelector="R" yChannelSelector="G">
                <animate attributeName="scale" values="12;18;12" dur="6s" repeatCount="indefinite" />
              </feDisplacementMap>
            </filter>

            {/* Ripple effect */}
            <filter id="ripple">
              <feTurbulence baseFrequency="0.02" numOctaves="2" result="turbulence"/>
              <feColorMatrix in="turbulence" type="saturate" values="0"/>
              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0 0.1 0.1 0.2 0.2 0.3 0.3 0.4 0.4 0.5 0.5 0.6 0.6 0.7 0.7 0.8 0.8 0.9 0.9 1"/>
              </feComponentTransfer>
              <feComposite operator="over" in2="SourceGraphic"/>
            </filter>
          </defs>
          
          {/* Main animated shape */}
          <motion.path
            ref={shapeRef}
            d={shapeData.sections[0].shapePath}
            fill="url(#shapeGradient)"
            opacity={0.9}
            filter="url(#glow)"
            style={{
              transformOrigin: 'center',
              willChange: 'transform, d, fill',
            }}
            animate={{
              scale: isHovering ? 1.12 : 1,
              rotate: isHovering ? 8 : 0,
              d: isHovering 
                ? "M50,10 Q90,50 50,90 Q10,50 50,10 Z" 
                : shapeData.sections[0].shapePath,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut"
            }}
          />

          {/* Secondary morphing shape */}
          <motion.path
            d="M30,30 Q50,20 70,30 Q80,50 70,70 Q50,80 30,70 Q20,50 30,30 Z"
            fill="url(#shapeGradient)"
            opacity={0.6}
            filter="url(#morph)"
            style={{
              transformOrigin: 'center',
              willChange: 'transform, d, fill',
            }}
            animate={{
              scale: isHovering ? 1.2 : 1,
              rotate: isHovering ? -15 : 0,
              d: isHovering 
                ? "M25,25 Q50,15 75,25 Q85,50 75,75 Q50,85 25,75 Q15,50 25,25 Z" 
                : "M30,30 Q50,20 70,30 Q80,50 70,70 Q50,80 30,70 Q20,50 30,30 Z",
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
          />

          {/* Tertiary shape with ripple effect */}
          <motion.circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="url(#shapeGradient)"
            strokeWidth="2"
            opacity={0.8}
            filter="url(#ripple)"
            animate={{
              scale: isHovering ? [1, 1.5, 1] : [1, 1.2, 1],
              opacity: isHovering ? [0.8, 0.4, 0.8] : [0.8, 0.6, 0.8],
            }}
            transition={{
              duration: isHovering ? 2 : 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>

      {/* Enhanced secondary shape on the right side */}
      <motion.div
        className="fixed right-0 top-1/2 transform -translate-y-1/2 pointer-events-auto"
        animate={{
          x: -parallax.x * 0.8,
          y: -parallax.y * 0.8,
          scale: isHovering ? 0.85 : 1,
          rotate: isHovering ? -8 : 0,
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
          className="w-60 h-60"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{
            opacity: 0.8,
            filter: isHovering 
              ? 'drop-shadow(0 0 40px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 60px rgba(245, 158, 11, 0.6))'
              : 'drop-shadow(0 0 25px rgba(236, 72, 153, 0.6))',
          }}
        >
          <defs>
            {/* Enhanced radial gradient */}
            <radialGradient id="secondaryGradient">
              <stop offset="0%" stopColor="#f59e0b">
                <animate attributeName="stop-color" values="#f59e0b;#ef4444;#8b5cf6;#6366f1;#ec4899;#f59e0b" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#ef4444">
                <animate attributeName="stop-color" values="#ef4444;#8b5cf6;#6366f1;#ec4899;#f59e0b;#ef4444" dur="10s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#8b5cf6">
                <animate attributeName="stop-color" values="#8b5cf6;#6366f1;#ec4899;#f59e0b;#ef4444;#8b5cf6" dur="12s" repeatCount="indefinite" />
              </stop>
            </radialGradient>

            {/* Animated pattern */}
            <pattern id="animatedPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="url(#secondaryGradient)">
                <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>

          {/* Main morphing circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="url(#secondaryGradient)"
            style={{
              willChange: 'transform',
            }}
            animate={{
              scale: isHovering ? [1, 1.1, 0.9, 1] : 1,
              r: isHovering ? [40, 45, 35, 40] : 40,
            }}
            transition={{
              duration: isHovering ? 1.5 : 3,
              repeat: isHovering ? Infinity : 0,
              ease: "easeInOut"
            }}
          />

          {/* Animated polygon */}
          <motion.polygon
            points="50,20 70,40 70,60 50,80 30,60 30,40"
            fill="url(#animatedPattern)"
            opacity={0.7}
            animate={{
              rotate: isHovering ? 360 : 0,
              scale: isHovering ? 1.1 : 1,
            }}
            transition={{
              duration: isHovering ? 2 : 4,
              repeat: isHovering ? Infinity : 0,
              ease: "linear"
            }}
          />

          {/* Orbiting elements */}
          {[0, 120, 240].map((angle, index) => (
            <motion.circle
              key={index}
              cx={50 + 25 * Math.cos((angle * Math.PI) / 180)}
              cy={50 + 25 * Math.sin((angle * Math.PI) / 180)}
              r="3"
              fill="url(#secondaryGradient)"
              animate={{
                cx: 50 + 30 * Math.cos(((angle + (isHovering ? 360 : 0)) * Math.PI) / 180),
                cy: 50 + 30 * Math.sin(((angle + (isHovering ? 360 : 0)) * Math.PI) / 180),
                r: isHovering ? 5 : 3,
              }}
              transition={{
                duration: isHovering ? 3 : 6,
                repeat: isHovering ? Infinity : 0,
                ease: "linear",
                delay: index * 0.5
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Enhanced particle system */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => {
          const size = Math.random() * 4 + 1;
          const duration = 8 + Math.random() * 4;
          const delay = Math.random() * 3;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
          const color = colors[i % colors.length];
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                filter: `blur(${size * 0.3}px)`,
              }}
              animate={{
                y: [0, -200 - Math.random() * 150, 0],
                x: [0, (Math.random() - 0.5) * 150, 0],
                opacity: [0, 0.5, 0],
                scale: [1, 1.8, 1],
                rotate: [0, 360, 0],
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

      {/* Enhanced connection lines */}
      <svg className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Primary connection line */}
        <motion.line
          x1="10%"
          y1="50%"
          x2="90%"
          y2="50%"
          stroke="url(#connectionGradient)"
          strokeWidth="3"
          opacity="0.2"
          animate={{
            strokeDasharray: [0, 1500],
            strokeDashoffset: [1500, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Secondary connection lines */}
        {[25, 75].map((yPos, index) => (
          <motion.line
            key={index}
            x1="15%"
            y1={`${yPos}%`}
            x2="85%"
            y2={`${yPos}%`}
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            opacity="0.15"
            animate={{
              strokeDasharray: [0, 1000],
              strokeDashoffset: [1000, 0],
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5
            }}
          />
        ))}

        {/* Animated curves */}
        <motion.path
          d="M 10,50 Q 50,20 90,50"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.15"
          animate={{
            d: [
              "M 10,50 Q 50,20 90,50",
              "M 10,50 Q 50,80 90,50",
              "M 10,50 Q 50,20 90,50"
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
            <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.5"/>
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.7"/>
            <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Enhanced scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 shadow-lg"
        style={{ width: `${scrollProgress * 100}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1 }}
      />

      {/* Side scroll indicators */}
      <motion.div
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-1 h-32 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full relative">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white rounded-full"
            style={{ height: `${scrollProgress * 100}%` }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};