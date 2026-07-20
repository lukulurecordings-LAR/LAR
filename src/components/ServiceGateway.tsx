import {
  ArrowRightIcon,
  BookOpenIcon,
  HeadphonesIcon,
  ImageIcon,
  Mic2Icon,
  RadioIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

const services = [
  { number: '01', label: 'Academy', note: 'Courses and membership advice', explore: '#courses', enquire: '/enquire?category=academy&service=course-advice', icon: BookOpenIcon },
  { number: '02', label: 'Studio', note: 'Recording, mixing and mastering', explore: '#studio', enquire: '/enquire?category=studio&service=recording', icon: Mic2Icon },
  { number: '03', label: 'Beats', note: 'Clear non-exclusive licences', explore: '#beats', enquire: '/enquire?category=beats&service=exclusive-availability', icon: HeadphonesIcon },
  { number: '04', label: 'Creative', note: 'Artwork, video and social packs', explore: '#design', enquire: '/enquire?category=design&service=cover', icon: ImageIcon },
  { number: '05', label: 'Label', note: 'Releases, news and demo intake', explore: '/news', enquire: '/enquire?category=label&service=demo-submission', icon: RadioIcon },
];

export function ServiceGateway() {
  return (
    <section id="services" className="service-gateway section-paper" aria-labelledby="services-heading">
      <div className="page-shell">
        <Reveal className="service-gateway__head">
          <p className="console-label">QUICK ROUTE / ALL SERVICES</p>
          <h2 id="services-heading">Find your room</h2>
          <p>Explore a service, or send a structured enquiry when you need help choosing.</p>
        </Reveal>
        <Reveal className="service-routes" delay={0.06}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.label}>
                <span className="service-routes__number">{service.number}</span>
                <Icon aria-hidden="true" />
                <div><h3>{service.label}</h3><p>{service.note}</p></div>
                {service.explore.startsWith('#') ? (
                  <a href={service.explore}>Explore <ArrowRightIcon aria-hidden="true" /></a>
                ) : (
                  <Link to={service.explore}>Explore <ArrowRightIcon aria-hidden="true" /></Link>
                )}
                <Link className="service-routes__enquire" to={service.enquire}>Enquire</Link>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
