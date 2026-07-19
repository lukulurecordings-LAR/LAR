import {
  BanknoteIcon,
  BookOpenIcon,
  Music2Icon,
  RocketIcon,
  SendIcon,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionIntro } from './SectionIntro';

const steps = [
  { icon: BookOpenIcon, title: 'Learn', text: 'Take courses in FL Studio, Cubase, Reason or music business.' },
  { icon: Music2Icon, title: 'Create', text: 'Produce your own track with your DAW using what you have learned.' },
  { icon: SendIcon, title: 'Submit', text: 'Send a finished demo to Lukulu Recordings for review.' },
  { icon: RocketIcon, title: 'Release', text: 'If selected, your music can be prepared for major platforms worldwide.' },
  { icon: BanknoteIcon, title: 'Earn', text: 'Earn royalties from music released through the label.' },
];

export function StudentPipeline() {
  return (
    <section className="signal-section section-pad journey" aria-labelledby="journey-heading">
      <div className="page-shell">
        <SectionIntro
          headingId="journey-heading"
          number="05"
          eyebrow="Your journey"
          title="From student to artist"
          description="Lukulu does more than teach software. The academy gives you a practical path toward making, submitting and potentially releasing your own music."
        />
        <Reveal>
          <ol className="journey-track">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title}>
                  <div className="journey-track__node">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              );
            })}
          </ol>
        </Reveal>
        <a href="#courses" className="button button-primary journey-cta">Start your journey</a>
      </div>
    </section>
  );
}
