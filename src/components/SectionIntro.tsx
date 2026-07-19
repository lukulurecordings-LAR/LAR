type SectionIntroProps = {
  headingId: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'split';
};

export function SectionIntro({
  headingId,
  number,
  eyebrow,
  title,
  description,
  align = 'split',
}: SectionIntroProps) {
  return (
    <header
      className={`section-intro ${align === 'left' ? 'section-intro--left' : ''}`}
    >
      <div className="section-intro__title">
        <span className="signal-label">
          <span aria-hidden="true">{number}</span>
          <span>{eyebrow}</span>
        </span>
        <h2 id={headingId}>{title}</h2>
      </div>
      <p>{description}</p>
    </header>
  );
}
