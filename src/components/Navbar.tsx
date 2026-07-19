import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
const NAV_LINKS = [
{
  label: 'Home',
  href: '#home'
},
{
  label: 'Courses',
  href: '#courses'
},
{
  label: 'Plans',
  href: '#pricing'
},
{
  label: 'Studio',
  href: '#studio'
},
{
  label: 'Beats',
  href: '#beats'
},
{
  label: 'Design',
  href: '#design'
},
{
  label: 'Label',
  href: '#label'
}];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img
              src="/Lukulu_Logo.png"
              alt="Lukulu Academy & Recordings"
              className="h-10 md:h-12 w-auto" />
            
            <div className="hidden sm:block">
              <span className="font-heading text-lg font-bold tracking-wide text-white">
                LUKULU
              </span>
              <span className="block text-[10px] tracking-[0.2em] text-orange uppercase -mt-1">
                Academy & Recordings
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-text-muted hover:text-orange transition-colors duration-200">
              
                {link.label}
              </a>
            )}
            <a
              href="#label"
              className="ml-4 px-5 py-2.5 bg-gradient-warm text-bg font-heading font-semibold text-sm tracking-wide rounded hover:opacity-90 transition-opacity duration-200 shadow-[0_0_15px_rgba(225,112,85,0.3)]">
              
              SUBMIT DEMO
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-orange transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}>
            
            {isOpen ?
            <XIcon className="w-6 h-6" /> :

            <MenuIcon className="w-6 h-6" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          transition={{
            duration: 0.3
          }}
          className="lg:hidden bg-surface border-b border-border overflow-hidden">
          
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) =>
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-text-muted hover:text-orange hover:bg-surface-2 rounded-lg transition-colors duration-200">
              
                  {link.label}
                </a>
            )}
              <a
              href="#label"
              onClick={() => setIsOpen(false)}
              className="block mt-3 px-4 py-3 bg-gradient-warm text-bg font-heading font-semibold text-center tracking-wide rounded-lg shadow-[0_0_15px_rgba(225,112,85,0.3)]">
              
                SUBMIT DEMO
              </a>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

}