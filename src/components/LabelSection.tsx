import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  ArrowUpRightIcon,
  Disc3Icon,
  MailCheckIcon,
  Music2Icon,
  SendIcon,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionIntro } from './SectionIntro';

const releases = [
  { title: 'Siyabonga', artist: 'Da Cord & DJ Nastor', genre: 'Afro House', year: '2025' },
  { title: 'Zulu', artist: 'DJ Crash', genre: 'Afro House', year: '2025' },
  { title: 'Indlela', artist: 'Zamachunu Mchunu', genre: 'Afro House', year: '2025' },
];

type DemoForm = {
  artist: string;
  email: string;
  songLink: string;
  genre: string;
  message: string;
};

const initialForm: DemoForm = { artist: '', email: '', songLink: '', genre: '', message: '' };

export function LabelSection() {
  const [form, setForm] = useState<DemoForm>(initialForm);
  const [handoffStarted, setHandoffStarted] = useState(false);

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setHandoffStarted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Demo submission — ${form.artist}`;
    const body = [
      `Artist name: ${form.artist}`,
      `Email: ${form.email}`,
      `Genre: ${form.genre}`,
      `Song link: ${form.songLink}`,
      '',
      'Message:',
      form.message || 'No additional message.',
    ].join('\n');
    setHandoffStarted(true);
    window.location.href = `mailto:lukulurecordings@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="label" className="signal-section section-pad section-paper" aria-labelledby="label-heading">
      <div className="page-shell">
        <SectionIntro
          headingId="label-heading"
          number="09"
          eyebrow="Record label"
          title="From the classroom to a release"
          description="Submit a finished demo for consideration by Lukulu Recordings, or explore recent releases and the published deal split before you get in touch."
        />

        <div className="label-layout">
          <Reveal className="release-desk">
            <div className="release-desk__head">
              <Disc3Icon aria-hidden="true" />
              <div><p className="console-label">CATALOGUE SIGNAL</p><h3>Latest releases</h3></div>
            </div>
            <ol>
              {releases.map((release, index) => (
                <li key={release.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Music2Icon aria-hidden="true" />
                  <div><strong>{release.title}</strong><small>{release.artist}</small></div>
                  <p>{release.genre}<small>{release.year}</small></p>
                </li>
              ))}
            </ol>
            <div className="deal-split">
              <p className="console-label">PUBLISHED LABEL SPLIT</p>
              <div><strong>70%</strong><span>Artist revenue</span></div>
              <i aria-hidden="true" />
              <div><strong>30%</strong><span>Label revenue</span></div>
              <p>We handle distribution, marketing and promotion under the stated deal terms.</p>
            </div>
          </Reveal>

          <Reveal className="demo-desk" delay={0.08}>
            <div className="demo-desk__head">
              <SendIcon aria-hidden="true" />
              <div><p className="console-label">DEMO INTAKE</p><h3>Submit your demo</h3></div>
            </div>
            <p className="handoff-note">
              This form does not upload anything to the site. After validation, it opens a
              prefilled email in your email app for you to review and send.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  <span>Artist name</span>
                  <input name="artist" value={form.artist} onChange={updateField} required placeholder="Your artist name" />
                </label>
                <label>
                  <span>Email address</span>
                  <input type="email" name="email" autoComplete="email" value={form.email} onChange={updateField} required placeholder="you@example.com" />
                </label>
                <label className="form-span">
                  <span>Song link</span>
                  <input type="url" name="songLink" value={form.songLink} onChange={updateField} required placeholder="SoundCloud, Google Drive or Dropbox link" />
                </label>
                <label>
                  <span>Genre</span>
                  <select name="genre" value={form.genre} onChange={updateField} required>
                    <option value="">Select a genre</option>
                    <option>Amapiano</option>
                    <option>Hip Hop</option>
                    <option>Afro House</option>
                    <option>Trap</option>
                    <option>Gqom</option>
                    <option>R&B</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="form-span">
                  <span>Message <small>(optional)</small></span>
                  <textarea name="message" rows={4} value={form.message} onChange={updateField} placeholder="Tell us about your track" />
                </label>
              </div>
              <button type="submit" className="button button-primary button-full">
                Open email to submit <ArrowUpRightIcon aria-hidden="true" />
              </button>
              <div className="demo-handoff" aria-live="polite">
                {handoffStarted && (
                  <><MailCheckIcon aria-hidden="true" /> Your email app should now be open. Review the message, attach anything else you need, then press send.</>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
