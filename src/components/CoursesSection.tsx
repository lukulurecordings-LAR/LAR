import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  BriefcaseBusinessIcon,
  CheckIcon,
  ChevronDownIcon,
  Clock3Icon,
  HeadphonesIcon,
  Music2Icon,
  SlidersHorizontalIcon,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionIntro } from './SectionIntro';

type Category = 'flstudio' | 'cubase' | 'reason' | 'dj' | 'business';

type Course = {
  title: string;
  level: string;
  duration?: string;
  topics: string[];
};

const categories: Array<{
  id: Category;
  label: string;
  note: string;
  icon: typeof Music2Icon;
}> = [
  { id: 'flstudio', label: 'FL Studio', note: 'From first beat to release-ready master', icon: Music2Icon },
  { id: 'cubase', label: 'Cubase', note: 'Recording, editing, arrangement and mixing', icon: HeadphonesIcon },
  { id: 'reason', label: 'Reason', note: 'Rack production, synthesis and creative routing', icon: SlidersHorizontalIcon },
  { id: 'dj', label: 'DJ & Performance', note: 'Club-ready mixing, set building and live delivery', icon: HeadphonesIcon },
  { id: 'business', label: 'Music Business', note: 'Rights, royalties, branding and release strategy', icon: BriefcaseBusinessIcon },
];

