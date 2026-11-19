import { Seo } from '@/components/seo/Seo';
import { useApi } from '@/hooks/useApi';
import { publicApi } from '@/api/endpoints';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/event';

export function GalleryPage() {
  const gallery = useApi(() => publicApi.listGallery().then((r) => r.items), []);
  const photos = (gallery.data ?? []).filter((item) => item.image);

  return (
    <>
      <Seo
        title="Gallery"
        description="Photos from Rising Talents, added by the team. Follow the Instagram for the live feed."
        canonicalPath="/gallery"
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-600">Gallery</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold text-wine">From the floor</h1>
        <p className="mt-3 max-w-xl text-sm text-ink-soft">
          Only photos the team uploads in admin appear here. The previous site’s stock frames are not reused.
        </p>

        {photos.length ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((item) => (
              <figure key={item._id} className="bg-wine">
                <img src={item.image} alt={item.caption || 'Rising Talents gallery'} className="aspect-[4/5] w-full object-cover" />
                {item.caption ? <figcaption className="px-3 py-2 text-xs text-white/80">{item.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-dashed border-wine/20 p-8">
            <p className="font-display text-2xl font-bold text-wine">No desk photos yet</p>
            <p className="mt-2 text-sm text-ink-soft">
              Follow {INSTAGRAM_HANDLE} for the current posts. Admin can add real event photos here when they have them.
            </p>
            <a href={INSTAGRAM_URL} className="mt-5 inline-flex text-sm font-bold text-brand-600">Open Instagram →</a>
          </div>
        )}
      </section>
    </>
  );
}
