'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Testimonials = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Creative Director",
      company: "Pixel Studio",
      content: "Ethereal Shapes has completely transformed how we approach interactive web design. The smooth animations and responsive behavior create an immersive experience that captivates users from the first scroll.",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Frontend Developer",
      company: "Tech Innovations",
      content: "The technical implementation is flawless. The performance optimization ensures smooth 60fps animations even on mobile devices. This is the future of web animations.",
      avatar: "👨‍💻",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "UX Designer",
      company: "Design Forward",
      content: "What impressed me most is how the animations serve the user experience rather than distract from it. Every interaction feels intentional and meaningful.",
      avatar: "👩‍🎨",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Product Manager",
      company: "Startup Labs",
      content: "Our engagement metrics increased by 40% after implementing these animations. Users spend more time exploring and interacting with our content.",
      avatar: "👨‍💼",
      rating: 5
    }
  ];

  useEffect(() => {
    setIsMounted(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        animate={{
          scale: i < rating ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          delay: i * 0.1,
        }}
      >
        ⭐
      </motion.span>
    ));
  };

  return (
    <section className="py-20 px-6 lg:px-12 relative overflow-hidden lg:ml-96">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-tl from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent"
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
            What People Say
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Hear from industry leaders who have experienced the magic of Ethereal Shapes
          </motion.p>
        </motion.div>

        {/* Main testimonial card */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={cardVariants}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden"
            whileHover="hover"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500" />
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
              />
            </div>

            <div className="relative z-10">
              {/* Quote icon */}
              <motion.div
                className="text-6xl mb-6 text-purple-500"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                "
              </motion.div>

              {/* Testimonial content */}
              <motion.blockquote
                className="text-2xl lg:text-3xl text-gray-900 dark:text-white mb-8 leading-relaxed"
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {testimonials[activeIndex].content}
              </motion.blockquote>

              {/* Author info */}
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="text-4xl"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {testimonials[activeIndex].avatar}
                  </motion.div>
                  <div>
                    <motion.div
                      className="text-xl font-bold text-gray-900 dark:text-white"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {testimonials[activeIndex].name}
                    </motion.div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex space-x-1">
                  {renderStars(testimonials[activeIndex].rating)}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonial navigation */}
        <motion.div
          className="flex justify-center space-x-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </motion.div>

        {/* Mini testimonial cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                index === activeIndex ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {testimonial.company}
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                {renderStars(testimonial.rating)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};