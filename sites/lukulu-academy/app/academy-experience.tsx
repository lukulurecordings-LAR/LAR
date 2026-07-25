"use client";

import { useMemo, useState, type FormEvent } from "react";

type TrackId = "all" | "fl-studio" | "cubase" | "reason" | "music-business";

type Course = {
  code: string;
  track: Exclude<TrackId, "all">;
  trackLabel: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All levels";
  duration: string;
  summary: string;
  skills: string[];
};

type ServiceId = "academy" | "studio" | "beats" | "creative" | "label";

type ServiceRoute = {
  id: ServiceId;
  code: string;
  label: string;
  symbol: string;
  note: string;
  offerings: Array<{ name: string; price: string; detail: string }>;
  action: string;
  href: string;
  external?: boolean;
};

const tracks: Array<{ id: TrackId; label: string; short: string }> = [
  { id: "all", label: "All programmes", short: "14 courses" },
  { id: "fl-studio", label: "FL Studio", short: "4 courses" },
  { id: "cubase", label: "Cubase", short: "3 courses" },
  { id: "reason", label: "Reason", short: "3 courses" },
  { id: "music-business", label: "Music Business", short: "4 courses" },
];

const courses: Course[] = [
  {
    code: "FL-01",
    track: "fl-studio",
    trackLabel: "FL Studio",
    title: "FL Studio Foundations",
    level: "Beginner",
    duration: "4 weeks",
    summary: "Build your first complete beat while learning the channel rack, piano roll and arrangement view.",
    skills: ["Interface setup", "Drum programming", "Piano roll", "First arrangement"],
  },
  {
    code: "FL-02",
    track: "fl-studio",
    trackLabel: "FL Studio",
    title: "Beat Architecture",
    level: "Intermediate",
    duration: "6 weeks",
    summary: "Turn musical ideas into structured productions with sampling, melody and arrangement techniques.",
    skills: ["Sampling", "Melody writing", "Song structure", "Creative workflow"],
  },
  {
    code: "FL-03",
    track: "fl-studio",
    trackLabel: "FL Studio",
    title: "Mixing Systems",
    level: "Advanced",
    duration: "6 weeks",
    summary: "Create balanced, energetic mixes with a repeatable routing and processing workflow.",
    skills: ["Gain staging", "EQ", "Compression", "Space & depth"],
  },
  {
    code: "FL-04",
    track: "fl-studio",
    trackLabel: "FL Studio",
    title: "Mastering for Streaming",
    level: "Advanced",
    duration: "4 weeks",
    summary: "Prepare a confident final master and export it correctly for modern streaming platforms.",
    skills: ["Loudness", "Final EQ", "Limiting", "Delivery formats"],
  },
  {
    code: "CB-01",
    track: "cubase",
    trackLabel: "Cubase",
    title: "Cubase Foundations",
    level: "Beginner",
    duration: "5 weeks",
    summary: "Set up projects, record clean audio and understand the essential MIDI and editing tools.",
    skills: ["Project setup", "Audio recording", "MIDI basics", "Editing"],
  },
  {
    code: "CB-02",
    track: "cubase",
    trackLabel: "Cubase",
    title: "Recording & Production",
    level: "Intermediate",
    duration: "6 weeks",
    summary: "Develop a professional recording and production workflow for vocals and instruments.",
    skills: ["Session planning", "Comping", "Automation", "Production"],
  },
  {
    code: "CB-03",
    track: "cubase",
    trackLabel: "Cubase",
    title: "Cubase Mix Workflow",
    level: "Advanced",
    duration: "6 weeks",
    summary: "Move from raw session to final mix with channel-strip, effects and mixdown techniques.",
    skills: ["Channel strip", "Bus processing", "Effects", "Final mixdown"],
  },
  {
    code: "RS-01",
    track: "reason",
    trackLabel: "Reason",
    title: "Reason Rack Foundations",
    level: "Beginner",
    duration: "4 weeks",
    summary: "Learn the rack, devices and sequencer by building a track from the ground up.",
    skills: ["Rack navigation", "Devices", "Sequencing", "Beat creation"],
  },
  {
    code: "RS-02",
    track: "reason",
    trackLabel: "Reason",
    title: "Sound Design Lab",
    level: "Intermediate",
    duration: "6 weeks",
    summary: "Design original sounds and learn how synthesis, drum machines and effects work together.",
    skills: ["Synthesis", "Custom patches", "Drum design", "Effects routing"],
  },
  {
    code: "RS-03",
    track: "reason",
    trackLabel: "Reason",
    title: "Advanced Routing",
    level: "Advanced",
    duration: "5 weeks",
    summary: "Use complex routing and rack extensions to build flexible, performance-ready systems.",
    skills: ["Signal flow", "Parallel chains", "Rack extensions", "Performance"],
  },
  {
    code: "MB-01",
    track: "music-business",
    trackLabel: "Music Business",
    title: "Music Business Essentials",
    level: "All levels",
    duration: "5 weeks",
    summary: "Understand how careers, teams, releases and revenue connect in the South African music industry.",
    skills: ["Industry map", "Artist teams", "Release planning", "Revenue streams"],
  },
  {
    code: "MB-02",
    track: "music-business",
    trackLabel: "Music Business",
    title: "Rights & Royalties SA",
    level: "All levels",
    duration: "5 weeks",
    summary: "Learn song ownership, splits, identifiers and the roles of South African music organisations.",
    skills: ["Copyright", "Split sheets", "ISRC & metadata", "CMO basics"],
  },
  {
    code: "MB-03",
    track: "music-business",
    trackLabel: "Music Business",
    title: "Artist Brand & Marketing",
    level: "All levels",
    duration: "4 weeks",
    summary: "Build a clear artist identity and a practical release campaign across digital platforms.",
    skills: ["Positioning", "Visual identity", "Content plan", "Release campaign"],
  },
  {
    code: "MB-04",
    track: "music-business",
    trackLabel: "Music Business",
    title: "EPK & Release Strategy",
    level: "All levels",
    duration: "4 weeks",
    summary: "Create a professional press kit and prepare a finished project for distribution and promotion.",
    skills: ["Artist biography", "Press assets", "Distribution", "Pitching"],
  },
];

