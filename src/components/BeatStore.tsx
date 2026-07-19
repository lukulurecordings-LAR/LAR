import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PlayIcon, ShoppingCartIcon, TagIcon } from 'lucide-react';
export function BeatStore() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  return (
    <section id="beats" className="py-24 bg-surface relative">
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
          
          <p className="text-magenta font-medium text-sm tracking-[0.2em] uppercase mb-3">
            Beat Store
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            GET FIRE BEATS
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Browse and buy exclusive beats. Amapiano, Hip Hop, Afro House, Trap
            — all produced in-house.
          </p>
        </motion.div>

        {/* License Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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
            className="bg-surface-2 border border-border rounded-xl p-6 text-center">
            
            <TagIcon className="w-8 h-8 text-text-dim mx-auto mb-3" />
            <h3 className="font-heading text-lg font-semibold text-white mb-1">
              Basic Lease
            </h3>
            <p className="font-heading text-3xl font-bold text-gold mb-2">
              R300
            </p>
            <p className="text-text-dim text-sm">
              MP3 file, 5,000 streams, non-exclusive
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
            className="bg-surface-2 border border-orange rounded-xl p-6 text-center glow-orange">
            
            <TagIcon className="w-8 h-8 text-orange mx-auto mb-3" />
            <h3 className="font-heading text-lg font-semibold text-white mb-1">
              Premium Lease
            </h3>
            <p className="font-heading text-3xl font-bold text-orange mb-2">
              R800
            </p>
            <p className="text-text-dim text-sm">
              WAV + stems, 50,000 streams, non-exclusive
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
            className="bg-surface-2 border border-border rounded-xl p-6 text-center">
            
            <TagIcon className="w-8 h-8 text-magenta mx-auto mb-3" />
            <h3 className="font-heading text-lg font-semibold text-white mb-1">
              Exclusive
            </h3>
            <p className="font-heading text-3xl font-bold text-magenta mb-2">
              R3,500
            </p>
            <p className="text-text-dim text-sm">
              Full ownership, WAV + stems + project file
            </p>
          </motion.div>
        </div>

        {/* Beat Listings */}
        <div className="space-y-3">
          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={
            isInView ?
            {
              opacity: 1,
              x: 0
            } :
            {}
            }
            transition={{
              delay: 0.3,
              duration: 0.4
            }}
            className="flex items-center gap-4 bg-surface-2 border border-border rounded-xl p-4 hover:border-orange/30 transition-colors group">
            
            <button
              className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-orange/20 transition-colors"
              aria-label="Play Midnight Groove">
              
              <PlayIcon className="w-5 h-5 text-orange ml-0.5" />
            </button>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading text-base font-semibold text-white truncate">
                Indlela
              </h4>
              <p className="text-text-dim text-xs">
                Amapiano • 115 BPM • Lukulu
              </p>
            </div>
            <span className="hidden sm:block px-3 py-1 bg-orange/10 text-orange text-xs font-medium rounded-full">
              Amapiano
            </span>
            <span className="font-heading text-lg font-bold text-gold">
              R300
            </span>
            <button
              className="p-2 text-text-dim hover:text-orange transition-colors"
              aria-label="Add to cart">
              
              <ShoppingCartIcon className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={
            isInView ?
            {
              opacity: 1,
              x: 0
            } :
            {}
            }
            transition={{
              delay: 0.4,
              duration: 0.4
            }}
            className="flex items-center gap-4 bg-surface-2 border border-border rounded-xl p-4 hover:border-magenta/30 transition-colors group">
            
            <button
              className="w-12 h-12 bg-magenta/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-magenta/20 transition-colors"
              aria-label="Play Street Anthem">
              
              <PlayIcon className="w-5 h-5 text-magenta ml-0.5" />
            </button>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading text-base font-semibold text-white truncate">
                Riot
              </h4>
              <p className="text-text-dim text-xs">
                Afro house Hip Hop • 90 BPM • Lukulu
              </p>
            </div>
            <span className="hidden sm:block px-3 py-1 bg-magenta/10 text-magenta text-xs font-medium rounded-full">
              Afro house Hip Hop
            </span>
            <span className="font-heading text-lg font-bold text-gold">
              R300
            </span>
            <button
              className="p-2 text-text-dim hover:text-magenta transition-colors"
              aria-label="Add to cart">
              
              <ShoppingCartIcon className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={
            isInView ?
            {
              opacity: 1,
              x: 0
            } :
            {}
            }
            transition={{
              delay: 0.5,
              duration: 0.4
            }}
            className="flex items-center gap-4 bg-surface-2 border border-border rounded-xl p-4 hover:border-purple/30 transition-colors group">
            
            <button
              className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-purple/20 transition-colors"
              aria-label="Play Sunset Vibes">
              
              <PlayIcon className="w-5 h-5 text-purple ml-0.5" />
            </button>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading text-base font-semibold text-white truncate">
                Melo
              </h4>
              <p className="text-text-dim text-xs">
                Afro House • 122 BPM • Lukulu
              </p>
            </div>
            <span className="hidden sm:block px-3 py-1 bg-purple/10 text-purple text-xs font-medium rounded-full">
              Afro House
            </span>
            <span className="font-heading text-lg font-bold text-gold">
              R300
            </span>
            <button
              className="p-2 text-text-dim hover:text-purple transition-colors"
              aria-label="Add to cart">
              
              <ShoppingCartIcon className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={
            isInView ?
            {
              opacity: 1,
              x: 0
            } :
            {}
            }
            transition={{
              delay: 0.6,
              duration: 0.4
            }}
            className="flex items-center gap-4 bg-surface-2 border border-border rounded-xl p-4 hover:border-red-500/30 transition-colors group">
            
            <button
              className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors"
              aria-label="Play Dark Mode">
              
              <PlayIcon className="w-5 h-5 text-red-500 ml-0.5" />
            </button>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading text-base font-semibold text-white truncate">
                Lukulu Tapes
              </h4>
              <p className="text-text-dim text-xs">House • 120 BPM • Lukulu</p>
            </div>
            <span className="hidden sm:block px-3 py-1 bg-red-500/10 text-red-500 text-xs font-medium rounded-full">
              House
            </span>
            <span className="font-heading text-lg font-bold text-gold">
              R300
            </span>
            <button
              className="p-2 text-text-dim hover:text-red-500 transition-colors"
              aria-label="Add to cart">
              
              <ShoppingCartIcon className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>);

}