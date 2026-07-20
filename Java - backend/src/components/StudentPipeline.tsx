import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BookOpenIcon,
  Music2Icon,
  SendIcon,
  RocketIcon,
  ArrowRightIcon,
  BanknoteIcon } from
'lucide-react';
export function StudentPipeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  return (
    <section className="py-24 bg-bg relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[150px]" />

      <div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
            Your Journey
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            FROM STUDENT TO ARTIST
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            This is what makes Lukulu Academy different. We don't just teach —
            we give you a real path to releasing music.
          </p>
        </motion.div>

        {/* Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 items-start">
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
            className="text-center relative">
            
            <div className="w-20 h-20 bg-gold/10 border-2 border-gold rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpenIcon className="w-9 h-9 text-gold" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              1. LEARN
            </h3>
            <p className="text-text-muted text-sm px-4">
              Take courses in FL Studio, Cubase, Reason, or music business
            </p>
            {/* Arrow (desktop only) */}
            <div className="hidden md:block absolute top-10 -right-2 z-10">
              <ArrowRightIcon className="w-5 h-5 text-gold/40" />
            </div>
          </motion.div>

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
            className="text-center relative">
            
            <div className="w-20 h-20 bg-orange/10 border-2 border-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Music2Icon className="w-9 h-9 text-orange" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              2. CREATE
            </h3>
            <p className="text-text-muted text-sm px-4">
              Produce your own track with your DAW using what you've learned
            </p>
            <div className="hidden md:block absolute top-10 -right-2 z-10">
              <ArrowRightIcon className="w-5 h-5 text-orange/40" />
            </div>
          </motion.div>

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
            className="text-center relative">
            
            <div className="w-20 h-20 bg-magenta/10 border-2 border-magenta rounded-2xl flex items-center justify-center mx-auto mb-4">
              <SendIcon className="w-9 h-9 text-magenta" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              3. SUBMIT
            </h3>
            <p className="text-text-muted text-sm px-4">
              Send your demo to Lukulu Recordings for review
            </p>
            <div className="hidden md:block absolute top-10 -right-2 z-10">
              <ArrowRightIcon className="w-5 h-5 text-magenta/40" />
            </div>
          </motion.div>

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
            className="text-center relative">
            
            <div className="w-20 h-20 bg-gradient-sunset border-2 border-transparent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <RocketIcon className="w-9 h-9 text-white" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              4. RELEASE
            </h3>
            <p className="text-text-muted text-sm px-4">
              Your music goes live on all major platforms worldwide
            </p>
            <div className="hidden md:block absolute top-10 -right-2 z-10">
              <ArrowRightIcon className="w-5 h-5 text-orange/40" />
            </div>
          </motion.div>

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
              delay: 0.5,
              duration: 0.5
            }}
            className="text-center">
            
            <div className="w-20 h-20 bg-gold/10 border-2 border-gold rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BanknoteIcon className="w-9 h-9 text-gold" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              5. EARN
            </h3>
            <p className="text-text-muted text-sm px-4">
              Earn royalties from your released music on all platforms
            </p>
          </motion.div>
        </div>

        {/* CTA */}
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
            delay: 0.6,
            duration: 0.5
          }}
          className="text-center mt-16">
          
          <a
            href="#courses"
            className="inline-block px-8 py-4 bg-gradient-warm text-bg font-heading font-bold text-lg tracking-wide rounded hover:opacity-90 transition-opacity glow-orange">
            
            START YOUR JOURNEY
          </a>
        </motion.div>
      </div>
    </section>);

}