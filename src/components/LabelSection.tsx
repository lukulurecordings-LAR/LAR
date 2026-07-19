import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DiscIcon, SendIcon, CheckCircleIcon, MusicIcon } from 'lucide-react';
export function LabelSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <section id="label" className="py-24 bg-surface relative">
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
          
          <p className="text-orange font-medium text-sm tracking-[0.2em] uppercase mb-3">
            Record Label
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            LUKULU RECORDINGS
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            From the classroom to the charts. Submit your demo and get the
            chance to release your music through Lukulu Recordings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Latest Releases */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30
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
              delay: 0.2,
              duration: 0.5
            }}>
            
            <h3 className="font-heading text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <DiscIcon className="w-6 h-6 text-orange" />
              Latest Releases
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-surface-2 border border-border rounded-xl p-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange/30 to-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MusicIcon className="w-8 h-8 text-orange" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-base font-semibold text-white truncate">
                    Siyabonga
                  </h4>
                  <p className="text-text-dim text-sm">
                    Da Cord & Dj Nastor • Afro house • 2025
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full">
                  New
                </span>
              </div>

              <div className="flex items-center gap-4 bg-surface-2 border border-border rounded-xl p-4">
                <div className="w-16 h-16 bg-gradient-to-br from-magenta/30 to-magenta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MusicIcon className="w-8 h-8 text-magenta" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-base font-semibold text-white truncate">
                    Zulu
                  </h4>
                  <p className="text-text-dim text-sm">
                    Dj Crash • Afro house • 2025
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-surface-2 border border-border rounded-xl p-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple/30 to-purple/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MusicIcon className="w-8 h-8 text-purple" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-base font-semibold text-white truncate">
                    Indlela
                  </h4>
                  <p className="text-text-dim text-sm">
                    Zamachunu Mchunu • Afro House • 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Deal Terms */}
            <div className="mt-8 bg-surface-2 border border-border rounded-xl p-6">
              <h4 className="font-heading text-lg font-semibold text-white mb-4">
                Label Deal Terms
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-bg rounded-lg">
                  <p className="font-heading text-3xl font-bold text-orange">
                    70%
                  </p>
                  <p className="text-text-dim text-xs mt-1 uppercase tracking-wide">
                    Artist Revenue
                  </p>
                </div>
                <div className="text-center p-4 bg-bg rounded-lg">
                  <p className="font-heading text-3xl font-bold text-text-muted">
                    30%
                  </p>
                  <p className="text-text-dim text-xs mt-1 uppercase tracking-wide">
                    Label Revenue
                  </p>
                </div>
              </div>
              <p className="text-text-dim text-sm mt-4 text-center">
                Fair deal. You keep the majority. We handle distribution,
                marketing, and promotion.
              </p>
            </div>
          </motion.div>

          {/* Demo Submission Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30
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
              duration: 0.5
            }}>
            
            <h3 className="font-heading text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <SendIcon className="w-6 h-6 text-magenta" />
              Submit Your Demo
            </h3>

            {submitted ?
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              className="bg-surface-2 border border-green-500/30 rounded-xl p-12 text-center">
              
                <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="font-heading text-2xl font-bold text-white mb-2">
                  Demo Submitted!
                </h4>
                <p className="text-text-muted">
                  Thank you for your submission. Our team will listen to your
                  track and get back to you within 7 days.
                </p>
              </motion.div> :

            <form
              onSubmit={handleSubmit}
              className="bg-surface-2 border border-border rounded-xl p-8 space-y-4">
              
                <div>
                  <label
                  htmlFor="demo-artist"
                  className="block text-sm font-medium text-text-muted mb-1.5">
                  
                    Artist Name
                  </label>
                  <input
                  id="demo-artist"
                  type="text"
                  placeholder="Your artist name"
                  required
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-white placeholder-text-dim focus:border-orange focus:outline-none transition-colors" />
                
                </div>
                <div>
                  <label
                  htmlFor="demo-email"
                  className="block text-sm font-medium text-text-muted mb-1.5">
                  
                    Email
                  </label>
                  <input
                  id="demo-email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-white placeholder-text-dim focus:border-orange focus:outline-none transition-colors" />
                
                </div>
                <div>
                  <label
                  htmlFor="demo-link"
                  className="block text-sm font-medium text-text-muted mb-1.5">
                  
                    Song Link
                  </label>
                  <input
                  id="demo-link"
                  type="url"
                  placeholder="SoundCloud, Google Drive, or Dropbox link"
                  required
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-white placeholder-text-dim focus:border-orange focus:outline-none transition-colors" />
                
                </div>
                <div>
                  <label
                  htmlFor="demo-genre"
                  className="block text-sm font-medium text-text-muted mb-1.5">
                  
                    Genre
                  </label>
                  <select
                  id="demo-genre"
                  required
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-white focus:border-orange focus:outline-none transition-colors">
                  
                    <option value="">Select genre</option>
                    <option value="amapiano">Amapiano</option>
                    <option value="hiphop">Hip Hop</option>
                    <option value="afrohouse">Afro House</option>
                    <option value="trap">Trap</option>
                    <option value="gqom">Gqom</option>
                    <option value="rnb">R&B</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                  htmlFor="demo-message"
                  className="block text-sm font-medium text-text-muted mb-1.5">
                  
                    Message (optional)
                  </label>
                  <textarea
                  id="demo-message"
                  rows={3}
                  placeholder="Tell us about your track..."
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-white placeholder-text-dim focus:border-orange focus:outline-none transition-colors resize-none" />
                
                </div>
                <button
                type="submit"
                className="w-full py-3.5 bg-gradient-warm text-bg font-heading font-bold tracking-wide rounded-lg hover:opacity-90 transition-opacity mt-2">
                
                  SUBMIT DEMO
                </button>
              </form>
            }
          </motion.div>
        </div>
      </div>
    </section>);

}