import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
};

export function PageHero({ eyebrow, title, description, aside }: PageHeroProps) {
  return (
    <header className="page-hero signal-section">
      <div className="page-hero__grid" aria-hidden="true" />
      <div className="page-shell page-hero__layout">
        <Reveal className="page-hero__copy">
          <p className="signal-label"><span>IN</span><span>{eyebrow}</span></p>
          <h1>{title}</h1>
          <p>{description}</p>
        </Reveal>
        {aside && <Reveal className="page-hero__aside" delay={0.08}>{aside}</Reveal>}
      </div>
    </header>
  );
}
