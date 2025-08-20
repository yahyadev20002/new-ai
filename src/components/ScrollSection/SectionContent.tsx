'use client';

import { motion } from 'framer-motion';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';

interface SectionContentProps {
  title: string;
  description: string;
  image?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  reverse?: boolean;
}

export const SectionContent: React.FC<SectionContentProps> = ({
  title,
  description,
  image,
  buttonText,
  onButtonClick,
  reverse = false,
}) => {
  const { ref, isVisible } = useScrollTrigger({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col lg:flex-row items-center gap-12 py-20 ${
        reverse ? 'lg:flex-row-reverse' : ''
      }`}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <motion.div
        className="flex-1 space-y-6"
        variants={itemVariants}
      >
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          variants={itemVariants}
        >
          {description}
        </motion.p>
        {buttonText && (
          <motion.button
            onClick={onButtonClick}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </motion.button>
        )}
      </motion.div>
      
      {image && (
        <motion.div
          className="flex-1 relative"
          variants={imageVariants}
        >
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl group"
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
            }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
          </motion.div>
          
          {/* Floating accent elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-sm"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full blur-sm"
            animate={{
              y: [0, 10, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};