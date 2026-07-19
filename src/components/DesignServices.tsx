import {
  FilmIcon,
  ImageIcon,
  LayoutIcon,
  MegaphoneIcon,
  ShoppingBagIcon,
  SmartphoneIcon,
} from 'lucide-react';
import { CheckoutButton } from './CheckoutButton';
import { Reveal } from './Reveal';
import { SectionIntro } from './SectionIntro';

const services = [
  {
    id: 'design_cover',
    title: 'Cover artwork',
    price: 'R250',
    description: 'Eye-catching single and album cover art that represents your sound.',
    icon: ImageIcon,
  },
  {
    id: 'design_poster',
    title: 'Event posters',
    price: 'R200',
    description: 'Bold poster designs for gigs, events and promotions.',
    icon: MegaphoneIcon,
  },
  {
    id: 'design_video',
    title: 'Video editing',
    price: 'R800',
    description: 'Music-video editing, lyric videos and visual content for releases.',
    icon: FilmIcon,
  },
  {
    id: 'design_album',
    title: 'Album artwork',
    price: 'R500',
    description: 'Full album packaging — front, back and booklet design.',
    icon: LayoutIcon,
  },
  {
    id: 'design_social',
    title: 'Social media content',
    price: 'R350',
    description: 'Instagram, TikTok and Facebook content packs for your artist brand.',
    icon: SmartphoneIcon,
  },
];

export function DesignServices() {
  return (
    <section id="design" className="signal-section section-pad" aria-labelledby="design-heading">
      <div className="page-shell">
        <SectionIntro
          headingId="design-heading"
          number="08"
          eyebrow="Creative services"
          title="Look as good as you sound"
          description="Professional design and video services for your music brand. Pick the format you need and move directly to secure checkout."
        />

        <Reveal className="creative-ledger">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article key={service.id}>
                <div className="creative-ledger__art" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Icon />
                </div>
                <div className="creative-ledger__copy">
                  <p className="console-label">LAR CREATIVE / MADE TO ORDER</p>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <div className="creative-ledger__order">
                  <span>From</span>
                  <strong>{service.price}</strong>
                  <CheckoutButton
                    itemId={service.id}
                    context={{ service: service.title }}
                    className="button button-quiet"
                    ariaLabel={`Order ${service.title} from ${service.price}`}
                  >
                    Order now <ShoppingBagIcon aria-hidden="true" />
                  </CheckoutButton>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
