import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MicIcon,
  Music2Icon,
  HeadphonesIcon,
  RadioIcon,
  CalendarIcon,
  ClockIcon } from
'lucide-react';
export function StudioBooking() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const [selectedService, setSelectedService] = useState<string | null>(null);
  return (
    <section id="studio" className="py-24 bg-bg relative">
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
          
          <p className="text-orange font-medium text-sm tracking-[0.2em] uppercase mb-3">
            Studio
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            BOOK A SESSION
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Professional recording, mixing, mastering, and podcast services.
            Book your session and bring your music to life.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.button
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
            onClick={() => setSelectedService('recording')}
            className={`text-left bg-surface-2 border rounded-xl p-6 transition-all duration-200 ${selectedService === 'recording' ? 'border-orange glow-orange' : 'border-border hover:border-orange/50'}`}>
            
            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-4">
              <MicIcon className="w-6 h-6 text-orange" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-white mb-1">
              Vocal Recording
            </h3>
            <p className="text-text-dim text-sm mb-3">
              Professional vocal recording with top equipment
            </p>
            <p className="font-heading text-2xl font-bold text-gold">
              R300
              <span className="text-sm text-text-dim font-body font-normal">
                /hour
              </span>
            </p>
          </motion.button>

          <motion.button
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
            onClick={() => setSelectedService('mixing')}
            className={`text-left bg-surface-2 border rounded-xl p-6 transition-all duration-200 ${selectedService === 'mixing' ? 'border-magenta glow-magenta' : 'border-border hover:border-magenta/50'}`}>
            
            <div className="w-12 h-12 bg-magenta/10 rounded-xl flex items-center justify-center mb-4">
              <HeadphonesIcon className="w-6 h-6 text-magenta" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-white mb-1">
              Mixing
            </h3>
            <p className="text-text-dim text-sm mb-3">
              Get your track sounding clean and balanced
            </p>
            <p className="font-heading text-2xl font-bold text-gold">
              R500
              <span className="text-sm text-text-dim font-body font-normal">
                /track
              </span>
            </p>
          </motion.button>

          <motion.button
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
            onClick={() => setSelectedService('mastering')}
            className={`text-left bg-surface-2 border rounded-xl p-6 transition-all duration-200 ${
            selectedService === 'mastering' ?
            'border-purple glow-magenta' // Using magenta glow for purple as it looks better
            : 'border-border hover:border-purple/50'}`
            }>
            
            <div className="w-12 h-12 bg-purple/10 rounded-xl flex items-center justify-center mb-4">
              <Music2Icon className="w-6 h-6 text-purple" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-white mb-1">
              Mastering
            </h3>
            <p className="text-text-dim text-sm mb-3">
              Release-ready mastering for all platforms
            </p>
            <p className="font-heading text-2xl font-bold text-gold">
              R100
              <span className="text-sm text-text-dim font-body font-normal">
                /song
              </span>
            </p>
          </motion.button>

          <motion.button
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
            onClick={() => setSelectedService('podcast')}
            className={`text-left bg-surface-2 border rounded-xl p-6 transition-all duration-200 ${selectedService === 'podcast' ? 'border-gold glow-gold' : 'border-border hover:border-gold/50'}`}>
            
            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
              <RadioIcon className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-white mb-1">
              Podcast Recording
            </h3>
            <p className="text-text-dim text-sm mb-3">
              Record your podcast with professional audio
            </p>
            <p className="font-heading text-2xl font-bold text-gold">
              R300
              <span className="text-sm text-text-dim font-body font-normal">
                /hour
              </span>
            </p>
          </motion.button>
        </div>

        {/* Booking Form */}
        {selectedService &&
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
            duration: 0.4
          }}
          className="max-w-2xl mx-auto bg-surface border border-border rounded-xl p-8">
          
            <h3 className="font-heading text-2xl font-bold text-white mb-6">
              Book Your Session
            </h3>
            <div className="space-y-4">
              <div>
                <label
                htmlFor="booking-name"
                className="block text-sm font-medium text-text-muted mb-1.5">
                
                  Your Name
                </label>
                <input
                id="booking-name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-white placeholder-text-dim focus:border-orange focus:outline-none transition-colors" />
              
              </div>
              <div>
                <label
                htmlFor="booking-email"
                className="block text-sm font-medium text-text-muted mb-1.5">
                
                  Email
                </label>
                <input
                id="booking-email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-white placeholder-text-dim focus:border-orange focus:outline-none transition-colors" />
              
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                  htmlFor="booking-date"
                  className="block text-sm font-medium text-text-muted mb-1.5">
                  
                    <CalendarIcon className="w-3.5 h-3.5 inline mr-1 text-orange" />
                    Preferred Date
                  </label>
                  <input
                  id="booking-date"
                  type="date"
                  className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-white focus:border-orange focus:outline-none transition-colors" />
                
                </div>
                <div>
                  <label
                  htmlFor="booking-time"
                  className="block text-sm font-medium text-text-muted mb-1.5">
                  
                    <ClockIcon className="w-3.5 h-3.5 inline mr-1 text-orange" />
                    Preferred Time
                  </label>
                  <select
                  id="booking-time"
                  className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-white focus:border-orange focus:outline-none transition-colors">
                  
                    <option value="">Select time</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </div>
              </div>
              <button className="w-full py-3.5 bg-gradient-warm text-bg font-heading font-bold tracking-wide rounded-lg hover:opacity-90 transition-opacity mt-2">
                BOOK SESSION — PAY DEPOSIT
              </button>
            </div>
          </motion.div>
        }
      </div>
    </section>);

}