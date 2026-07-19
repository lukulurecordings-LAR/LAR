import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCapIcon, MicIcon, DiscIcon, PaletteIcon } from 'lucide-react';
export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-sunset" />

      {/* Subtle background element */}
      <div className="absolute -right-64 top-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px] pointer-events-none" />

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
          
          <p className="text-orange font-medium text-sm tracking-[0.2em] uppercase mb-3">
            About Us
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            YOUR MUSIC CAREER STARTS HERE
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Lukulu Academy & Recordings is a complete music ecosystem built for
            young South African artists. We teach you, help you create, and
            release your music to the world.
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
            className="bg-surface-2 border border-border rounded-xl p-6 text-center hover:border-gold/30 transition-colors duration-300 group">
            
            <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
              <GraduationCapIcon className="w-7 h-7 text-gold" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-white mb-2">
              ACADEMY
            </h3>
            <p className="text-text-muted text-sm leading-relaxed font-[Montserrat,_sans-serif]">
              🎹 FL Studio - 🎼 Cubase - 🎛 Reason - 💼 Music Business - Other
              course (Advanced: Plugins, Tricks, and Tools)
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
            className="bg-surface-2 border border-border rounded-xl p-6 text-center hover:border-orange/30 transition-colors duration-300 group">
            
            <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange/20 transition-colors">
              <MicIcon className="w-7 h-7 text-orange" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-white mb-2">
              STUDIO
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Book professional recording sessions — vocals, mixing, mastering,
              and podcast recording. We also offer remote sessions. (No need to
              come to our studios)
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
              <DiscIcon className="w-7 h-7 text-magenta" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-white mb-2">
              RECORD LABEL
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Submit your demo to Lukulu Recordings. Get signed, distributed,
              and heard worldwide.
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
              <PaletteIcon className="w-7 h-7 text-purple" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-white mb-2">
              CREATIVE
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Cover art, posters, video editing, and social media content for
              your music brand.
            </p>
          </motion.div>
        </div>
      </div>
    </section>);

}