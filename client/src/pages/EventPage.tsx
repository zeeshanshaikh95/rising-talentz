import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { DIWALI, MAPS_URL, NEXT_LISTING, WHATSAPP_DISPLAY, waLink } from '@/lib/event';

const FACTS = [
  { label: 'Dates', value: DIWALI.when },
  { label: 'Days', value: DIWALI.days },
  { label: 'Timing', value: DIWALI.time },
  { label: 'Venue', value: DIWALI.venue },
];

export function EventPage() {
  return (
    <>
      <Seo
        title={DIWALI.name}
        description={`${DIWALI.when} · ${DIWALI.time} · ${DIWALI.venue}`}
        canonicalPath="/event"
      />
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/50">Published event</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            {DIWALI.name}
          </h1>
          <p className="mt-5 max-w-xl text-white/75">
            A festive celebration of talent, craft and enterprise at Rassaz Ground, Near Rassaz Mall, Mira Road East.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <dl className="grid gap-6 sm:grid-cols-2">
          {FACTS.map((fact) => (
            <div key={fact.label} className="border-t-2 border-brand-600 pt-4">
              <dt className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">{fact.label}</dt>
              <dd className="mt-2 text-lg font-semibold text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={MAPS_URL} className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-ink">Get directions</a>
          <a href={waLink('Hello Rising Talents, please share the complete event details for the Diwali Carnival Exhibition & Show.')} className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-ink">
            Ask on WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <Link to="/book" className="mark-fill rounded-full px-5 py-3 text-sm font-bold text-white">Book from this bill</Link>
        </div>
        <aside className="mt-12 border border-dashed border-white/20 p-5 text-sm text-ink-soft">
          <p className="font-bold text-ink">Also listed</p>
          <p className="mt-2">
            {NEXT_LISTING.name}: {NEXT_LISTING.when}, {NEXT_LISTING.venue}. {NEXT_LISTING.source}
          </p>
          <Link to="/book?event=next-dec" className="mt-3 inline-flex font-bold text-brand-600">Book against that listing →</Link>
        </aside>
      </section>
    </>
  );
}
