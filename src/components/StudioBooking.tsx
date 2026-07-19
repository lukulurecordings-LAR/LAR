import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  CalendarIcon,
  Clock3Icon,
  HeadphonesIcon,
  Mic2Icon,
  Music2Icon,
  RadioIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { CheckoutButton } from './CheckoutButton';
import { Reveal } from './Reveal';
import { SectionIntro } from './SectionIntro';

const services = [
  {
    id: 'studio_recording',
    shortId: 'recording',
    name: 'Vocal recording',
    description: 'Professional vocal recording with top equipment.',
    price: 'R300',
    unit: 'per hour',
    icon: Mic2Icon,
  },
  {
    id: 'studio_mixing',
    shortId: 'mixing',
    name: 'Mixing',
    description: 'Get your track sounding clean and balanced.',
    price: 'R500',
    unit: 'per track',
    icon: HeadphonesIcon,
  },
  {
    id: 'studio_mastering',
    shortId: 'mastering',
    name: 'Mastering',
    description: 'Release-ready mastering for major platforms.',
    price: 'R100',
    unit: 'per song',
    icon: Music2Icon,
  },
  {
    id: 'studio_podcast',
    shortId: 'podcast',
    name: 'Podcast recording',
    description: 'Record your podcast with professional audio.',
    price: 'R300',
    unit: 'per hour',
    icon: RadioIcon,
  },
];

type BookingForm = {
  name: string;
  email: string;
  date: string;
  time: string;
};

export function StudioBooking() {
  const [selectedId, setSelectedId] = useState(services[0].id);
  const [form, setForm] = useState<BookingForm>({ name: '', email: '', date: '', time: '' });
  const formRef = useRef<HTMLFormElement>(null);
  const selectedService = services.find((service) => service.id === selectedId) ?? services[0];
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <section id="studio" className="signal-section section-pad" aria-labelledby="studio-heading">
      <div className="page-shell">
        <SectionIntro
          headingId="studio-heading"
          number="06"
          eyebrow="Studio"
          title="Book a session"
          description="Professional recording, mixing, mastering and podcast services. Choose a service, tell us when you would like to work, then continue to the booking deposit."
        />

        <Reveal className="studio-layout">
          <div className="studio-services" aria-label="Choose a studio service">
            {services.map((service, index) => {
              const Icon = service.icon;
              const selected = service.id === selectedId;
              return (
                <button
                  key={service.id}
                  type="button"
                  aria-pressed={selected}
                  className={selected ? 'is-selected' : undefined}
                  onClick={() => setSelectedId(service.id)}
                >
                  <span className="studio-services__index">{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" />
                  <span className="studio-services__copy">
                    <strong>{service.name}</strong>
                    <small>{service.description}</small>
                  </span>
                  <span className="studio-services__price">
                    <strong>{service.price}</strong>
                    <small>{service.unit}</small>
                  </span>
                </button>
              );
            })}
          </div>

          <form
            ref={formRef}
            className="booking-form"
            onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}
          >
            <div className="booking-form__head">
              <p className="console-label">SELECTED SERVICE</p>
              <h3>{selectedService.name}</h3>
              <span>{selectedService.price} {selectedService.unit}</span>
            </div>

            <div className="booking-summary">
              <strong>Booking deposit / starting charge</strong>
              <p>
                This payment requests the session. Lukulu will confirm availability, final
                scope and any remaining balance with you directly.
              </p>
            </div>

            <div className="form-grid">
              <label>
                <span>Your name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={updateField}
                  required
                  placeholder="Enter your name"
                />
              </label>
              <label>
                <span>Email address</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField}
                  required
                  placeholder="you@example.com"
                />
              </label>
              <label>
                <span><CalendarIcon aria-hidden="true" /> Preferred date</span>
                <input
                  type="date"
                  name="date"
                  min={today}
                  value={form.date}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                <span><Clock3Icon aria-hidden="true" /> Preferred time</span>
                <select name="time" value={form.time} onChange={updateField} required>
                  <option value="">Select a time</option>
                  {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </label>
            </div>

            <CheckoutButton
              itemId={selectedService.id}
              context={{
                name: form.name,
                email: form.email,
                date: form.date,
                time: form.time,
                service: selectedService.shortId,
              }}
              className="button button-primary button-full"
              onBeforeCheckout={() => formRef.current?.reportValidity() ?? false}
              ariaLabel={`Pay the starting charge for ${selectedService.name}`}
            >
              Pay starting charge securely <ShieldCheckIcon aria-hidden="true" />
            </CheckoutButton>
            <p className="form-footnote">Remote mixing and mastering are available; ask the team after checkout.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
