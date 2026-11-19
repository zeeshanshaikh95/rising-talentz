import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" noIndex />
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="font-display text-7xl font-extrabold text-brand-600">404</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-wine">That page is not on the bill.</h1>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="mark-fill rounded-full px-5 py-3 text-sm font-bold text-white">Home</Link>
          <Link to="/book" className="rounded-full border border-wine/20 px-5 py-3 text-sm font-bold text-wine">Book</Link>
        </div>
      </div>
    </>
  );
}
