import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CheckIcon,
  StarIcon,
  ZapIcon,
  CrownIcon,
  UsersIcon } from
'lucide-react';
export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  return (
    <section id="pricing" className="py-24 bg-surface relative">
      <div className="absolute top-0 left-0 right-0 h-px divider-sunset" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={
          isInView ?
          {
            opacity: 1,
            y: 0
          } :
          {}
          }
          transition={{
            duration: 0.6
          }}
          className="text-center mb-16">
          
          <p className="text-gold font-medium text-sm tracking-[0.2em] uppercase mb-3">
            Pricing
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            CHOOSE YOUR PLAN
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Affordable plans designed for South African musicians. Start free,
            upgrade when you're ready.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Free Tier */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={
            isInView ?
            {
              opacity: 1,
              y: 0
            } :
            {}
            }
            transition={{
              delay: 0.1,
              duration: 0.5
            }}
            className="bg-surface-2 border border-border rounded-xl p-6 flex flex-col">
            
            <div className="mb-6">
              <p className="text-text-dim text-xs uppercase tracking-wider mb-2">
                Free
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-white">
                  R0
                </span>
              </div>
              <p className="text-text-dim text-sm mt-2">
                Get a taste of what we offer
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-text-dim mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">Intro lessons</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-text-dim mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Community access
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-text-dim mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">Demo submission</span>
              </li>
            </ul>
            <a
              href="#"
              className="block text-center py-3 border border-border rounded-lg text-sm font-medium text-text-muted hover:border-orange hover:text-orange transition-colors">
              
              Join Free
            </a>
          </motion.div>

          {/* Basic Plan */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={
            isInView ?
            {
              opacity: 1,
              y: 0
            } :
            {}
            }
            transition={{
              delay: 0.2,
              duration: 0.5
            }}
            className="bg-surface-2 border border-border rounded-xl p-6 flex flex-col">
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <StarIcon className="w-4 h-4 text-gold" />
                <p className="text-gold text-xs uppercase tracking-wider font-medium">
                  Basic
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-white">
                  R149
                </span>
                <span className="text-text-dim text-sm">/month</span>
              </div>
              <p className="text-text-dim text-sm mt-2">
                For beginners starting out
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  All beginner courses
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Free software & VSTs included
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Download learning materials
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Community support
                </span>
              </li>
            </ul>
            <a
              href="#"
              className="block text-center py-3 border border-gold/50 rounded-lg text-sm font-medium text-gold hover:bg-gold hover:text-bg transition-colors">
              
              Get Basic
            </a>
          </motion.div>

          {/* Pro Plan — Highlighted */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={
            isInView ?
            {
              opacity: 1,
              y: 0
            } :
            {}
            }
            transition={{
              delay: 0.3,
              duration: 0.5
            }}
            className="bg-surface-2 border-2 border-orange rounded-xl p-6 flex flex-col relative glow-orange">
            
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-warm text-bg text-xs font-bold rounded-full tracking-wider uppercase">
              Most Popular
            </div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <ZapIcon className="w-4 h-4 text-orange" />
                <p className="text-orange text-xs uppercase tracking-wider font-medium">
                  Pro
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-white">
                  R349
                </span>
                <span className="text-text-dim text-sm">/month</span>
              </div>
              <p className="text-text-dim text-sm mt-2">
                For serious musicians
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  All courses (every level)
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Free software & VSTs included
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Mastering at R100/song
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">Live classes</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Feedback on your music
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Demo submissions to label
                </span>
              </li>
            </ul>
            <a
              href="#"
              className="block text-center py-3 bg-gradient-warm rounded-lg text-sm font-bold text-bg hover:opacity-90 transition-opacity">
              
              Go Pro
            </a>
          </motion.div>

          {/* VIP Plan */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={
            isInView ?
            {
              opacity: 1,
              y: 0
            } :
            {}
            }
            transition={{
              delay: 0.4,
              duration: 0.5
            }}
            className="bg-surface-2 border border-border rounded-xl p-6 flex flex-col">
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <CrownIcon className="w-4 h-4 text-magenta" />
                <p className="text-magenta text-xs uppercase tracking-wider font-medium">
                  VIP
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-white">
                  R999
                </span>
                <span className="text-text-dim text-sm">/month</span>
              </div>
              <p className="text-text-dim text-sm mt-2">The full experience</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Everything in Pro
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Free software & VSTs included
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Free mastering included
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Studio session discount
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Direct mentorship
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Lukulu Recordings release opportunity
                </span>
              </li>
            </ul>
            <a
              href="#"
              className="block text-center py-3 border border-magenta/50 rounded-lg text-sm font-medium text-magenta hover:bg-magenta hover:text-white transition-colors">
              
              Go VIP
            </a>
          </motion.div>
        </div>

        {/* Referral Banner */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={
          isInView ?
          {
            opacity: 1,
            y: 0
          } :
          {}
          }
          transition={{
            delay: 0.5,
            duration: 0.5
          }}
          className="bg-gradient-to-r from-surface-2 to-surface border border-border rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          
          <div className="w-12 h-12 bg-magenta/10 rounded-full flex items-center justify-center flex-shrink-0">
            <UsersIcon className="w-6 h-6 text-magenta" />
          </div>
          <div className="flex-1">
            <h4 className="font-heading text-lg font-semibold text-white mb-1">
              🤝 Refer a Friend, Earn 5% Commission
            </h4>
            <p className="text-text-muted text-sm">
              Spread the word about LAR and earn money when someone you refer
              enrols. Anyone can be an agent!
            </p>
          </div>
          <a
            href="#"
            className="px-6 py-2.5 border border-magenta/50 text-magenta text-sm font-medium rounded-lg hover:bg-magenta hover:text-white transition-colors whitespace-nowrap">
            
            Become an Agent
          </a>
        </motion.div>
      </div>
    </section>);

}