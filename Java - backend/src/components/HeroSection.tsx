import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircleIcon, ChevronDownIcon } from 'lucide-react';
export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg pt-20">
      
      {/* Dramatic Sunset Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple/20 via-bg to-bg" />

      {/* Tribal Pattern Overlay */}
      <div className="absolute inset-0 bg-tribal-pattern" />

      {/* Warm Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-magenta/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange/15 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Logo */}
        <motion.img
          src="/Lukulu_Logo.png"
          alt="Lukulu Academy & Recordings logo"
          className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(232,168,56,0.3)]"
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.6
          }} />
        

        {/* Badge */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2,
            duration: 0.5
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface-2/80 backdrop-blur-sm border border-border rounded-full mb-8">
          
          <span className="w-2 h-2 bg-orange rounded-full animate-pulse shadow-[0_0_8px_rgba(225,112,85,0.8)]" />
          <span className="text-xs font-medium text-text-muted tracking-wide uppercase">
            Now Enrolling — Learn Remotely from Anywhere in SA
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.3,
            duration: 0.6
          }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
          
          <span className="text-white">LEARN MUSIC.</span>
          <br />
          <span className="text-gradient-sunset">CREATE MUSIC.</span>
          <br />
          <span className="text-white">RELEASE MUSIC.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.5,
            duration: 0.5
          }}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 font-body leading-relaxed">
          
          Master FL Studio, Cubase & Reason. Learn the music business. Then
          release your tracks through Lukulu Recordings.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.7,
            duration: 0.5
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <a
            href="#courses"
            className="px-8 py-4 bg-gradient-warm text-bg font-heading font-bold text-lg tracking-wide rounded hover:opacity-90 transition-opacity duration-200 glow-orange">
            
            START LEARNING
          </a>
          <a
            href="#label"
            className="flex items-center gap-2 px-8 py-4 border border-magenta/50 text-white font-heading font-medium text-lg tracking-wide rounded hover:border-magenta hover:bg-magenta/10 transition-colors duration-200">
            
            <PlayCircleIcon className="w-5 h-5 text-magenta" />
            SUBMIT YOUR DEMO
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 1,
            duration: 0.6
          }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          
          <div>
            <p className="font-heading text-3xl md:text-4xl font-bold text-orange">
              14+
            </p>
            <p className="text-xs text-text-dim mt-1 uppercase tracking-wide">
              Courses
            </p>
          </div>
          <div>
            <p className="font-heading text-3xl md:text-4xl font-bold text-gold">
              500+
            </p>
            <p className="text-xs text-text-dim mt-1 uppercase tracking-wide">
              Students
            </p>
          </div>
          <div>
            <p className="font-heading text-3xl md:text-4xl font-bold text-magenta">
              20+
            </p>
            <p className="text-xs text-text-dim mt-1 uppercase tracking-wide">
              Releases
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 8, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 2
        }}>
        
        <ChevronDownIcon className="w-6 h-6 text-orange/50" />
      </motion.div>
    </section>);

}