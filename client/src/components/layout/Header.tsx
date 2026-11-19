import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LOGO_TRANSPARENT } from '@/lib/brand';

const LINKS = [
  { to: '/event', label: 'Event' },
  { to: '/book', label: 'Book' },
  { to: '/awards', label: 'Awards' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={LOGO_TRANSPARENT} alt="Rising Talents" className="h-12 w-auto drop-shadow" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/book"
            className="mark-fill hidden rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-soft sm:inline-flex"
          >
            Book a place
          </Link>
          <button
            type="button"
            className="rounded-full border border-white/20 px-3 py-2 text-xs font-bold uppercase tracking-widest text-white lg:hidden"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-navy lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6" aria-label="Mobile">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3 text-lg font-semibold text-white"
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mark-fill mt-4 rounded-full px-4 py-3 text-center text-sm font-bold text-white"
            >
              Book a place
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