const courses: Record<Category, Course[]> = {
  flstudio: [
    {
      title: 'FL Studio Foundations',
      level: 'Beginner',
      duration: '4 weeks',
      topics: [
        'Installing and configuring FL Studio',
        'Browser, channel rack, playlist and mixer workflow',
        'Piano roll, scales, chords and basic MIDI editing',
        'Drum programming for Afro House, Amapiano and Hip-Hop',
        'Building and arranging a complete first beat',
        'Exporting stems, instrumentals and MP3/WAV files',
      ],
    },
    {
      title: 'Afro House & Amapiano Production',
      level: 'Intermediate',
      duration: '6 weeks',
      topics: [
        'Genre analysis, tempo, groove and rhythmic identity',
        'Log drums, percussion layers and South African drum programming',
        'Basslines, chord progressions, leads and atmospheric textures',
        'Sampling, audio warping and vocal chop techniques',
        'Transitions, tension, breakdowns and drop arrangement',
        'Completing an original release-ready production',
      ],
    },
    {
      title: 'Vocal Recording & Production in FL Studio',
      level: 'Intermediate',
      duration: '5 weeks',
      topics: [
        'Home-studio setup, microphones, gain staging and room control',
        'Recording lead vocals, harmonies, ad-libs and doubles',
        'Comping, timing correction and clean vocal editing',
        'Pitch correction used naturally and musically',
        'Vocal EQ, compression, de-essing, reverb and delay',
        'Preparing vocal stems for collaboration and mixing',
      ],
    },
    {
      title: 'Professional Mixing in FL Studio',
      level: 'Advanced',
      duration: '6 weeks',
      topics: [
        'Session organisation, gain staging and mix preparation',
        'Corrective and creative EQ',
        'Compression, sidechain control and transient shaping',
        'Depth, width, panning, reverb and delay',
        'Automation, mix translation and reference-track analysis',
        'Delivering a balanced stereo mix and clean stems',
      ],
    },
    {
      title: 'Mastering & Digital Delivery',
      level: 'Advanced',
      duration: '4 weeks',
      topics: [
        'Mastering workflow and critical listening',
        'Tonal balance, dynamics and stereo control',
        'Clipping, limiting, loudness and headroom',
        'Preparing streaming, radio, club and DJ versions',
        'Metadata, file naming, quality control and delivery',
        'Mastering a final portfolio single',
      ],
    },
  ],
  cubase: [
    {
      title: 'Cubase Essentials',
      level: 'Beginner',
      duration: '4 weeks',
      topics: [
        'Audio interface, driver and project setup',
        'Project window, tracks, routing and transport controls',
        'Recording and editing audio safely',
        'MIDI recording, quantising and virtual instruments',
        'Basic arrangement and automation',
        'Exporting a complete first production',
      ],
    },
    {
      title: 'Vocal & Instrument Recording',
      level: 'Intermediate',
      duration: '5 weeks',
      topics: [
        'Microphone selection and placement',
        'Gain staging and recording-session preparation',
        'Cycle recording, comping and take management',
        'Timing, tuning and detailed audio editing',
        'Recording guitars, keyboards and live percussion',
        'Building a professional session template',
      ],
    },
    {
      title: 'Cubase Production & Arrangement',
      level: 'Intermediate',
      duration: '6 weeks',
      topics: [
        'Chord tracks, scale tools and harmonic workflow',
        'Drum programming, groove design and MIDI expression',
        'Audio manipulation, sampling and creative processing',
        'Song structure for club and streaming formats',
        'Automation, transitions and energy control',
        'Producing and arranging a complete original song',
      ],
    },
    {
      title: 'Cubase Mixing & Final Mixdown',
      level: 'Advanced',
      duration: '6 weeks',
      topics: [
        'MixConsole workflow and channel-strip processing',
        'Groups, FX channels, sends and parallel processing',
        'EQ, compression and frequency management',
        'Vocal placement, depth and stereo imaging',
        'Mix revisions, referencing and translation testing',
        'Stems, alternate versions and final mix delivery',
      ],
    },
  ],
  reason: [
    {
      title: 'Reason Rack Foundations',
      level: 'Beginner',
      duration: '4 weeks',
      topics: [
        'Rack, sequencer, browser and mixer navigation',
        'Loading instruments, players and effects',
        'MIDI recording and pattern creation',
        'Redrum and Kong drum programming',
        'Basic cabling, routing and automation',
        'Completing a first rack-based beat',
      ],
    },
    {
      title: 'Reason Sound Design',
      level: 'Intermediate',
      duration: '5 weeks',
      topics: [
        'Oscillators, filters, envelopes and LFOs',
        'Designing basses, pads, leads and plucks',
        'Layering instruments for a distinctive sound',
        'Drum synthesis and custom percussion',
        'Sampling and resampling workflows',
        'Building a reusable personal patch library',
      ],
    },
    {
      title: 'Creative Rack Routing & Effects',
      level: 'Advanced',
      duration: '5 weeks',
      topics: [
        'Advanced signal flow and rear-panel cabling',
        'Combinator design and macro control',
        'Parallel, serial and multiband processing',
        'Sidechain, modulation and rhythmic effects',
        'CV routing and generative movement',
        'Creating a custom performance rack',
      ],
    },
    {
      title: 'Reason Production Masterclass',
      level: 'Advanced',
      duration: '6 weeks',
      topics: [
        'Professional production templates and workflow',
        'Genre-focused groove, harmony and arrangement',
        'Audio recording and vocal integration',
        'Mixing inside the Reason console',
        'Using Reason as a plugin in another DAW',
        'Completing a polished portfolio release',
      ],
    },
  ],
  dj: [
    {
      title: 'DJ Foundations',
      level: 'Beginner',
      duration: '4 weeks',
      topics: [
        'DJ equipment, software and signal flow',
        'Cueing, phrasing, tempo and beatmatching',
        'EQ control, channel gain and clean transitions',
        'Music library organisation and preparation',
        'Basic set structure and track selection',
        'Recording and reviewing a 20-minute mix',
      ],
    },
    {
      title: 'Club Mixing & Set Building',
      level: 'Intermediate',
      duration: '5 weeks',
      topics: [
        'Long blends, quick cuts and transition selection',
        'Harmonic mixing and key-aware programming',
        'Reading a crowd and controlling set energy',
        'Using loops, hot cues and performance pads',
        'Preparing opening, supporting and headline sets',
        'Recording a professional 45-minute promotional mix',
      ],
    },
    {
      title: 'Advanced DJ Performance',
      level: 'Advanced',
      duration: '5 weeks',
      topics: [
        'Creative layering, acapellas and live remixing',
        'Three- and four-deck performance concepts',
        'Effects used with timing and restraint',
        'Recovery from technical and performance mistakes',
        'Booth etiquette, handovers and professional conduct',
        'Designing a signature performance set',
      ],
    },
    {
      title: 'DJ Career & Booking Toolkit',
      level: 'All levels',
      duration: '4 weeks',
      topics: [
        'DJ biography, press photographs and electronic press kit',
        'Rate cards, quotes, deposits and booking agreements',
        'Promotional mixes, radio submissions and content planning',
        'Working with promoters, venues and booking agents',
        'Technical riders, hospitality riders and event preparation',
        'Building a practical 90-day booking campaign',
      ],
    },
  ],
  business: [
    {
      title: 'South African Music Industry Foundations',
      level: 'Beginner',
      duration: '4 weeks',
      topics: [
        'How artists, producers, labels, publishers and distributors work together',
        'Master rights, composition rights and neighbouring rights',
        'Revenue streams for artists, writers, producers and labels',
        'Core industry documents and professional terminology',
        'Building a sustainable independent music career',
        'Creating a personal music-business action plan',
      ],
    },
    {
      title: 'Copyright, Splits & Music Contracts',
      level: 'Intermediate',
      duration: '4 weeks',
      topics: [
        'Copyright ownership and the difference between songs and recordings',
        'Songwriter, producer, featured-artist and session-musician contributions',
        'Split sheets, producer agreements and beat licences',
        'Key clauses in recording, publishing and management agreements',
        'Negotiation preparation and contract red flags',
        'Completing a rights-and-splits pack for an original song',
      ],
    },
    {
      title: 'Royalties, CMOs & Rights Registration',
      level: 'Intermediate',
      duration: '5 weeks',
      topics: [
        'Performance, mechanical, neighbouring-rights and digital royalties',
        'The roles of SAMRO, CAPASSO, SAMPRA and RISA',
        'Writer, publisher, performer and rights-owner registrations',
        'ISRC, UPC, IPI, ISWC and essential music identifiers',
        'Royalty statements, matching problems and catalogue audits',
        'Preparing a complete song-registration checklist',
      ],
    },
    {
      title: 'Distribution, Metadata & Release Setup',
      level: 'Intermediate',
      duration: '4 weeks',
      topics: [
        'Choosing a distributor and understanding delivery requirements',
        'Artist names, titles, versions, credits and contributor metadata',
        'Artwork, audio, release dates and platform lead times',
        'Spotify for Artists, Apple Music for Artists and YouTube channels',
        'Pre-save links, smart links and release quality control',
        'Building a release-ready metadata and asset folder',
      ],
    },
    {
      title: 'Artist Branding, Marketing & EPK',
      level: 'Intermediate',
      duration: '5 weeks',
      topics: [
        'Positioning, audience definition and artist story',
        'Visual identity, artwork direction and brand consistency',
        'Biography, press release, one-sheet and electronic press kit',
        'Content pillars and practical social-media planning',
        'Playlist, radio, blog and DJ outreach',
        'Creating a complete campaign-ready artist press kit',
      ],
    },
    {
      title: 'Independent Release Campaign Lab',
      level: 'Advanced',
      duration: '6 weeks',
      topics: [
        'Setting campaign goals, budgets and release timelines',
        'Coordinating audio, artwork, metadata, distribution and rights',
        'Building pre-release, release-week and post-release campaigns',
        'Audience growth, advertising basics and fan conversion',
        'Measuring results using platform analytics',
        'Launching and reviewing a real single or EP campaign',
      ],
    },
  ],
};

