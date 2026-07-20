import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  HeadphonesIcon,
  Music2Icon,
  BriefcaseIcon,
  PlayIcon,
  ClockIcon,
  UsersIcon,
  ArrowRightIcon,
  SlidersIcon,
  BookOpenIcon,
  CheckCircle2Icon } from
'lucide-react';
type Category = 'flstudio' | 'cubase' | 'reason' | 'business';
export function CoursesSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('flstudio');
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  return (
    <section id="courses" className="py-24 bg-bg relative">
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
          className="text-center mb-12">
          
          <p className="text-magenta font-medium text-sm tracking-[0.2em] uppercase mb-3">
            Courses
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            MASTER YOUR CRAFT
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            From beginner to professional. Choose your path and start building
            your music career today.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4 sm:pb-0">
          <div className="inline-flex bg-surface border border-border rounded-xl p-1.5 gap-1 whitespace-nowrap">
            <button
              onClick={() => setActiveCategory('flstudio')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === 'flstudio' ? 'bg-gradient-warm text-bg shadow-[0_0_10px_rgba(225,112,85,0.2)]' : 'text-text-muted hover:text-white'}`}>
              
              <Music2Icon className="w-4 h-4" />
              FL Studio
            </button>
            <button
              onClick={() => setActiveCategory('cubase')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === 'cubase' ? 'bg-gradient-warm text-bg shadow-[0_0_10px_rgba(225,112,85,0.2)]' : 'text-text-muted hover:text-white'}`}>
              
              <HeadphonesIcon className="w-4 h-4" />
              Cubase
            </button>
            <button
              onClick={() => setActiveCategory('reason')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === 'reason' ? 'bg-gradient-warm text-bg shadow-[0_0_10px_rgba(225,112,85,0.2)]' : 'text-text-muted hover:text-white'}`}>
              
              <SlidersIcon className="w-4 h-4" />
              Reason
            </button>
            <button
              onClick={() => setActiveCategory('business')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === 'business' ? 'bg-gradient-warm text-bg shadow-[0_0_10px_rgba(225,112,85,0.2)]' : 'text-text-muted hover:text-white'}`}>
              
              <BriefcaseIcon className="w-4 h-4" />
              Music Business
            </button>
          </div>
        </div>

        {/* FL Studio Courses */}
        {activeCategory === 'flstudio' &&
        <motion.div
          key="flstudio"
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div className="bg-surface border border-border rounded-xl p-6 group hover:border-orange/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full">
                  Beginner
                </span>
                <PlayIcon className="w-5 h-5 text-text-dim group-hover:text-orange transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                FL Studio Beginner
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Installing FL Studio
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Understanding the interface
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Channel rack basics
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Piano roll basics
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Creating your first beat
                </li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-text-dim mt-auto pt-4 border-t border-border">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" /> 4 weeks
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" /> 250+ students
                </span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 group hover:border-orange/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full">
                  Intermediate
                </span>
                <PlayIcon className="w-5 h-5 text-text-dim group-hover:text-orange transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                FL Studio Beat Production
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  Drum programming
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  Sampling
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  Melody creation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  Arrangement
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  Exporting beats
                </li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-text-dim mt-auto pt-4 border-t border-border">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" /> 6 weeks
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" /> 180+ students
                </span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 group hover:border-orange/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-orange/10 text-orange text-xs font-medium rounded-full">
                  Advanced
                </span>
                <PlayIcon className="w-5 h-5 text-text-dim group-hover:text-orange transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                FL Studio Mixing
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Mixer basics
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  EQ
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Compression
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Reverb and delay
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Mixing vocals
                </li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-text-dim mt-auto pt-4 border-t border-border">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" /> 6 weeks
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" /> 120+ students
                </span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 group hover:border-orange/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-magenta/10 text-magenta text-xs font-medium rounded-full">
                  Expert
                </span>
                <PlayIcon className="w-5 h-5 text-text-dim group-hover:text-orange transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                FL Studio Mastering
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />{' '}
                  Loudness
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />{' '}
                  Final EQ
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />{' '}
                  Limiting
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />{' '}
                  Exporting for streaming platforms
                </li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-text-dim mt-auto pt-4 border-t border-border">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" /> 4 weeks
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" /> 80+ students
                </span>
              </div>
            </div>
          </motion.div>
        }

        {/* Cubase Courses */}
        {activeCategory === 'cubase' &&
        <motion.div
          key="cubase"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
            <div className="bg-surface border border-border rounded-xl p-6 group hover:border-magenta/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full">
                  Beginner
                </span>
                <PlayIcon className="w-5 h-5 text-text-dim group-hover:text-magenta transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Cubase Beginner
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />{' '}
                  Setting up Cubase
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />{' '}
                  Creating a project
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />{' '}
                  Recording audio
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />{' '}
                  MIDI basics
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-magenta mt-0.5 flex-shrink-0" />{' '}
                  Editing audio
                </li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-text-dim mt-auto pt-4 border-t border-border">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" /> 5 weeks
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" /> 150+ students
                </span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 group hover:border-magenta/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full">
                  Intermediate
                </span>
                <PlayIcon className="w-5 h-5 text-text-dim group-hover:text-magenta transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Cubase Music Production
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  Arrangement
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  MIDI programming
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  Instrument plugins
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  Automation
                </li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-text-dim mt-auto pt-4 border-t border-border">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" /> 6 weeks
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" /> 110+ students
                </span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 group hover:border-magenta/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-orange/10 text-orange text-xs font-medium rounded-full">
                  Advanced
                </span>
                <PlayIcon className="w-5 h-5 text-text-dim group-hover:text-magenta transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Cubase Mixing
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Channel strip
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Effects
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Mixing workflow
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Final mixdown
                </li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-text-dim mt-auto pt-4 border-t border-border">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" /> 6 weeks
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" /> 85+ students
                </span>
              </div>
            </div>
          </motion.div>
        }

        {/* Reason Courses */}
        {activeCategory === 'reason' &&
        <motion.div
          key="reason"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
            <div className="bg-surface border border-border rounded-xl p-6 group hover:border-purple/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full">
                  Beginner
                </span>
                <PlayIcon className="w-5 h-5 text-text-dim group-hover:text-purple transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Reason Beginner
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />{' '}
                  Rack interface
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />{' '}
                  Devices and instruments
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />{' '}
                  MIDI sequencing
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />{' '}
                  Creating beats
                </li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-text-dim mt-auto pt-4 border-t border-border">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" /> 4 weeks
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" /> 120+ students
                </span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 group hover:border-purple/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full">
                  Intermediate
                </span>
                <PlayIcon className="w-5 h-5 text-text-dim group-hover:text-purple transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Reason Sound Design
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  Synth basics
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  Creating custom sounds
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  Drum machines
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />{' '}
                  Effects routing
                </li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-text-dim mt-auto pt-4 border-t border-border">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" /> 6 weeks
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" /> 90+ students
                </span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 group hover:border-purple/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-orange/10 text-orange text-xs font-medium rounded-full">
                  Advanced
                </span>
                <PlayIcon className="w-5 h-5 text-text-dim group-hover:text-purple transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Reason Advanced Production
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Rack extensions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Complex routing
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />{' '}
                  Professional workflow
                </li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-text-dim mt-auto pt-4 border-t border-border">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" /> 5 weeks
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" /> 60+ students
                </span>
              </div>
            </div>
          </motion.div>
        }

        {/* Business Courses */}
        {activeCategory === 'business' &&
        <motion.div
          key="business"
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
          className="max-w-4xl mx-auto">
          
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="p-8 border-b border-border bg-gradient-to-br from-surface-2 to-surface">
                <h3 className="font-heading text-3xl font-bold text-white mb-2">
                  Music Business Made Simple
                </h3>
                <p className="text-text-muted text-lg">
                  Easy English for artists in South Africa. Learn how to protect
                  your music, release it, and make money.
                </p>
              </div>

              <div className="divide-y divide-border">
                <div className="p-6 sm:p-8 hover:bg-surface-2/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-heading font-bold text-gold">
                        1
                      </span>
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-semibold text-white mb-2">
                        Artist Basics
                      </h4>
                      <ul className="space-y-2 text-text-muted">
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" />{' '}
                          What is a music career
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" /> How
                          artists make money
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 hover:bg-surface-2/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-heading font-bold text-orange">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-semibold text-white mb-2">
                        Copyright Basics
                      </h4>
                      <ul className="space-y-2 text-text-muted">
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" />{' '}
                          Song ownership
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" />{' '}
                          Producer rights
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" />{' '}
                          Beat licenses
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 hover:bg-surface-2/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-magenta/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-heading font-bold text-magenta">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-semibold text-white mb-2">
                        Releasing Music
                      </h4>
                      <ul className="space-y-2 text-text-muted">
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" />{' '}
                          Platforms like Spotify, Apple Music, YouTube Music
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" /> How
                          distribution works
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 hover:bg-surface-2/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-heading font-bold text-purple">
                        4
                      </span>
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-semibold text-white mb-2">
                        Royalties Explained
                      </h4>
                      <ul className="space-y-2 text-text-muted">
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" />{' '}
                          Streaming royalties
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" />{' '}
                          Performance royalties
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" />{' '}
                          Producer royalties
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 hover:bg-surface-2/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-heading font-bold text-gold">
                        5
                      </span>
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-semibold text-white mb-2">
                        Branding for Artists
                      </h4>
                      <ul className="space-y-2 text-text-muted">
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" />{' '}
                          Artist name & Artwork
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" />{' '}
                          Social media promotion
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-text-dim" />{' '}
                          Using platforms like Instagram, TikTok, YouTube
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        }

        {/* CTA */}
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
            delay: 0.5,
            duration: 0.5
          }}
          className="text-center mt-12">
          
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 text-orange font-medium hover:text-gold transition-colors">
            
            View subscription plans to access all courses
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>);

}