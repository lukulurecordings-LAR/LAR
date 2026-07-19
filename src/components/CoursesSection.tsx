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

type Category = 'flstudio' | 'cubase' | 'reason' | 'business';

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
  { id: 'flstudio', label: 'FL Studio', note: 'Beat-making to final master', icon: Music2Icon },
  { id: 'cubase', label: 'Cubase', note: 'Recording and mix workflow', icon: HeadphonesIcon },
  { id: 'reason', label: 'Reason', note: 'Rack, sound design and routing', icon: SlidersHorizontalIcon },
  { id: 'business', label: 'Music Business', note: 'Rights, releases and royalties', icon: BriefcaseBusinessIcon },
];

const courses: Record<Category, Course[]> = {
  flstudio: [
    {
      title: 'FL Studio Beginner',
      level: 'Beginner',
      duration: '4 weeks',
      topics: ['Installing FL Studio', 'Understanding the interface', 'Channel rack basics', 'Piano roll basics', 'Creating your first beat'],
    },
    {
      title: 'FL Studio Beat Production',
      level: 'Intermediate',
      duration: '6 weeks',
      topics: ['Drum programming', 'Sampling', 'Melody creation', 'Arrangement', 'Exporting beats'],
    },
    {
      title: 'FL Studio Mixing',
      level: 'Advanced',
      duration: '6 weeks',
      topics: ['Mixer basics', 'EQ', 'Compression', 'Reverb and delay', 'Mixing vocals'],
    },
    {
      title: 'FL Studio Mastering',
      level: 'Expert',
      duration: '4 weeks',
      topics: ['Loudness', 'Final EQ', 'Limiting', 'Exporting for streaming platforms'],
    },
  ],
  cubase: [
    {
      title: 'Cubase Beginner',
      level: 'Beginner',
      duration: '5 weeks',
      topics: ['Setting up Cubase', 'Creating a project', 'Recording audio', 'MIDI basics', 'Editing audio'],
    },
    {
      title: 'Cubase Music Production',
      level: 'Intermediate',
      duration: '6 weeks',
      topics: ['Arrangement', 'MIDI programming', 'Instrument plugins', 'Automation'],
    },
    {
      title: 'Cubase Mixing',
      level: 'Advanced',
      duration: '6 weeks',
      topics: ['Channel strip', 'Effects', 'Mixing workflow', 'Final mixdown'],
    },
  ],
  reason: [
    {
      title: 'Reason Beginner',
      level: 'Beginner',
      duration: '4 weeks',
      topics: ['Rack interface', 'Devices and instruments', 'MIDI sequencing', 'Creating beats'],
    },
    {
      title: 'Reason Sound Design',
      level: 'Intermediate',
      duration: '6 weeks',
      topics: ['Synth basics', 'Creating custom sounds', 'Drum machines', 'Effects routing'],
    },
    {
      title: 'Reason Advanced Production',
      level: 'Advanced',
      duration: '5 weeks',
      topics: ['Rack extensions', 'Complex routing', 'Professional workflow'],
    },
  ],
  business: [
    {
      title: 'Music Business Made Simple',
      level: 'All levels',
      topics: [
        'Artist basics: music careers and how artists make money',
        'Copyright basics: song ownership, producer rights and beat licences',
        'Releasing music: distribution to Spotify, Apple Music and YouTube Music',
        'Royalties: streaming, performance and producer royalties',
        'Artist branding: names, artwork and social media promotion',
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
          title="Master your craft"
          description="From beginner to professional. Choose a software path, see exactly what you will learn, and build skills you can use on a real track."
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
