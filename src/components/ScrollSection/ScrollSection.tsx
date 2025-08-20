'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { SectionContent } from './SectionContent';

interface ScrollSectionProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  reverse?: boolean;
  className?: string;
}

export const ScrollSection = forwardRef<HTMLDivElement, ScrollSectionProps>(
  ({ id, title, description, image, buttonText, onButtonClick, reverse = false, className = '' }, ref) => {
    const sectionVariants = {
      hidden: { opacity: 0, x: reverse ? 100 : -100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
          staggerChildren: 0.2,
        },
      },
    };

    const backgroundVariants = {
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 1.2,
          ease: 'easeOut',
        },
      },
    };

    return (
      <motion.section
        ref={ref}
        id={id}
        className={`min-h-screen flex items-center justify-center px-6 lg:px-12 relative overflow-hidden ${className}`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Interactive background elements */}
        <motion.div
          className="absolute inset-0 opacity-10"
          variants={backgroundVariants}
        >
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-400 rounded-full blur-xl" />
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>

        {/* Content container with side interaction space */}
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <SectionContent
            title={title}
            description={description}
            image={image}
            buttonText={buttonText}
            onButtonClick={onButtonClick}
            reverse={reverse}
          />
        </div>

        {/* Side interaction indicator */}
        <motion.div
          className={`absolute top-1/2 ${reverse ? 'left-0' : 'right-0'} w-2 h-20 bg-gradient-to-b from-transparent via-indigo-400 to-transparent opacity-50`}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ transformOrigin: 'center' }}
        />
      </motion.section>
    );
  }
);

ScrollSection.displayName = 'ScrollSection';