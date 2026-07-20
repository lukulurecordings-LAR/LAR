import { ArrowRightIcon, Disc3Icon, ExternalLinkIcon, NewspaperIcon, SendIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';
import { SectionIntro } from './SectionIntro';

const labelRoutes = [
  {
    number: '01',
    title: 'Confirmed releases',
    note: 'Open approved catalogue links and release items with visible attribution.',
    to: '/news',
    action: 'View releases',
    icon: Disc3Icon,
  },
  {
    number: '02',
    title: 'Label news',
    note: 'Read moderated updates sourced from confirmed Lukulu channels.',
    to: '/news?tab=news',
    action: 'Open label news',
    icon: NewspaperIcon,
  },
  {
    number: '03',
    title: 'Submit a demo',
    note: 'Send a listening link and useful context through the structured enquiry desk.',
    to: '/enquire?category=label&service=demo-submission',
    action: 'Route your demo',
    icon: SendIcon,
  },
];

export function LabelSection() {
  return (
    <section id="label" className="signal-section section-pad section-paper" aria-labelledby="label-heading">
      <div className="page-shell">
        <SectionIntro
          headingId="label-heading"
          number="09"
          eyebrow="Record label"
          title="Follow the label signal"
          description="Use the sourced news desk for releases and updates, or route a finished demo directly to label enquiry. Nothing is published automatically."
        />
        <Reveal className="label-gateway">
          {labelRoutes.map((route) => {
            const Icon = route.icon;
            return (
              <article key={route.title}>
                <span>{route.number}</span>
                <Icon aria-hidden="true" />
                <div><h3>{route.title}</h3><p>{route.note}</p></div>
                <Link to={route.to}>{route.action} <ArrowRightIcon aria-hidden="true" /></Link>
              </article>
            );
          })}
        </Reveal>
        <div className="label-sources">
          <p className="console-label">CONFIRMED CATALOGUE DESTINATIONS</p>
          <a href="https://www.beatport.com/label/lukulu-recordings/90528" target="_blank" rel="noreferrer">Beatport <ExternalLinkIcon aria-hidden="true" /></a>
          <a href="https://www.traxsource.com/label/53294/lukulu-recordings" target="_blank" rel="noreferrer">Traxsource <ExternalLinkIcon aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