const serviceRoutes: ServiceRoute[] = [
  {
    id: "academy",
    code: "01",
    label: "Academy",
    symbol: "⌁",
    note: "Practical courses, memberships and music-career guidance.",
    offerings: [
      { name: "Free access", price: "R0", detail: "Intro lessons and course previews" },
      { name: "Basic", price: "R149", detail: "Beginner programmes and materials" },
      { name: "Pro", price: "R349", detail: "Full curriculum, classes and feedback" },
      { name: "VIP", price: "R999", detail: "Direct mentorship and release planning" },
    ],
    action: "Explore courses",
    href: "#courses",
  },
  {
    id: "studio",
    code: "02",
    label: "Studio",
    symbol: "◉",
    note: "Recording, mixing, mastering and podcast production.",
    offerings: [
      { name: "Vocal recording", price: "R300", detail: "Per hour" },
      { name: "Mixing", price: "R500", detail: "Per track" },
      { name: "Mastering", price: "R100", detail: "Per song" },
      { name: "Podcast recording", price: "R300", detail: "Per hour" },
    ],
    action: "Book a studio service",
    href: "#enrol",
  },
  {
    id: "beats",
    code: "03",
    label: "Beat Store",
    symbol: "≋",
    note: "In-house Afro House, Amapiano, House and Hip Hop production.",
    offerings: [
      { name: "Basic licence", price: "R300", detail: "MP3 · non-exclusive" },
      { name: "Premium licence", price: "R800", detail: "WAV + stems · non-exclusive" },
      { name: "Exclusive licence", price: "R3,500+", detail: "Availability check required" },
    ],
    action: "Ask about a beat",
    href: "#enrol",
  },
  {
    id: "creative",
    code: "04",
    label: "Creative",
    symbol: "◫",
    note: "Visual assets and content designed for music releases.",
    offerings: [
      { name: "Event poster", price: "R200", detail: "Promotion-ready artwork" },
      { name: "Cover artwork", price: "R250", detail: "Single or release cover" },
      { name: "Social content", price: "R350", detail: "Artist content pack" },
      { name: "Album artwork", price: "R500", detail: "Full release packaging" },
      { name: "Video editing", price: "R800", detail: "Music and visual content" },
    ],
    action: "Start a creative brief",
    href: "#enrol",
  },
  {
    id: "label",
    code: "05",
    label: "Record Label",
    symbol: "◎",
    note: "Confirmed catalogue destinations, label updates and demo intake.",
    offerings: [
      { name: "Beatport catalogue", price: "LIVE", detail: "Confirmed label destination" },
      { name: "Traxsource catalogue", price: "LIVE", detail: "Confirmed label destination" },
      { name: "Demo submission", price: "OPEN", detail: "Listening link and project context" },
    ],
    action: "Open the label catalogue",
    href: "https://www.beatport.com/label/lukulu-recordings/90528",
    external: true,
  },
];

