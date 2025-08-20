'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Contact = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', company: '', message: '' });
      alert('Thank you for your message! We\'ll get back to you soon.');
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "hello@etherealshapes.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: "📍",
      title: "Office",
      value: "San Francisco, CA",
      description: "Available for virtual meetings"
    }
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 px-6 lg:px-12 relative overflow-hidden lg:ml-96">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-500/10 to-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
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
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to transform your website with stunning animations? Let's create something amazing together.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl p-8 lg:p-12 shadow-2xl"
            >
              <motion.h3
                className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                Send us a message
              </motion.h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: 'name', label: 'Name', type: 'text', required: true },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                  { name: 'company', label: 'Company', type: 'text', required: false }
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    variants={itemVariants}
                    custom={index}
                  >
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <motion.input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleInputChange}
                      required={field.required}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                ))}

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Contact cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className="text-4xl"
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {info.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {info.title}
                      </h4>
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">
                        {info.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8"
            >
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Connect with us
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Twitter', icon: '🐦', color: 'from-blue-400 to-blue-600' },
                  { name: 'LinkedIn', icon: '💼', color: 'from-blue-600 to-blue-800' },
                  { name: 'GitHub', icon: '🐙', color: 'from-gray-700 to-gray-900' },
                  { name: 'Discord', icon: '💬', color: 'from-indigo-500 to-purple-600' }
                ].map((social, index) => (
                  <motion.button
                    key={social.name}
                    className={`p-4 bg-gradient-to-r ${social.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl">{social.icon}</span>
                    <span>{social.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-800 rounded-2xl p-8"
            >
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Facts
              </h4>
              <div className="space-y-4">
                {[
                  { label: 'Happy Clients', value: '500+' },
                  { label: 'Projects Completed', value: '1,200+' },
                  { label: 'Team Members', value: '25' },
                  { label: 'Years Experience', value: '8+' }
                ].map((stat, index) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      {stat.label}
                    </span>
                    <motion.span
                      className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      {stat.value}
                    </motion.span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};