export function CoursesSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('flstudio');
  const [showScrollCue, setShowScrollCue] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabListRef = useRef<HTMLDivElement>(null);
  const activeIndex = categories.findIndex((category) => category.id === activeCategory);
  const activeMeta = categories[activeIndex];
  const ActiveIcon = activeMeta.icon;

  const updateScrollCue = useCallback(() => {
    const tabList = tabListRef.current;
    if (!tabList) return;
    setShowScrollCue(tabList.scrollLeft + tabList.clientWidth < tabList.scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateScrollCue();
    window.addEventListener('resize', updateScrollCue);
    return () => window.removeEventListener('resize', updateScrollCue);
  }, [updateScrollCue]);

  const selectTab = (category: Category, index: number) => {
    setActiveCategory(category);
    window.requestAnimationFrame(() => {
      tabRefs.current[index]?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
      updateScrollCue();
    });
  };

  const moveTabFocus = (event: KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % categories.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + categories.length) % categories.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = categories.length - 1;
    else return;
    event.preventDefault();
    selectTab(categories[nextIndex].id, nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="courses" className="signal-section section-pad" aria-labelledby="courses-heading">
      <div className="page-shell">
        <SectionIntro
          headingId="courses-heading"
          number="02"
          eyebrow="Curriculum"
          title="Build real music-industry skills"
          description="Choose a focused learning track, complete practical projects and develop work you can use in your portfolio, releases, DJ career or music business."
        />

        <Reveal>
          <div className={`course-tabs-shell ${showScrollCue ? 'has-more' : ''}`}>
            <div
              ref={tabListRef}
              className="course-tabs"
              role="tablist"
              aria-label="Course categories"
              onScroll={updateScrollCue}
            >
              {categories.map((category, index) => {
                const Icon = category.icon;
                const selected = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    ref={(element) => { tabRefs.current[index] = element; }}
                    type="button"
                    id={`tab-${category.id}`}
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`panel-${category.id}`}
                    tabIndex={selected ? 0 : -1}
                    className={selected ? 'is-active' : undefined}
                    onClick={() => selectTab(category.id, index)}
                    onKeyDown={(event) => moveTabFocus(event, index)}
                  >
                    <Icon aria-hidden="true" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
            <span className="course-tabs-cue" aria-hidden="true">Swipe →</span>
          </div>
        </Reveal>

        <motion.div
          key={activeCategory}
          id={`panel-${activeCategory}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory}`}
          className="curriculum-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <aside className="curriculum-summary">
            <span className="curriculum-icon"><ActiveIcon aria-hidden="true" /></span>
            <p className="console-label">ACTIVE TRACK</p>
            <h3>{activeMeta.label}</h3>
            <p>{activeMeta.note}</p>
            <div>
              <strong>{courses[activeCategory].length}</strong>
              <span>{courses[activeCategory].length === 1 ? 'learning programme' : 'course levels'}</span>
            </div>
          </aside>

          <div className="course-list">
            {courses[activeCategory].map((course, index) => (
              <details key={course.title} className="course-row" open={index === 0}>
                <summary>
                  <span className="course-row__number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="course-row__title">
                    <strong>{course.title}</strong>
                    <small>{course.level}</small>
                  </span>
                  {course.duration && (
                    <span className="course-row__duration"><Clock3Icon aria-hidden="true" /> {course.duration}</span>
                  )}
                  <ChevronDownIcon className="course-row__chevron" aria-hidden="true" />
                </summary>
                <ul>
                  {course.topics.map((topic) => (
                    <li key={topic}><CheckIcon aria-hidden="true" /> {topic}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </motion.div>

        <a href="#pricing" className="section-link">
          Compare membership plans <ArrowRightIcon aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
