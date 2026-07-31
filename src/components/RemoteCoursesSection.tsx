import {
  ArrowRightIcon,
  BriefcaseBusinessIcon,
  CheckIcon,
  Clock3Icon,
  HeadphonesIcon,
  Mic2Icon,
  Music2Icon,
  RadioIcon,
  SlidersHorizontalIcon,
  UsersIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';
import { SectionIntro } from './SectionIntro';

const remoteCourses = [
  {
    code: 'RC-01',
    title: 'FL Studio Foundations',
    level: 'Beginner',
    duration: '4 weeks',
    delivery: 'Recorded lessons + guided tasks',
    access: 'Basic, Pro & VIP',
    icon: Music2Icon,
    description: 'Learn the FL Studio workflow and complete a clean, organised beat from idea to export.',
    modules: [
      'Workspace setup and project organisation',
      'Drum programming and piano roll basics',
      'Melody, bass and arrangement',
      'Exporting stems and a final beat',
    ],
    outcome: 'Finish and export one complete beat project.',
  },
  {
    code: 'RC-02',
    title: 'Beat Production Lab',
    level: 'Intermediate',
    duration: '6 weeks',
    delivery: 'Recorded lessons + live workshop',
    access: 'Pro & VIP',
    icon: HeadphonesIcon,
    description: 'Turn short loops into release-ready arrangements while developing a faster production workflow.',
    modules: [
      'Reference-track analysis and creative direction',
      'Advanced drum programming and sampling',
      'Transitions, automation and arrangement',
      'Producer feedback and revision workflow',
    ],
    outcome: 'Build a three-beat portfolio with structured feedback.',
  },
  {
    code: 'RC-03',
    title: 'Home Vocal Recording',
    level: 'Beginner–Intermediate',
    duration: '4 weeks',
    delivery: 'Live demonstrations + practice files',
    access: 'Pro & VIP',
    icon: Mic2Icon,
    description: 'Capture clearer vocals at home using practical room, microphone and session techniques.',
    modules: [
      'Affordable home-recording setup',
      'Gain staging and microphone technique',
      'Comping, timing and pitch-cleanup workflow',
      'Preparing organised vocal stems for mixing',
    ],
    outcome: 'Record and deliver a clean lead-vocal session.',
  },
  {
    code: 'RC-04',
    title: 'Mixing & Mastering Clinic',
    level: 'Advanced',
    duration: '6 weeks',
    delivery: 'Weekly online clinic + mix reviews',
    access: 'Pro & VIP',
    icon: SlidersHorizontalIcon,
    description: 'Make stronger mix decisions through repeatable balance, processing and final-delivery systems.',
    modules: [
      'Session preparation, gain staging and balance',
      'EQ, compression and depth',
      'Vocal placement and mix translation',
      'Loudness, limiting and streaming exports',
    ],
    outcome: 'Complete one reviewed mix and final master.',
  },
  {
    code: 'RC-05',
    title: 'Music Business & Release Plan',
    level: 'All levels',
    duration: '4 weeks',
    delivery: 'Online class + release-plan workbook',
    access: 'Pro & VIP',
    icon: BriefcaseBusinessIcon,
    description: 'Understand ownership, distribution, royalties and the steps needed for an organised release.',
    modules: [
      'Copyright, splits and producer agreements',
      'Distribution and release preparation',
      'Royalties, registrations and metadata',
      'Branding, launch content and release timeline',
    ],
    outcome: 'Leave with a practical 30-day release plan.',
  },
  {
    code: 'RC-06',
    title: 'Artist Mentorship Sprint',
    level: 'Personalised',
    duration: '4 weeks',
    delivery: 'Private video sessions',
    access: 'VIP',
    icon: UsersIcon,
    description: 'Get focused guidance on your music, creative direction and next release from a dedicated mentor.',
    modules: [
      'Portfolio and goals review',
      'Personal learning and production roadmap',
      'Track feedback and revision priorities',
      'Release-readiness and next-step session',
    ],
    outcome: 'Receive a personalised action plan and priority checklist.',
  },
] as const;

const remoteFeatures = [
  'Learn from home',
  'Project-based lessons',
  'Feedback matched to your plan',
] as const;

export function RemoteCoursesSection() {
  return (
    <section
      id="remote-courses"
      className="remote-courses signal-section section-pad section-paper"
      aria-labelledby="remote-courses-heading"
    >
      <div className="page-shell">
        <SectionIntro
          headingId="remote-courses-heading"
          number="03"
          eyebrow="Remote learning"
          title="Learn from anywhere"
          description="Structured online courses for producers, vocalists and independent artists. Study the core lessons on your schedule, then use live support and feedback where your membership includes it."
        />

        <Reveal className="remote-course-signal">
          <div>
            <RadioIcon aria-hidden="true" />
            <span>
              <small>REMOTE CLASSROOM</small>
              <strong>Practical learning, delivered online</strong>
            </span>
          </div>
          <ul>
            {remoteFeatures.map((feature) => (
              <li key={feature}><CheckIcon aria-hidden="true" /> {feature}</li>
            ))}
          </ul>
        </Reveal>

        <div className="remote-course-grid">
          {remoteCourses.map((course, index) => {
            const Icon = course.icon;
            return (
              <Reveal key={course.code} delay={index * 0.045}>
                <article className="remote-course-card">
                  <div className="remote-course-card__topline">
                    <span>{course.code}</span>
                    <span>{course.access}</span>
                  </div>

                  <div className="remote-course-card__title">
                    <span className="remote-course-card__icon"><Icon aria-hidden="true" /></span>
                    <div>
                      <p>{course.level}</p>
                      <h3>{course.title}</h3>
                    </div>
                  </div>

                  <p className="remote-course-card__description">{course.description}</p>

                  <dl className="remote-course-card__facts">
                    <div>
                      <dt><Clock3Icon aria-hidden="true" /> Duration</dt>
                      <dd>{course.duration}</dd>
                    </div>
                    <div>
                      <dt><RadioIcon aria-hidden="true" /> Delivery</dt>
                      <dd>{course.delivery}</dd>
                    </div>
                  </dl>

                  <details className="remote-course-card__modules">
                    <summary>View course outline <span aria-hidden="true">+</span></summary>
                    <ol>
                      {course.modules.map((module) => <li key={module}>{module}</li>)}
                    </ol>
                    <p><strong>Course outcome:</strong> {course.outcome}</p>
                  </details>

                  <Link
                    className="button button-quiet button-full"
                    to={`/enquire?category=academy&service=remote-course&course=${encodeURIComponent(course.title)}`}
                    aria-label={`Ask about the ${course.title} remote course`}
                  >
                    Ask about this course <ArrowRightIcon aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="remote-course-footer">
          <p>Course dates and live-session times are confirmed during enrolment.</p>
          <a href="#pricing" className="section-link">
            Compare membership access <ArrowRightIcon aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
