import { BanknoteIcon, DownloadIcon, Globe2Icon, UsersIcon } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionIntro } from './SectionIntro';

const benefits = [
  {
    icon: Globe2Icon,
    title: 'Learn remotely',
    text: 'All you need is your DAW and internet. Learn from anywhere in South Africa — townships, rural areas, anywhere.',
  },
  {
    icon: DownloadIcon,
    title: 'Software & VSTs',
    text: 'Students get software and VSTs from us, reducing the cost of the tools needed to start learning.',
  },
  {
    icon: UsersIcon,
    title: 'Agent reward programme',
    text: 'Refer someone who enrols and earn 5% commission. Anyone can ask to become an agent.',
  },
  {
    icon: BanknoteIcon,
    title: 'Earn royalties',
    text: 'After completing your course, submit finished music to Lukulu Recordings for release consideration.',
  },
];

export function BenefitsSection() {
  return (
    <section className="signal-section section-pad" aria-labelledby="benefits-heading">
      <div className="page-shell">
        <SectionIntro
          headingId="benefits-heading"
          number="04"
          eyebrow="Why Lukulu"
          title="Everything you need to start"
          description="Tools, practical knowledge and a credible next step — designed around the realities of an independent South African artist."
        />
        <Reveal>
          <ol className="benefit-ledger">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <li key={benefit.title}>
                  <span className="benefit-ledger__index">{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </li>
              );
            })}
          </ol>
        </Reveal>
        <p className="section-note">Professional mastering is also available from <strong>R100 per song</strong>.</p>
      </div>
    </section>
  );
}
