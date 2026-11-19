import { Link } from 'react-router-dom';
import { LOGO_ORIGINAL } from '@/lib/brand';
import { DIWALI, INSTAGRAM_HANDLE, INSTAGRAM_URL, MAPS_URL, MOTTO, WHATSAPP_DISPLAY, YOUTUBE_URL, waLink } from '@/lib/event';

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white text-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={LOGO_ORIGINAL} alt="Rising Talents" className="h-20 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            {DIWALI.name}. {DIWALI.when}. {DIWALI.venue}.
          </p>
          <p className="mt-3 font-script text-3xl text-brand-600">“{MOTTO}”</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">Desk</p>
          <ul className="mt-4 space-y-2 text-sm font-semibold">
            <li><Link to="/book" className="hover:text-brand-600">Book a place</Link></li>
            <li><Link to="/event" className="hover:text-brand-600">Event bill</Link></li>
            <li><Link to="/awards" className="hover:text-brand-600">Award nomination</Link></li>
            <li><Link to="/contact" className="hover:text-brand-600">Talk to the team</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">Reach</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="font-semibold hover:text-brand-600" href={waLink('Hello Rising Talents, I would like the event details.')}>
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li><a className="hover:text-brand-600" href={INSTAGRAM_URL}>{INSTAGRAM_HANDLE}</a></li>
            <li><a className="hover:text-brand-600" href={YOUTUBE_URL}>YouTube</a></li>
            <li><a className="hover:text-brand-600" href={MAPS_URL}>Directions to Rassaz Ground</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-wine/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-ink-soft sm:px-6">
          <p>Rising Talents · {DIWALI.when}</p>
          <Link to="/admin/login" className="hover:text-wine">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
