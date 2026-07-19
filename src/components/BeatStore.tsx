import { useState } from 'react';
import { ArrowUpRightIcon, FileAudioIcon, LockKeyholeIcon, ShoppingBagIcon } from 'lucide-react';
import { CheckoutButton } from './CheckoutButton';
import { Reveal } from './Reveal';
import { SectionIntro } from './SectionIntro';

type Licence = 'basic' | 'premium';

const licences: Record<Licence, { name: string; price: string; terms: string }> = {
  basic: {
    name: 'Basic licence',
    price: 'R300',
    terms: 'MP3 file · up to 5,000 streams · non-exclusive',
  },
  premium: {
    name: 'Premium licence',
    price: 'R800',
    terms: 'WAV + stems · up to 50,000 streams · non-exclusive',
  },
};

const beats = [
  { slug: 'indlela', name: 'Indlela', genre: 'Amapiano', bpm: '115 BPM' },
  { slug: 'riot', name: 'Riot', genre: 'Afro-house / Hip Hop', bpm: '90 BPM' },
  { slug: 'melo', name: 'Melo', genre: 'Afro House', bpm: '122 BPM' },
  { slug: 'lukulu_tapes', name: 'Lukulu Tapes', genre: 'House', bpm: '120 BPM' },
];

export function BeatStore() {
  const [licence, setLicence] = useState<Licence>('basic');
  const selectedLicence = licences[licence];

  return (
    <section id="beats" className="signal-section section-pad section-paper" aria-labelledby="beats-heading">
      <div className="page-shell">
        <SectionIntro
          headingId="beats-heading"
          number="07"
          eyebrow="Beat store"
          title="Choose a beat. Know the rights."
          description="In-house Amapiano, Hip Hop, Afro House and House production. Select one licence for the catalogue and see the exact price before checkout."
        />

        <Reveal className="licence-console">
          <div className="licence-selector" aria-label="Choose a beat licence">
            {(Object.keys(licences) as Licence[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={licence === key}
                className={licence === key ? 'is-selected' : undefined}
                onClick={() => setLicence(key)}
              >
                <span>{licences[key].name}</span>
                <strong>{licences[key].price}</strong>
                <small>{licences[key].terms}</small>
              </button>
            ))}
          </div>
          <div className="exclusive-inquiry">
            <LockKeyholeIcon aria-hidden="true" />
            <div>
              <strong>Need exclusive rights?</strong>
              <p>Exclusive licences start at R3,500 and require an availability check before payment.</p>
            </div>
            <a href="mailto:lukulurecordings@gmail.com?subject=Exclusive%20beat%20availability%20inquiry">
              Check availability <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <Reveal className="beat-list" delay={0.08}>
          <div className="beat-list__head" aria-hidden="true">
            <span>Track</span><span>Style</span><span>Licence</span><span>Action</span>
          </div>
          {beats.map((beat, index) => (
            <article key={beat.slug} className="beat-row">
              <div className="beat-row__title">
                <span className="beat-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="mini-wave" aria-hidden="true">
                  {[22, 58, 38, 82, 48, 68, 30, 76, 44, 62].map((height, barIndex) => (
                    <i key={barIndex} style={{ height: `${height}%` }} />
                  ))}
                </div>
                <span><strong>{beat.name}</strong><small>Produced by Lukulu</small></span>
              </div>
              <div className="beat-row__meta">
                <FileAudioIcon aria-hidden="true" />
                <span>{beat.genre}<small>{beat.bpm}</small></span>
              </div>
              <div className="beat-row__licence">
                <span>{selectedLicence.name}</span>
                <strong>{selectedLicence.price}</strong>
              </div>
              <CheckoutButton
                itemId={`beat_${beat.slug}_${licence}`}
                context={{ beat: beat.name, licence }}
                className="button button-quiet beat-buy"
                ariaLabel={`Buy ${beat.name} with the ${selectedLicence.name} for ${selectedLicence.price}`}
              >
                Buy licence <ShoppingBagIcon aria-hidden="true" />
              </CheckoutButton>
            </article>
          ))}
        </Reveal>
        <p className="section-note">Licence limits shown above apply to each beat purchase. Keep your Stripe receipt for your records.</p>
      </div>
    </section>
  );
}
