'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SmoothScroll } from '@/components/Layout/SmoothScroll';
import { ShapeAnimator } from '@/components/ShapeAnimator/ShapeAnimator';
import { ScrollSection } from '@/components/ScrollSection/ScrollSection';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative">
        <ShapeAnimator containerRef={containerRef} />
        
        {/* Hero Section */}
        <motion.section
          className="min-h-screen flex items-center justify-center px-6 lg:px-12 relative overflow-hidden"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto text-center z-20 lg:ml-96">
            <motion.h1
              className="text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Ethereal Shapes
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Experience the magic of morphing geometric forms that dance and transform as you scroll through this immersive journey.
            </motion.p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Journey
            </motion.button>
          </div>
          
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        </motion.section>

        {/* About Section */}
        <ScrollSection
          id="about"
          title="The Art of Transformation"
          description="Watch as simple geometric shapes evolve into complex forms, telling stories through motion and color. Each scroll reveals a new chapter in this visual narrative, where mathematics meets art in perfect harmony."
          reverse={false}
          className="lg:mr-96"
        />

        {/* Features Section */}
        <ScrollSection
          id="features"
          title="Seamless Animations"
          description="Powered by cutting-edge web technologies, every morph, scale, and rotation is precisely choreographed to create a fluid, responsive experience that adapts to your scrolling pace."
          image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
          reverse={true}
          className="lg:ml-96"
        />

        {/* Showcase Section */}
        <ScrollSection
          id="showcase"
          title="Interactive Experience"
          description="Engage with shapes that respond to your presence. The boundary between observer and artwork blurs as you become part of this dynamic, ever-changing digital canvas."
          reverse={false}
          className="lg:mr-96"
        />

        {/* Contact Section */}
        <ScrollSection
          id="contact"
          title="Join the Journey"
          description="Ready to explore more? Dive deeper into the world of interactive web experiences and discover how technology can create meaningful, beautiful connections."
          buttonText="Get Started"
          onButtonClick={() => console.log('Get started clicked')}
          reverse={true}
          className="lg:ml-96"
        />
      </div>
    </SmoothScroll>
  );
}