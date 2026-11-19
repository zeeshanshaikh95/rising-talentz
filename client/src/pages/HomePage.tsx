import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { LOGO_TRANSPARENT } from '@/lib/brand';
import {
  ABOUT,
  DESK_OFFERINGS,
  DIWALI,
  INSTAGRAM_HANDLE,
  LANES,
  MOTTO,
  NEXT_LISTING,
  WHATSAPP_DISPLAY,
} from '@/lib/event';

export function HomePage() {
  return (
    <>
      <Seo
        title="Rising Talents — Diwali Carnival Exhibition & Show"
        description={`${DIWALI.name}. ${DIWALI.when}, ${DIWALI.time}, ${DIWALI.venue}. Book a stall, sponsorship or stage entry on WhatsApp ${WHATSAPP_DISPLAY}.`}
        canonicalPath="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: DIWALI.name,
          startDate: '2026-10-24T16:00:00+05:30',
          endDate: '2026-10-25T23:00:00+05:30',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: { '@type': 'Place', name: 'Rassaz Ground', address: DIWALI.venue },
          organizer: { '@type': 'Organization', name: 'Rising Talents', slogan: MOTTO },
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-warm-500/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
          <div>
            <p className="font-script text-4xl text-warm-100 sm:text-5xl">“{MOTTO}”</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.32em] text-white/60">
              {DIWALI.days} · Mira Road East
            </p>
            <h1 className="mt-3 font-display text-5xl font-extrabold leading-[0.95] sm:text-7xl">
              Diwali
              <span className="mark-text block">Carnival</span>
              <span className="block text-2xl font-bold text-white/80 sm:text-3xl">Exhibition & Show</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75">
              A festive celebration of talent, craft and enterprise at Rassaz Ground, Near Rassaz Mall, Mira Road East.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book?offer=stall" className="mark-fill rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:scale-[1.02]">
                Book a stall
              </Link>
              <Link to="/event" className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10">
                Event details
              </Link>
            </div>
          </div>

          <aside className="relative rounded-blob bg-white p-7 text-ink shadow-ticket">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-600">Show bill</p>
            <dl className="mt-5 space-y-4">
              <div className="border-l-4 border-brand-600 pl-4">
                <dt className="text-xs font-bold uppercase tracking-widest text-ink-soft">Dates</dt>
                <dd className="font-display text-2xl font-bold">{DIWALI.when}</dd>
              </div>
              <div className="border-l-4 border-warm-500 pl-4">
                <dt className="text-xs font-bold uppercase tracking-widest text-ink-soft">Timing</dt>
                <dd className="text-lg font-semibold">{DIWALI.time}</dd>
              </div>
              <div className="border-l-4 border-brand-300 pl-4">
                <dt className="text-xs font-bold uppercase tracking-widest text-ink-soft">Venue</dt>
                <dd className="text-sm leading-relaxed">{DIWALI.venue}</dd>
              </div>
            </dl>
            <p className="mt-6 border-t border-dashed border-ink/10 pt-4 text-xs text-ink-soft">
              Next listing on {INSTAGRAM_HANDLE}: {NEXT_LISTING.when}, {NEXT_LISTING.venue}. Year not stated on the profile.
            </p>
          </aside>
        </div>
      </section>

      {/* Bookable items */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-600">The desk</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold text-ink sm:text-5xl">What you can book</h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">
            Prices are not published. The desk issues a reference, saves the request, and hands it to the team on WhatsApp {WHATSAPP_DISPLAY}.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DESK_OFFERINGS.map((item, index) => (
            <Link
              key={item.id}
              to={`/book?offer=${item.id}`}
              className="group relative overflow-hidden rounded-blob border border-ink/5 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-100/60 transition group-hover:scale-125" />
              <span className="relative text-xs font-bold uppercase tracking-[0.22em] text-brand-600">0{index + 1} · {item.lane}</span>
              <span className="relative mt-3 block font-display text-2xl font-bold text-ink group-hover:text-brand-700">{item.name}</span>
              <span className="relative mt-2 block text-sm leading-relaxed text-ink-soft">{item.detail}</span>
              <span className="relative mt-5 inline-flex text-sm font-bold text-brand-600">Book →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Three lanes */}
      <section className="bg-blush">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
          {LANES.map((lane) => (
            <article key={lane.id} className="rounded-blob bg-white p-7 shadow-card">
              <p className="font-display text-5xl font-extrabold text-brand-200">{lane.index}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">{lane.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{lane.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div className="relative">
          <div className="absolute -inset-4 rounded-blob bg-mark-soft blur-2xl" />
          <img src={LOGO_TRANSPARENT} alt="" className="relative mx-auto h-64 w-auto rounded-blob bg-white p-8 shadow-card" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-600">{ABOUT.since}</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-ink sm:text-5xl">Rising Talents</h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">{ABOUT.lead}</p>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">{ABOUT.mottoLine}</p>
          <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-600">
            The organisation <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Awards band */}
      <section className="relative overflow-hidden bg-mark text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/70">Awards</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Nominations are open</h2>
            <p className="mt-3 max-w-xl text-sm text-white/80">
              Categories and criteria are shared on request — they are not listed publicly.
            </p>
          </div>
          <Link to="/awards" className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-700 shadow-soft transition hover:scale-[1.02]">
            Nominate
          </Link>
        </div>
      </section>
    </>
  );
}
