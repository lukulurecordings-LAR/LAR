import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlobeIcon, DownloadIcon, UsersIcon, BanknoteIcon } from 'lucide-react';
export function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-sunset" />

      {/* Subtle background element */}
      <div className="absolute -left-64 top-0 w-[500px] h-[500px] bg-magenta/5 rounded-full blur-[100px] pointer-events-none" />

      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
          
          <p className="text-magenta font-medium tracking-[0.2em] uppercase mb-3 text-[20px]">
            Why Choose LAR?
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            EVERYTHING YOU NEED TO START
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            We provide the tools, the knowledge, and the platform to launch your
            music career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            className="bg-surface-2 border border-border rounded-xl p-6 text-center hover:border-orange/30 transition-colors duration-300 group">
            
            <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange/20 transition-colors">
              <GlobeIcon className="w-7 h-7 text-orange" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-white mb-2">
              LEARN REMOTELY
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              All you need is your DAW and internet. Learn from anywhere in
              South Africa — townships, rural areas, anywhere.
            </p>
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
            className="bg-surface-2 border border-border rounded-xl p-6 text-center hover:border-gold/30 transition-colors duration-300 group">
            
            <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
              <DownloadIcon className="w-7 h-7 text-gold" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-white mb-2">
              FREE SOFTWARE & VSTs
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Students get software and VSTs from us. No need to buy expensive
              tools to start learning.
            </p>
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
            className="bg-surface-2 border border-border rounded-xl p-6 text-center hover:border-magenta/30 transition-colors duration-300 group">
            
            <div className="w-14 h-14 bg-magenta/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-magenta/20 transition-colors">
              <UsersIcon className="w-7 h-7 text-magenta" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-white mb-2">
              AGENT REWARD PROGRAM
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Refer someone who enrols and earn 5% commission. Spread the word
              and make money — anyone can be an agent!
            </p>
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
            className="bg-surface-2 border border-border rounded-xl p-6 text-center hover:border-purple/30 transition-colors duration-300 group">
            
            <div className="w-14 h-14 bg-purple/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple/20 transition-colors">
              <BanknoteIcon className="w-7 h-7 text-purple" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-white mb-2">
              EARN ROYALTIES
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              After completing your course, release music through Lukulu
              Recordings and earn royalties from streaming platforms.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{
            opacity: 0
          }}
          animate={
          isInView ?
          {
            opacity: 1
          } :
          {}
          }
          transition={{
            delay: 0.6,
            duration: 0.5
          }}
          className="text-center mt-12">
          
          <p className="text-text-dim text-sm">
            We also offer professional mastering at just{' '}
            <span className="text-gold font-semibold">R100 per song</span>.
          </p>
        </motion.div>
      </div>
    </section>);

}