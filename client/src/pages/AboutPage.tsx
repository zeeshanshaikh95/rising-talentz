import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { LOGO_ORIGINAL } from '@/lib/brand';
import { ABOUT, DIWALI, INSTAGRAM_HANDLE, INSTAGRAM_URL, YOUTUBE_URL } from '@/lib/event';

export function AboutPage() {
  return (
    <>
      <Seo
        title="About Rising Talents"
        description={ABOUT.lead}
        canonicalPath="/about"
      />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div className="bg-white p-8 shadow-card">
          <img src={LOGO_ORIGINAL} alt="Rising Talents — we create future star" className="mx-auto h-auto w-full max-w-sm" />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-600">{ABOUT.since}</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-wine sm:text-5xl">Rising Talents</h1>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">{ABOUT.lead}</p>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">{ABOUT.mottoLine}</p>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            The {DIWALI.name} brings exhibitors, sponsors and performers together on {DIWALI.when} at {DIWALI.venue}.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold">
            <a href={INSTAGRAM_URL} className="text-brand-600">{INSTAGRAM_HANDLE}</a>
            <a href={YOUTUBE_URL} className="text-brand-600">YouTube</a>
            <Link to="/book" className="text-wine">Book →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
