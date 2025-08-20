'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Pricing = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const pricingPlans = [
    {
      name: "Starter",
      price: { monthly: 29, yearly: 290 },
      description: "Perfect for small projects and personal websites",
      features: [
        "Basic shape animations",
        "5 interactive elements",
        "Standard support",
        "Mobile responsive",
        "Basic analytics"
      ],
      highlighted: false,
      color: "from-gray-600 to-gray-700",
      icon: "🚀"
    },
    {
      name: "Professional",
      price: { monthly: 79, yearly: 790 },
      description: "Ideal for growing businesses and agencies",
      features: [
        "Advanced shape morphing",
        "25 interactive elements",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "Performance optimization"
      ],
      highlighted: true,
      color: "from-purple-600 to-pink-600",
      icon: "⭐"
    },
    {
      name: "Enterprise",
      price: { monthly: 199, yearly: 1990 },
      description: "For large organizations and complex projects",
      features: [
        "Unlimited animations",
        "Unlimited elements",
        "24/7 dedicated support",
        "Custom development",
        "White-label solution",
        "Advanced API",
        "Team collaboration",
        "Custom integrations",
        "SLA guarantee"
      ],
      highlighted: false,
      color: "from-indigo-600 to-blue-600",
      icon: "🏆"
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

  const toggleVariants = {
    off: { x: 0 },
    on: { x: 24 },
  };

  return (
    <section className="py-20 px-6 lg:px-12 relative overflow-hidden lg:mr-96">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl" />
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
            Choose Your Plan
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Select the perfect plan for your project. All plans include our core animation technology.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            className="flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className={`text-lg font-medium ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Monthly
            </span>
            <motion.button
              className="relative w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-md"
                variants={toggleVariants}
                animate={billingCycle === 'yearly' ? 'on' : 'off'}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            </motion.button>
            <span className={`text-lg font-medium ${billingCycle === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Yearly
              <span className="ml-2 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                Save 17%
              </span>
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`relative group ${plan.highlighted ? 'lg:scale-105' : ''}`}
              whileHover="hover"
            >
              {/* Highlighted card glow */}
              {plan.highlighted && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

              {/* Main card */}
              <div className={`relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 ${
                plan.highlighted 
                  ? 'border-purple-500 dark:border-purple-400' 
                  : 'border-gray-200 dark:border-gray-700'
              } rounded-3xl p-8 h-full`}>
                
                {/* Popular badge */}
                {plan.highlighted && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Most Popular
                  </motion.div>
                )}

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center text-3xl mb-6 mx-auto`}
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {plan.icon}
                </motion.div>

                {/* Plan name */}
                <motion.h3
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4"
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  {plan.name}
                </motion.h3>

                {/* Price */}
                <motion.div
                  className="text-center mb-6"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.7
                  }}
                >
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 text-lg">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </motion.div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
                  {plan.description}
                </p>

                {/* Features list */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * featureIndex, duration: 0.5 }}
                    >
                      <motion.div
                        className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: featureIndex * 0.1
                        }}
                      >
                        ✓
                      </motion.div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA button */}
                <motion.button
                  className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <motion.button
            className="text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Sales for Custom Plans →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};