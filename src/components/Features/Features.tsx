'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Features = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const features = [
    {
      title: "Dynamic Shape Morphing",
      description: "Watch geometric forms transform seamlessly with mathematical precision, creating fluid animations that respond to your interactions.",
      icon: "🔄",
      color: "from-indigo-500 to-purple-600",
      bgGlow: "bg-indigo-500/10"
    },
    {
      title: "Real-time Mouse Tracking",
      description: "Experience parallax effects that follow your cursor, creating an immersive 3D-like environment that responds to your every move.",
      icon: "🎯",
      color: "from-purple-500 to-pink-600",
      bgGlow: "bg-purple-500/10"
    },
    {
      title: "Scroll-Triggered Animations",
      description: "Each scroll reveals new patterns and transformations, making your journey through the content a visual masterpiece.",
      icon: "📜",
      color: "from-pink-500 to-rose-600",
      bgGlow: "bg-pink-500/10"
    },
    {
      title: "Particle Systems",
      description: "Thousands of animated particles create atmospheric effects that enhance the overall visual experience.",
      icon: "✨",
      color: "from-rose-500 to-orange-600",
      bgGlow: "bg-rose-500/10"
    },
    {
      title: "Gradient Animations",
      description: "Living gradients that shift and flow through the color spectrum, adding depth and movement to every element.",
      icon: "🌈",
      color: "from-orange-500 to-yellow-600",
      bgGlow: "bg-orange-500/10"
    },
    {
      title: "Performance Optimized",
      description: "Built with cutting-edge web technologies for smooth 60fps animations across all devices and browsers.",
      icon: "🚀",
      color: "from-yellow-500 to-green-600",
      bgGlow: "bg-yellow-500/10"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 px-6 lg:px-12 relative overflow-hidden lg:mr-96">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-500/10 to-rose-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Powerful Features
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Discover the cutting-edge technologies and creative innovations that power Ethereal Shapes
          </motion.p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group"
            >
              {/* Card background with glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-3xl ${feature.bgGlow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                animate={{
                  scale: hoveredCard === index ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Main card */}
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl p-8 h-full">
                {/* Icon with animated background */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 mx-auto`}
                  animate={{
                    rotate: hoveredCard === index ? [0, 10, -10, 0] : 0,
                    scale: hoveredCard === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <motion.h3
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center"
                  animate={{
                    y: hoveredCard === index ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p
                  className="text-gray-600 dark:text-gray-300 text-center leading-relaxed"
                  animate={{
                    y: hoveredCard === index ? -3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.description}
                </motion.p>

                {/* Interactive elements */}
                <motion.div
                  className="mt-6 flex justify-center"
                  animate={{
                    opacity: hoveredCard === index ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`w-12 h-1 rounded-full bg-gradient-to-r ${feature.color}`}
                    animate={{
                      scaleX: hoveredCard === index ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive demo area */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block p-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            <motion.button
              className="px-8 py-4 bg-white dark:bg-gray-800 rounded-full font-semibold text-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Experience Interactive Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};