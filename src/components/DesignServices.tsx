import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ImageIcon,
  LayoutIcon,
  MegaphoneIcon,
  FilmIcon,
  SmartphoneIcon } from
'lucide-react';
export function DesignServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  return (
    <section id="design" className="py-24 bg-bg relative">
      <div className="absolute inset-0 bg-tribal-pattern" />

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
          
          <p className="text-purple font-medium text-sm tracking-[0.2em] uppercase mb-3">
            Creative Services
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            LOOK AS GOOD AS YOU SOUND
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Professional graphic design and video services for your music brand.
            Stand out from the crowd.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            className="bg-surface border border-border rounded-xl overflow-hidden group hover:border-orange/30 transition-colors">
            
            <div className="h-40 bg-gradient-to-br from-orange/20 to-orange/5 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-orange/60" />
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Cover Artwork
              </h3>
              <p className="text-text-muted text-sm mb-4">
                Eye-catching single and album cover art that represents your
                sound.
              </p>
              <div className="flex items-center justify-between">
                <span className="font-heading text-2xl font-bold text-gold">
                  R250
                </span>
                <a
                  href="#"
                  className="text-sm text-orange font-medium hover:text-gold transition-colors">
                  
                  Order Now →
                </a>
              </div>
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
            className="bg-surface border border-border rounded-xl overflow-hidden group hover:border-magenta/30 transition-colors">
            
            <div className="h-40 bg-gradient-to-br from-magenta/20 to-magenta/5 flex items-center justify-center">
              <MegaphoneIcon className="w-16 h-16 text-magenta/60" />
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Event Posters
              </h3>
              <p className="text-text-muted text-sm mb-4">
                Bold poster designs for gigs, events, and promotions.
              </p>
              <div className="flex items-center justify-between">
                <span className="font-heading text-2xl font-bold text-gold">
                  R200
                </span>
                <a
                  href="#"
                  className="text-sm text-magenta font-medium hover:text-gold transition-colors">
                  
                  Order Now →
                </a>
              </div>
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
            className="bg-surface border border-border rounded-xl overflow-hidden group hover:border-purple/30 transition-colors">
            
            <div className="h-40 bg-gradient-to-br from-purple/20 to-purple/5 flex items-center justify-center">
              <FilmIcon className="w-16 h-16 text-purple/60" />
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Video Editing
              </h3>
              <p className="text-text-muted text-sm mb-4">
                Music video editing, lyric videos, and visual content for your
                releases.
              </p>
              <div className="flex items-center justify-between">
                <span className="font-heading text-2xl font-bold text-gold">
                  R800
                </span>
                <a
                  href="#"
                  className="text-sm text-purple font-medium hover:text-gold transition-colors">
                  
                  Order Now →
                </a>
              </div>
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
            className="bg-surface border border-border rounded-xl overflow-hidden group hover:border-gold/30 transition-colors">
            
            <div className="h-40 bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
              <LayoutIcon className="w-16 h-16 text-gold/60" />
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Album Artwork
              </h3>
              <p className="text-text-muted text-sm mb-4">
                Full album packaging — front, back, and booklet design.
              </p>
              <div className="flex items-center justify-between">
                <span className="font-heading text-2xl font-bold text-gold">
                  R500
                </span>
                <a
                  href="#"
                  className="text-sm text-gold font-medium hover:text-orange transition-colors">
                  
                  Order Now →
                </a>
              </div>
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
            className="bg-surface border border-border rounded-xl overflow-hidden group sm:col-span-2 lg:col-span-1 hover:border-orange/30 transition-colors">
            
            <div className="h-40 bg-gradient-sunset opacity-80 flex items-center justify-center">
              <SmartphoneIcon className="w-16 h-16 text-white/80" />
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Social Media Content
              </h3>
              <p className="text-text-muted text-sm mb-4">
                Instagram, TikTok, and Facebook content packs for your brand.
              </p>
              <div className="flex items-center justify-between">
                <span className="font-heading text-2xl font-bold text-gold">
                  R350
                </span>
                <a
                  href="#"
                  className="text-sm text-orange font-medium hover:text-gold transition-colors">
                  
                  Order Now →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}