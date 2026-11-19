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
          location: {
            '@type': 'Place',
            name: 'Rassaz Ground',
            address: DIWALI.venue,
          },
          organizer: {
            '@type': 'Organization',
            name: 'Rising Talents',
            slogan: MOTTO,
          },
        }}
      />

      <section className="relative overflow-hidden bg-wine text-paper">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#7B2CBF]/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:py-24">
          <div>
            <p className="font-script text-3xl text-rose-200 sm:text-4xl">“{MOTTO}”</p>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.32em] text-white/60">
              {DIWALI.days} · Mira Road East
            </p>
            <h1 className="mt-3 max-w-xl font-display text-5xl font-extrabold leading-[0.92] sm:text-7xl">
              Diwali
              <span className="mark-text block">Carnival</span>
              <span className="block text-3xl font-bold text-white/80 sm:text-4xl">Exhibition & Show</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75">
              A festive celebration of talent, craft and enterprise at Rassaz Ground, Near Rassaz Mall, Mira Road East.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book?offer=stall" className="mark-fill rounded-full px-5 py-3 text-sm font-bold text-white">
                Book a stall
              </Link>
              <Link to="/event" className="rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-white">
                Read the bill
              </Link>
            </div>
          </div>

          <aside className="relative bg-paper p-6 text-wine shadow-ticket">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-600">Show bill</p>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">Dates</dt>
                <dd className="font-display text-2xl font-bold">{DIWALI.when}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">Timing</dt>
                <dd className="text-lg font-semibold">{DIWALI.time}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">Venue</dt>
                <dd className="text-sm leading-relaxed">{DIWALI.venue}</dd>
              </div>
            </dl>
            <p className="mt-6 border-t border-dashed border-wine/20 pt-4 text-xs text-ink-soft">
              Next listing on {INSTAGRAM_HANDLE}: {NEXT_LISTING.when}, {NEXT_LISTING.venue}. Year not stated on the profile.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-600">The desk</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold text-wine">What you can book</h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">
            Prices are not published. The desk issues a reference, saves the request, and hands it to the team on WhatsApp {WHATSAPP_DISPLAY}.
          </p>
        </div>
        <div className="mt-8 divide-y divide-wine/10 border-y border-wine/10">
          {DESK_OFFERINGS.map((item) => (
            <Link
              key={item.id}
              to={`/book?offer=${item.id}`}
              className="group grid gap-2 py-5 sm:grid-cols-[180px_1fr_auto] sm:items-center"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">{item.lane}</span>
              <span>
                <span className="font-display text-2xl font-bold text-wine group-hover:text-brand-600">{item.name}</span>
                <span className="mt-1 block text-sm text-ink-soft">{item.detail}</span>
              </span>
              <span className="text-sm font-bold text-wine">Book →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-blush">
        <div className="mx-auto grid max-w-6xl gap-px bg-wine/10 px-4 py-16 sm:grid-cols-3 sm:px-6">
          {LANES.map((lane) => (
            <article key={lane.id} className="bg-blush p-6">
              <p className="font-display text-5xl font-extrabold text-brand-600/30">{lane.index}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-wine">{lane.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{lane.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
        <img src={LOGO_TRANSPARENT} alt="" className="mx-auto h-56 w-auto bg-wine p-6" />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-600">{ABOUT.since}</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-wine">Rising Talents</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{ABOUT.lead}</p>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">{ABOUT.mottoLine}</p>
          <Link to="/about" className="mt-6 inline-flex text-sm font-bold text-brand-600">
            The organisation →
          </Link>
        </div>
      </section>

      <section className="bg-wine text-paper">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/50">Awards</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold">Nominations are open</h2>
            <p className="mt-3 max-w-xl text-sm text-white/70">
              Categories and criteria are shared on request — they are not listed publicly.
            </p>
          </div>
          <Link to="/awards" className="rounded-full bg-paper px-5 py-3 text-sm font-bold text-wine">
            Nominate
          </Link>
        </div>
      </section>
    </>
  );
}
