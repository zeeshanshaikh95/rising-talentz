import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { bookingApi } from '@/api/endpoints';
import {
  DESK_OFFERINGS,
  EVENTS,
  WHATSAPP_DISPLAY,
  buildBookingMessage,
  defaultEventId,
  eventById,
  offeringById,
  waLink,
  type EventBill,
  type OfferingId,
} from '@/lib/event';

type Step = 'pick' | 'details' | 'ticket';

interface Ticket {
  reference: string;
  saved: boolean;
  offeringId: OfferingId;
  eventId: EventBill['id'];
  name: string;
  phone: string;
  city: string;
  organisation: string;
  quantity: number;
  note: string;
}

function localReference() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'RT';
  for (let i = 0; i < 4; i += 1) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return code;
}

export function BookPage() {
  const [params] = useSearchParams();
  const initialOffer = offeringById(params.get('offer') ?? '')?.id ?? 'stall';
  const initialEvent = eventById(params.get('event') ?? '')?.id ?? defaultEventId();

  const [step, setStep] = useState<Step>(params.get('offer') ? 'details' : 'pick');
  const [offeringId, setOfferingId] = useState<OfferingId>(initialOffer === 'enquiry' ? 'stall' : initialOffer);
  const [eventId, setEventId] = useState<EventBill['id']>(initialEvent);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const offering = offeringById(offeringId);
  const event = eventById(eventId);

  const preview = useMemo(() => {
    if (!ticket) return '';
    return buildBookingMessage(ticket);
  }, [ticket]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (name.trim().length < 2) {
      setError('Add the name that should be on the ticket.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Add a phone number the desk can reply on.');
      return;
    }

    const draft = {
      offeringId,
      eventId,
      name: name.trim(),
      phone: phone.trim(),
      city: city.trim(),
      organisation: organisation.trim(),
      quantity,
      note: note.trim(),
    };

    setBusy(true);
    try {
      const res = await bookingApi.create(draft);
      setTicket({ ...draft, reference: res.booking.reference, saved: true });
    } catch {
      setTicket({ ...draft, reference: localReference(), saved: false });
    } finally {
      setBusy(false);
      setStep('ticket');
    }
  }

  return (
    <>
      <Seo
        title="Book a stall, sponsorship or stage entry"
        description="Pick what you want, get a booking reference, and send it to Rising Talents on WhatsApp. Prices are confirmed by the team."
        canonicalPath="/book"
      />

      <section className="border-b border-wine/10 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-600">Booking desk</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-wine sm:text-5xl">Hold your place.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
            This is not a payment. You choose the event and the booking, the desk issues a reference, and WhatsApp {WHATSAPP_DISPLAY} confirms availability and price.
          </p>
          <ol className="mt-6 flex gap-6 text-xs font-bold uppercase tracking-widest">
            {(['pick', 'details', 'ticket'] as Step[]).map((item, index) => (
              <li key={item} className={step === item ? 'text-brand-600' : 'text-ink-soft'}>
                0{index + 1} {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {step === 'pick' ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
            <div>
              <fieldset>
                <legend className="text-sm font-bold text-wine">Which listing?</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {EVENTS.map((item) => (
                    <label key={item.id} className={`cursor-pointer border p-4 ${eventId === item.id ? 'border-brand-600 bg-blush' : 'border-wine/15'}`}>
                      <input
                        className="sr-only"
                        type="radio"
                        name="event"
                        checked={eventId === item.id}
                        onChange={() => setEventId(item.id)}
                      />
                      <span className="block font-display text-xl font-bold text-wine">{item.when}</span>
                      <span className="mt-1 block text-sm text-ink-soft">{item.name}</span>
                      <span className="mt-2 block text-xs text-ink-soft">{item.source}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-8">
                <legend className="text-sm font-bold text-wine">What are you booking?</legend>
                <div className="mt-3 divide-y divide-wine/10 border-y border-wine/10">
                  {DESK_OFFERINGS.map((item) => (
                    <label key={item.id} className="flex cursor-pointer items-start gap-3 py-4">
                      <input
                        type="radio"
                        name="offering"
                        className="mt-1 accent-brand-600"
                        checked={offeringId === item.id}
                        onChange={() => setOfferingId(item.id)}
                      />
                      <span>
                        <span className="block font-semibold text-wine">{item.name}</span>
                        <span className="block text-sm text-ink-soft">{item.detail}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
            <aside className="h-fit border border-wine/15 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">Selected</p>
              <p className="mt-3 font-display text-2xl font-bold text-wine">{offering?.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{event?.when}</p>
              <p className="mt-4 text-xs text-ink-soft">Price: confirmed on WhatsApp. Not listed here, because it is not published.</p>
              <button type="button" className="mark-fill mt-6 w-full rounded-full py-3 text-sm font-bold text-white" onClick={() => setStep('details')}>
                Continue
              </button>
            </aside>
          </div>
        ) : null}

        {step === 'details' ? (
          <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_280px]">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">Name</span>
                <input className="input mt-1" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">Phone</span>
                <input className="input mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" autoComplete="tel" placeholder="+91" />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">City</span>
                <input className="input mt-1" value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">Organisation or brand</span>
                <input className="input mt-1" value={organisation} onChange={(e) => setOrganisation(e.target.value)} />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">How many {offering?.unit}</span>
                <input className="input mt-1" type="number" min={1} max={50} value={quantity} onChange={(e) => setQuantity(Number(e.target.value) || 1)} />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">Note for the desk</span>
                <textarea className="input mt-1 min-h-28" value={note} onChange={(e) => setNote(e.target.value)} />
              </label>
              {error ? <p className="sm:col-span-2 text-sm font-semibold text-brand-600">{error}</p> : null}
            </div>
            <aside className="h-fit border border-wine/15 p-5">
              <p className="font-display text-2xl font-bold text-wine">{offering?.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{event?.name}</p>
              <p className="text-sm text-ink-soft">{event?.when}</p>
              <div className="mt-6 flex flex-col gap-2">
                <button type="submit" disabled={busy} className="mark-fill rounded-full py-3 text-sm font-bold text-white disabled:opacity-60">
                  {busy ? 'Issuing reference…' : 'Issue my ticket'}
                </button>
                <button type="button" className="rounded-full border border-wine/20 py-3 text-sm font-bold text-wine" onClick={() => setStep('pick')}>
                  Back
                </button>
              </div>
            </aside>
          </form>
        ) : null}

        {step === 'ticket' && ticket ? (
          <div className="mx-auto max-w-xl">
            <article className="overflow-hidden bg-white shadow-ticket">
              <div className="mark-fill px-6 py-4 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em]">Rising Talents · desk copy</p>
                <p className="mt-1 font-display text-3xl font-extrabold">{ticket.reference}</p>
              </div>
              <div className="space-y-3 px-6 py-6 text-sm">
                <p className="font-display text-2xl font-bold text-wine">{offeringById(ticket.offeringId)?.name}</p>
                <p>{eventById(ticket.eventId)?.name}</p>
                <p className="text-ink-soft">{eventById(ticket.eventId)?.when} · {eventById(ticket.eventId)?.venue}</p>
                <hr className="border-dashed border-wine/20" />
                <p><span className="font-bold">Name</span> · {ticket.name}</p>
                <p><span className="font-bold">Phone</span> · {ticket.phone}</p>
                {ticket.city ? <p><span className="font-bold">City</span> · {ticket.city}</p> : null}
                {ticket.organisation ? <p><span className="font-bold">Organisation</span> · {ticket.organisation}</p> : null}
                <p><span className="font-bold">Quantity</span> · {ticket.quantity}</p>
                <p className="text-ink-soft">Price is not on this ticket. The team confirms it on WhatsApp.</p>
                <p className={`text-xs font-bold uppercase tracking-widest ${ticket.saved ? 'text-emerald-700' : 'text-brand-600'}`}>
                  {ticket.saved ? 'Saved on the desk' : 'Desk API offline — this reference lives on the WhatsApp message'}
                </p>
              </div>
            </article>
            <a
              href={waLink(preview)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center rounded-full bg-[#128C7E] py-3 text-sm font-bold text-white"
            >
              Send this ticket on WhatsApp
            </a>
            <button
              type="button"
              className="mt-3 w-full text-sm font-bold text-ink-soft"
              onClick={() => {
                setTicket(null);
                setStep('pick');
              }}
            >
              Book another
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
}
