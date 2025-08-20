'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Gallery', href: '#gallery' },
      { name: 'Documentation', href: '#docs' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' }
    ],
    resources: [
      { name: 'Tutorials', href: '#tutorials' },
      { name: 'API Reference', href: '#api' },
      { name: 'Support', href: '#support' },
      { name: 'Status', href: '#status' }
    ],
    legal: [
      { name: 'Privacy', href: '#privacy' },
      { name: 'Terms', href: '#terms' },
      { name: 'Cookies', href: '#cookies' },
      { name: 'Licenses', href: '#licenses' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: '#twitter', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: '💼', href: '#linkedin', color: 'hover:text-blue-600' },
    { name: 'GitHub', icon: '🐙', href: '#github', color: 'hover:text-gray-600' },
    { name: 'Discord', icon: '💬', href: '#discord', color: 'hover:text-indigo-500' },
    { name: 'YouTube', icon: '📺', href: '#youtube', color: 'hover:text-red-500' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Newsletter section */}
        <motion.div
          className="py-16 px-6 lg:px-12 border-b border-gray-800"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Stay in the Loop
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Get the latest updates on new features, tutorials, and exclusive content.
            </motion.p>
            
            <motion.form
              onSubmit={handleSubscribe}
              className="max-w-md mx-auto flex gap-4"
              variants={itemVariants}
            >
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <motion.button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        {/* Main footer content */}
        <motion.div
          className="py-16 px-6 lg:px-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {/* Brand */}
              <motion.div className="lg:col-span-2" variants={itemVariants}>
                <motion.div
                  className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
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
                </motion.div>
                <p className="text-gray-400 mb-6 max-w-sm">
                  Transforming web experiences through the power of interactive animations and cutting-edge design.
                </p>
                
                {/* Social links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className={`text-2xl text-gray-400 ${social.color} transition-colors duration-300`}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Footer links */}
              {Object.entries(footerLinks).map(([category, links]) => (
                <motion.div key={category} variants={itemVariants}>
                  <h3 className="text-lg font-semibold mb-4 capitalize text-gray-200">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <motion.li key={link.name}>
                        <motion.a
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-300"
                          whileHover={{ x: 5 }}
                        >
                          {link.name}
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="py-8 px-6 lg:px-12 border-t border-gray-800"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.div variants={itemVariants} className="text-gray-400">
                <p>&copy; 2024 Ethereal Shapes. All rights reserved.</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex space-x-6 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </footer>
  );
};