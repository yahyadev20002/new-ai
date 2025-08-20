'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (!isMounted) return null;

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center px-6 lg:px-12 relative overflow-hidden"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      <div className="max-w-6xl mx-auto text-center z-20 lg:ml-96 relative">
        {/* Animated title with reveal effect */}
        <motion.div variants={itemVariants} className="relative">
          <motion.h1
            className="text-7xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Ethereal Shapes
          </motion.h1>
          
          {/* Subtitle with typewriter effect */}
          <motion.div
            className="text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Where
            </motion.span>
            {[' Mathematics', ' Art', ' Technology'].map((word, index) => (
              <motion.span
                key={word}
                className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mx-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.3, duration: 0.8 }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              {' '}converge in perfect harmony
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Enhanced CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          variants={itemVariants}
        >
          <motion.button
            className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Begin Journey</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <motion.button
            className="px-10 py-5 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-full font-semibold text-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Gallery
          </motion.button>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          {[
            { label: 'Animated Shapes', value: '∞', icon: '🎨' },
            { label: 'Interactive Elements', value: '100+', icon: '✨' },
            { label: 'Performance Score', value: '99%', icon: '🚀' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
              variants={floatingVariants}
              custom={index}
            >
              <motion.div
                className="text-4xl mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};