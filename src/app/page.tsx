'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SmoothScroll } from '@/components/Layout/SmoothScroll';
import { ShapeAnimator } from '@/components/ShapeAnimator/ShapeAnimator';
import { Hero } from '@/components/Hero/Hero';
import { Features } from '@/components/Features/Features';
import { Testimonials } from '@/components/Testimonials/Testimonials';
import { Pricing } from '@/components/Pricing/Pricing';
import { Contact } from '@/components/Contact/Contact';
import { Footer } from '@/components/Footer/Footer';
import { PageTransition } from '@/components/PageTransition/PageTransition';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative">
        <ShapeAnimator containerRef={containerRef} />
        
        {/* Hero Section */}
        <PageTransition>
          <Hero />
        </PageTransition>

        {/* About Section */}
        <PageTransition>
          <section id="about" className="py-20 px-6 lg:px-12 relative overflow-hidden lg:mr-96">
            <div className="max-w-6xl mx-auto">
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
                  The Art of Transformation
                </motion.h2>
                <motion.p
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Watch as simple geometric shapes evolve into complex forms, telling stories through motion and color. 
                  Each scroll reveals a new chapter in this visual narrative, where mathematics meets art in perfect harmony.
                </motion.p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="space-y-6"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {[
                    {
                      title: "Mathematical Precision",
                      description: "Every curve and angle is calculated with mathematical precision, creating perfect geometric forms that follow natural patterns."
                    },
                    {
                      title: "Fluid Motion",
                      description: "Seamless transitions between shapes create a hypnotic flow that guides the user through your content."
                    },
                    {
                      title: "Interactive Canvas",
                      description: "The shapes respond to user interactions, creating a dynamic experience that feels alive and responsive."
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-full h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center relative overflow-hidden"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
                      }}
                    />
                    <motion.div
                      className="text-6xl"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      🎨
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </PageTransition>

        {/* Features Section */}
        <PageTransition>
          <Features />
        </PageTransition>

        {/* Testimonials Section */}
        <PageTransition>
          <Testimonials />
        </PageTransition>

        {/* Pricing Section */}
        <PageTransition>
          <Pricing />
        </PageTransition>

        {/* Contact Section */}
        <PageTransition>
          <Contact />
        </PageTransition>

        {/* Footer */}
        <PageTransition>
          <Footer />
        </PageTransition>
      </div>
    </SmoothScroll>
  );
}