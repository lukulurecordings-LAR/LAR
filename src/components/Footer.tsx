import React from 'react';
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon } from
'lucide-react';
export function Footer() {
  return (
    <footer className="bg-bg border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-tribal-pattern opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/Lukulu_Logo.png"
                alt="Lukulu Academy & Recordings"
                className="h-10 w-auto" />
              
              <div>
                <span className="font-heading text-lg font-bold tracking-wide text-white">
                  LUKULU
                </span>
                <span className="block text-[10px] tracking-[0.2em] text-orange uppercase -mt-1">
                  Academy & Recordings
                </span>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Learn Music. Create Music. Release Music. Your music career starts
              here in South Africa.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-surface-2 border border-border rounded-lg flex items-center justify-center text-text-dim hover:text-orange hover:border-orange transition-colors"
                aria-label="Instagram">
                
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-surface-2 border border-border rounded-lg flex items-center justify-center text-text-dim hover:text-magenta hover:border-magenta transition-colors"
                aria-label="YouTube">
                
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-surface-2 border border-border rounded-lg flex items-center justify-center text-text-dim hover:text-purple hover:border-purple transition-colors"
                aria-label="Facebook">
                
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Academy */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-4 tracking-wide">
              ACADEMY
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#courses"
                  className="text-text-muted text-sm hover:text-orange transition-colors">
                  
                  FL Studio Courses
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  className="text-text-muted text-sm hover:text-orange transition-colors">
                  
                  Music Production
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  className="text-text-muted text-sm hover:text-orange transition-colors">
                  
                  Music Business
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-text-muted text-sm hover:text-orange transition-colors">
                  
                  Subscription Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-4 tracking-wide">
              SERVICES
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#studio"
                  className="text-text-muted text-sm hover:text-magenta transition-colors">
                  
                  Studio Booking
                </a>
              </li>
              <li>
                <a
                  href="#beats"
                  className="text-text-muted text-sm hover:text-magenta transition-colors">
                  
                  Beat Store
                </a>
              </li>
              <li>
                <a
                  href="#design"
                  className="text-text-muted text-sm hover:text-magenta transition-colors">
                  
                  Graphic Design
                </a>
              </li>
              <li>
                <a
                  href="#label"
                  className="text-text-muted text-sm hover:text-magenta transition-colors">
                  
                  Demo Submission
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-4 tracking-wide">
              CONTACT
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-text-muted text-sm">
                lukulurecordings@gmail.com
              </li>
              <li className="flex items-center gap-2.5 text-text-muted text-sm">
                <PhoneIcon className="w-4 h-4 text-orange flex-shrink-0" />
                +27 73 093 3554
              </li>
              <li className="flex items-start gap-2.5 text-text-muted text-sm">
                <MapPinIcon className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                South Africa
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-dim text-xs">
            © 2026 Lukulu Academy & Recordings. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-text-dim text-xs hover:text-orange transition-colors">
              
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-text-dim text-xs hover:text-orange transition-colors">
              
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>);

}