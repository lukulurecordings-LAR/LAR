import {
  Disc3Icon,
  GraduationCapIcon,
  Mic2Icon,
  PaletteIcon,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionIntro } from './SectionIntro';

const pillars = [
  {
    icon: GraduationCapIcon,
    title: 'Academy',
    text: 'FL Studio, Cubase, Reason and music-business training, from foundations to advanced production tools.',
  },
  {
    icon: Mic2Icon,
    title: 'Studio',
    text: 'Vocal recording, mixing, mastering and podcast sessions, with remote services available.',
  },
  {
    icon: Disc3Icon,
    title: 'Record label',
    text: 'A clear route to submit finished demos for consideration by Lukulu Recordings.',
  },
  {
    icon: PaletteIcon,
    title: 'Creative',
    text: 'Cover art, posters, video editing and social content shaped for an artist brand.',
  },
];

export function AboutSection() {
  return (
    <section className="signal-section section-pad section-paper" aria-labelledby="about-heading">
      <div className="page-shell">
        <SectionIntro
          headingId="about-heading"
          number="01"
          eyebrow="The ecosystem"
          title="Your music career starts here"
          description="Lukulu Academy & Recordings is a complete music ecosystem built for young South African artists. We teach you, help you create, and give finished music a path toward release."
        />

        <Reveal className="ecosystem-layout">
          <div className="ecosystem-statement">
            <span className="console-label">ONE SIGNAL / FOUR STAGES</span>
            <p>
              Not a collection of disconnected services. One practical chain from your
              first DAW session to a professional release.
            </p>
          </div>
          <ol className="ecosystem-list">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <li key={pillar.title}>
                  <span className="ecosystem-index">0{index + 1}</span>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
