import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';

export function AwardsPage() {
  return (
    <>
      <Seo
        title="Awards & recognition"
        description="Award nominations are open for the Rising Talents carnival. Categories and criteria are shared on request."
        canonicalPath="/awards"
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-600">Awards & recognition</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-wine sm:text-6xl">Nominations are open.</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Award nominations are open for the carnival. Categories and criteria are shared on request — they are not published on this site, so they are not invented here.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Send a nomination through the booking desk. The team replies on WhatsApp with the categories, the criteria, and the fee if there is one.
        </p>
        <Link to="/book?offer=award" className="mark-fill mt-8 inline-flex rounded-full px-5 py-3 text-sm font-bold text-white">
          Nominate
        </Link>
      </section>
    </>
  );
}