function CourseExplorer() {
  const [activeTrack, setActiveTrack] = useState<TrackId>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>("FL-01");

  const visibleCourses = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesTrack = activeTrack === "all" || course.track === activeTrack;
      const matchesQuery =
        !normalized ||
        `${course.title} ${course.trackLabel} ${course.level} ${course.summary} ${course.skills.join(" ")}`
          .toLowerCase()
          .includes(normalized);
      return matchesTrack && matchesQuery;
    });
  }, [activeTrack, query]);

  return (
    <section className="course-section" id="courses" aria-labelledby="course-heading">
      <div className="section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / Course library</p>
            <h2 id="course-heading">Choose your learning path.</h2>
          </div>
          <p>
            Browse by software, skill or career goal. Every programme ends in a practical
            outcome you can use on a real music project.
          </p>
        </div>

        <div className="course-workbench">
          <aside className="track-list" aria-label="Course categories">
            <p className="micro-label">Filter by track</p>
            {tracks.map((track) => (
              <button
                className={activeTrack === track.id ? "track-button is-active" : "track-button"}
                key={track.id}
                type="button"
                onClick={() => setActiveTrack(track.id)}
                aria-pressed={activeTrack === track.id}
              >
                <span>{track.label}</span>
                <small>{track.short}</small>
              </button>
            ))}
          </aside>

          <div className="course-results">
            <label className="course-search">
              <span className="sr-only">Search the course library</span>
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search skills, software or level"
              />
              <kbd>{visibleCourses.length}</kbd>
            </label>

            <div className="course-list" aria-live="polite">
              {visibleCourses.length > 0 ? (
                visibleCourses.map((course) => {
                  const isExpanded = expanded === course.code;
                  return (
                    <article className={isExpanded ? "course-card is-expanded" : "course-card"} key={course.code}>
                      <button
                        className="course-card__summary"
                        type="button"
                        onClick={() => setExpanded(isExpanded ? null : course.code)}
                        aria-expanded={isExpanded}
                      >
                        <span className="course-code">{course.code}</span>
                        <span className="course-title">
                          <small>{course.trackLabel}</small>
                          <strong>{course.title}</strong>
                        </span>
                        <span className="course-meta">
                          <small>{course.level}</small>
                          <small>{course.duration}</small>
                        </span>
                        <span className="expand-mark" aria-hidden="true">{isExpanded ? "−" : "+"}</span>
                      </button>
                      {isExpanded && (
                        <div className="course-card__detail">
                          <p>{course.summary}</p>
                          <ul>
                            {course.skills.map((skill) => <li key={skill}>{skill}</li>)}
                          </ul>
                          <a href="#enrol">Ask about this course <span aria-hidden="true">↗</span></a>
                        </div>
                      )}
                    </article>
                  );
                })
              ) : (
                <div className="empty-state">
                  <span>0 results</span>
                  <h3>No programme matched that search.</h3>
                  <button type="button" onClick={() => { setQuery(""); setActiveTrack("all"); }}>
                    Reset the library
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceExplorer() {
  const [activeService, setActiveService] = useState<ServiceId>("academy");
  const selected = serviceRoutes.find((service) => service.id === activeService) ?? serviceRoutes[0];

  return (
    <section className="service-section" id="services" aria-labelledby="services-heading">
      <div className="section-shell">
        <div className="section-heading section-heading--light">
          <div>
            <p className="eyebrow">06 / The full ecosystem</p>
            <h2 id="services-heading">One signal. Every room.</h2>
          </div>
          <p>
            The uploaded Lukulu platform brings the academy, studio, beat store,
            creative desk and record label into one clear route.
          </p>
        </div>

        <div className="service-console">
          <div className="service-tabs" role="tablist" aria-label="Lukulu services">
            {serviceRoutes.map((service) => (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={selected.id === service.id}
                aria-controls={`service-panel-${service.id}`}
                className={selected.id === service.id ? "is-active" : undefined}
                onClick={() => setActiveService(service.id)}
              >
                <small>{service.code}</small>
                <span className="service-symbol" aria-hidden="true">{service.symbol}</span>
                <strong>{service.label}</strong>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>

          <div
            className="service-panel"
            id={`service-panel-${selected.id}`}
            role="tabpanel"
          >
            <div className="service-panel__intro">
              <p className="micro-label">ACTIVE ROOM / {selected.code}</p>
              <h3>{selected.label}</h3>
              <p>{selected.note}</p>
            </div>
            <div className="service-offerings">
              {selected.offerings.map((offering, index) => (
                <article key={offering.name}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{offering.name}</strong>
                    <small>{offering.detail}</small>
                  </div>
                  <b>{offering.price}</b>
                </article>
              ))}
            </div>
            <div className="service-panel__actions">
              <a
                className="button button-primary"
                href={selected.href}
                target={selected.external ? "_blank" : undefined}
                rel={selected.external ? "noreferrer" : undefined}
              >
                {selected.action} <span aria-hidden="true">↗</span>
              </a>
              {selected.id === "label" && (
                <a
                  className="text-link"
                  href="https://www.traxsource.com/label/53294/lukulu-recordings"
                  target="_blank"
                  rel="noreferrer"
                >
                  Traxsource catalogue ↗
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="student-access" id="student-access">
          <div className="student-access__signal" aria-hidden="true">
            <span>ST</span><i /><i /><i />
          </div>
          <div>
            <p className="micro-label">STUDENT CHANNEL</p>
            <h3>Student access is being connected.</h3>
            <p>
              The uploaded platform includes secure email sign-in, a student dashboard
              and billing support. These will activate when the Google Cloud or Supabase
              backend is connected; no account or payment access is being claimed yet.
            </p>
          </div>
          <a href="mailto:lukulurecordings@gmail.com?subject=Lukulu%20Academy%20student%20access">
            Get student-access help <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function EnquiryDesk() {
  const [category, setCategory] = useState<ServiceId>("academy");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const selected = serviceRoutes.find((service) => service.id === category) ?? serviceRoutes[0];

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Lukulu enquiry — ${selected.label}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${selected.label}`,
      "",
      message,
    ].join("\n");
    window.location.href = `mailto:lukulurecordings@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="enquiry-desk" onSubmit={submitEnquiry}>
      <div className="enquiry-desk__head">
        <p className="micro-label">STRUCTURED ENQUIRY</p>
        <h3>Route your request.</h3>
        <p>Choose the right room and the site will prepare a complete email for the Lukulu team.</p>
      </div>
      <div className="enquiry-fields">
        <label>
          <span>Name</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            placeholder="Your name"
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </label>
        <label>
          <span>Service</span>
          <select value={category} onChange={(event) => setCategory(event.target.value as ServiceId)}>
            {serviceRoutes.map((service) => (
              <option value={service.id} key={service.id}>{service.label}</option>
            ))}
          </select>
        </label>
        <label className="enquiry-fields__message">
          <span>What do you need?</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us your goal, software, service or project deadline."
            rows={5}
            required
          />
        </label>
      </div>
      <button className="button button-primary" type="submit">
        Prepare enquiry <span aria-hidden="true">↗</span>
      </button>
      <p className="enquiry-note">Your email app will open with the enquiry ready to send.</p>
    </form>
  );
}

export function AcademyExperience() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Lukulu Academy home">
          <span className="wordmark-disc" aria-hidden="true"><i /></span>
          <span>
            <strong>LUKULU</strong>
            <small>Academy & Recordings</small>
          </span>
        </a>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          <a href="#courses" onClick={closeMenu}>Courses</a>
          <a href="#journey" onClick={closeMenu}>How it works</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#student-access" onClick={closeMenu}>Students</a>
          <a href="#enrol" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="#enrol" onClick={closeMenu}>Enrol now <span aria-hidden="true">↗</span></a>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span /><span />
        </button>
      </header>

      <div id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orb hero-orb--one" aria-hidden="true" />
          <div className="hero-orb hero-orb--two" aria-hidden="true" />
          <div className="section-shell hero-layout">
            <div className="hero-copy">
              <div className="live-label"><i /> Enrolment open / 2026</div>
              <h1 id="hero-title">
                Learn it.
                <span>Build it.</span>
                Release it.
              </h1>
              <p>
                A practical online music academy built for South African creators.
                Master your DAW, understand the business and turn your next idea into a
                release-ready project.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#courses">Explore courses <span aria-hidden="true">↓</span></a>
                <a className="text-link" href="#journey">See the student journey <span aria-hidden="true">↗</span></a>
              </div>
              <dl className="hero-stats">
                <div><dt>4</dt><dd>Learning tracks</dd></div>
                <div><dt>14</dt><dd>Practical programmes</dd></div>
                <div><dt>1</dt><dd>Route to release</dd></div>
              </dl>
            </div>

            <div className="hero-console">
              <div className="console-topline">
                <span>LAR / SOUTH AFRICA</span>
                <span className="signal-bars" aria-label="Signal active"><i /><i /><i /><i /></span>
              </div>
              <div className="brand-stage">
                <div className="record-rings" aria-hidden="true"><i /><i /><i /></div>
                <img src="/lukulu-brand-mark.webp" alt="Lukulu Academy and Recordings emblem" />
              </div>
              <div className="console-now">
                <div>
                  <small>Now learning</small>
                  <strong>Music Business Essentials</strong>
                </div>
                <span>68%</span>
              </div>
              <div className="progress-rail" aria-hidden="true"><i /></div>
              <div className="console-foot">
                <span>Remote learning</span>
                <span>Boksburg → South Africa</span>
              </div>
            </div>
          </div>
        </section>

        <div className="signal-ticker" aria-hidden="true">
          <div>
            <span>FL STUDIO</span><i>◆</i><span>CUBASE</span><i>◆</i><span>REASON</span><i>◆</i>
            <span>MUSIC BUSINESS</span><i>◆</i><span>RIGHTS & ROYALTIES</span><i>◆</i>
            <span>ARTIST DEVELOPMENT</span><i>◆</i>
          </div>
        </div>

        <section className="manifesto" aria-labelledby="manifesto-title">
          <div className="section-shell manifesto-grid">
            <p className="eyebrow">01 / The academy</p>
            <div>
              <h2 id="manifesto-title">Not just tutorials. A working music career system.</h2>
              <p>
                Lukulu connects technical training, creative development and music-business
                knowledge in one learning path. Build the skill, finish the work, then learn
                how to present and release it professionally.
              </p>
            </div>
            <ol className="manifesto-steps">
              <li><span>01</span><strong>Learn</strong><small>DAW skills and industry knowledge</small></li>
              <li><span>02</span><strong>Create</strong><small>A complete, feedback-ready project</small></li>
              <li><span>03</span><strong>Release</strong><small>A professional route to the market</small></li>
            </ol>
          </div>
        </section>

        <CourseExplorer />

        <section className="journey-section" id="journey" aria-labelledby="journey-heading">
          <div className="section-shell">
            <div className="section-heading section-heading--light">
              <div>
                <p className="eyebrow">03 / Student journey</p>
                <h2 id="journey-heading">From first session to finished release.</h2>
              </div>
              <p>
                The academy is designed around momentum. Each stage produces something
                useful, so you keep building a real body of work while you learn.
              </p>
            </div>

            <ol className="journey-map">
              <li>
                <span>01</span>
                <div className="journey-symbol" aria-hidden="true">⌁</div>
                <small>Foundations</small>
                <h3>Learn</h3>
                <p>Build dependable technical skills through guided lessons and practical exercises.</p>
                <strong>Outcome: working project</strong>
              </li>
              <li>
                <span>02</span>
                <div className="journey-symbol" aria-hidden="true">◫</div>
                <small>Production</small>
                <h3>Create</h3>
                <p>Apply the workflow to your own track, artist identity or release campaign.</p>
                <strong>Outcome: finished portfolio piece</strong>
              </li>
              <li>
                <span>03</span>
                <div className="journey-symbol" aria-hidden="true">◎</div>
                <small>Feedback</small>
                <h3>Refine</h3>
                <p>Use mentor feedback to strengthen the music, metadata and presentation.</p>
                <strong>Outcome: professional package</strong>
              </li>
              <li>
                <span>04</span>
                <div className="journey-symbol" aria-hidden="true">↗</div>
                <small>Next move</small>
                <h3>Release</h3>
                <p>Prepare for distribution or submit a release-ready demo to Lukulu Recordings.</p>
                <strong>Outcome: market-ready release</strong>
              </li>
            </ol>
          </div>
        </section>

        <section className="benefit-section" aria-labelledby="benefit-heading">
          <div className="section-shell benefit-layout">
            <div className="benefit-sticky">
              <p className="eyebrow">04 / Why Lukulu</p>
              <h2 id="benefit-heading">Built for the realities of independent artists.</h2>
              <p>
                Learn remotely, work with the tools available to you and receive practical
                guidance grounded in the South African music ecosystem.
              </p>
              <a className="text-link" href="#plans">Compare memberships <span aria-hidden="true">↘</span></a>
            </div>
            <ol className="benefit-ledger">
              <li>
                <span>01</span>
                <div><h3>Remote-first learning</h3><p>Join from anywhere in South Africa and work at a pace that fits your schedule.</p></div>
                <i>ZA</i>
              </li>
              <li>
                <span>02</span>
                <div><h3>Practical, project-based lessons</h3><p>Every module connects to a beat, mix, brand asset or release document you can keep.</p></div>
                <i>01:1</i>
              </li>
              <li>
                <span>03</span>
                <div><h3>Curated free-tool guidance</h3><p>Get legal, accessible recommendations for free production tools and learning resources.</p></div>
                <i>FREE</i>
              </li>
              <li>
                <span>04</span>
                <div><h3>A route beyond the classroom</h3><p>Release-ready graduates can submit finished work to Lukulu Recordings for consideration.</p></div>
                <i>LAR</i>
              </li>
            </ol>
          </div>
        </section>

        <section className="plans-section" id="plans" aria-labelledby="plans-heading">
          <div className="section-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">05 / Membership</p>
                <h2 id="plans-heading">Start free. Grow when you are ready.</h2>
              </div>
              <p>
                Straightforward monthly access with no confusing bundles. Ask the academy
                team to confirm the current intake and best plan for your goals.
              </p>
            </div>

            <div className="plan-grid">
              <article className="plan-card">
                <div className="plan-top"><span>00</span><small>Explore</small></div>
                <h3>Free</h3>
                <p>Preview the Lukulu learning style before committing.</p>
                <div className="plan-price"><strong>R0</strong><small>forever</small></div>
                <ul>
                  <li>Introductory lessons</li>
                  <li>Course library preview</li>
                  <li>Academy updates</li>
                </ul>
                <a href="#courses">Browse free previews <span aria-hidden="true">↗</span></a>
              </article>

              <article className="plan-card">
                <div className="plan-top"><span>01</span><small>Foundation</small></div>
                <h3>Basic</h3>
                <p>Build core skills with complete beginner learning paths.</p>
                <div className="plan-price"><strong>R149</strong><small>/ month</small></div>
                <ul>
                  <li>All beginner programmes</li>
                  <li>Learning materials</li>
                  <li>Community support</li>
                </ul>
                <a href="mailto:lukulurecordings@gmail.com?subject=Lukulu%20Academy%20Basic%20Plan">Ask about Basic <span aria-hidden="true">↗</span></a>
              </article>

              <article className="plan-card plan-card--featured">
                <div className="plan-badge">Most popular</div>
                <div className="plan-top"><span>02</span><small>Creator</small></div>
                <h3>Pro</h3>
                <p>Access the full curriculum, live learning and feedback.</p>
                <div className="plan-price"><strong>R349</strong><small>/ month</small></div>
                <ul>
                  <li>All courses and levels</li>
                  <li>Live classes</li>
                  <li>Project feedback</li>
                  <li>Label demo submission</li>
                </ul>
                <a href="mailto:lukulurecordings@gmail.com?subject=Lukulu%20Academy%20Pro%20Plan">Ask about Pro <span aria-hidden="true">↗</span></a>
              </article>

              <article className="plan-card">
                <div className="plan-top"><span>03</span><small>Mentorship</small></div>
                <h3>VIP</h3>
                <p>Direct guidance for creators building a serious release plan.</p>
                <div className="plan-price"><strong>R999</strong><small>/ month</small></div>
                <ul>
                  <li>Everything in Pro</li>
                  <li>Direct mentorship</li>
                  <li>Mastering support</li>
                  <li>Studio service discount</li>
                </ul>
                <a href="mailto:lukulurecordings@gmail.com?subject=Lukulu%20Academy%20VIP%20Plan">Ask about VIP <span aria-hidden="true">↗</span></a>
              </article>
            </div>
            <p className="price-note">All prices shown in South African rand. Contact Lukulu to confirm current availability and terms.</p>
          </div>
        </section>

        <ServiceExplorer />

        <section className="faq-section" aria-labelledby="faq-heading">
          <div className="section-shell faq-layout">
            <div>
              <p className="eyebrow">07 / Quick answers</p>
              <h2 id="faq-heading">Before you enrol.</h2>
            </div>
            <div className="faq-list">
              <details>
                <summary>Do I need previous music-production experience?<span>+</span></summary>
                <p>No. Each software track starts with a foundations programme. You can begin as a complete newcomer and progress one level at a time.</p>
              </details>
              <details>
                <summary>Can I study remotely?<span>+</span></summary>
                <p>Yes. The academy is remote-first and designed for students across South Africa. You will need a reliable internet connection and access to the software used in your chosen track.</p>
              </details>
              <details>
                <summary>Does completing a course guarantee a label release?<span>+</span></summary>
                <p>No. Graduates can submit release-ready work for consideration, but every label decision depends on the music, presentation and current release schedule.</p>
              </details>
              <details>
                <summary>Which course should I start with?<span>+</span></summary>
                <p>Choose the DAW you already use, or start with Music Business Essentials if your main goal is understanding releases, rights and royalties.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="enrol-section" id="enrol" aria-labelledby="enrol-heading">
          <div className="enrol-glow" aria-hidden="true" />
          <div className="section-shell enrol-layout">
            <div>
              <p className="eyebrow">08 / Next intake</p>
              <h2 id="enrol-heading">Your next project can start here.</h2>
              <p>
                Tell the Lukulu team what you want to learn, what software you use and the
                outcome you want to build. They will recommend the strongest starting point.
              </p>
              <div className="enrol-actions">
                <a className="button button-primary" href="mailto:lukulurecordings@gmail.com?subject=Lukulu%20Academy%20Enrolment">Email the academy <span aria-hidden="true">↗</span></a>
                <a className="text-link" href="tel:+27730933554">Call +27 73 093 3554</a>
              </div>
            </div>
            <EnquiryDesk />
          </div>
          <div className="section-shell contact-strip">
            <div><small>Academy</small><strong>Lukulu Academy & Recordings</strong></div>
            <div><small>Email</small><a href="mailto:lukulurecordings@gmail.com">lukulurecordings@gmail.com</a></div>
            <div><small>Location</small><strong>Boksburg, South Africa</strong></div>
            <div><small>Learning format</small><strong>Remote / online</strong></div>
            <div className="contact-signal"><i /><span>Enrolment enquiries open</span></div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="section-shell footer-grid">
            <div>
              <a className="wordmark" href="#top" aria-label="Back to top">
                <span className="wordmark-disc" aria-hidden="true"><i /></span>
                <span><strong>LUKULU</strong><small>Academy & Recordings</small></span>
              </a>
              <p>Learn music. Create music. Release music.</p>
            </div>
            <div>
              <small>Explore</small>
              <a href="#courses">Courses</a>
              <a href="#journey">Student journey</a>
              <a href="#plans">Membership</a>
              <a href="#services">Services</a>
            </div>
            <div>
              <small>Connect</small>
              <a href="mailto:lukulurecordings@gmail.com">Email</a>
              <a href="tel:+27730933554">Phone</a>
              <a href="https://www.instagram.com/lukulurecordings/" target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href="https://www.facebook.com/Lukulu-Recordings-111653077359354" target="_blank" rel="noreferrer">Facebook ↗</a>
              <a href="https://github.com/lukulurecordings-LAR/LAR" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
          <div className="section-shell footer-bottom">
            <span>© 2026 Lukulu Academy & Recordings</span>
            <span>Lukulu Recordings · 2020/604227/07</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
