import { useEffect, useState } from 'react';
import { adminApi, type BookingRecord } from '@/api/endpoints';
import { useToast } from '@/context/ToastContext';

const STATUSES = ['new', 'contacted', 'confirmed', 'closed'] as const;

export function AdminBookingsPage() {
  const toast = useToast().toast;
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    try {
      const res = await adminApi.listBookings();
      setBookings(res.bookings);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function changeStatus(id: string, status: BookingRecord['status']) {
    try {
      const res = await adminApi.updateBooking(id, status);
      setBookings((prev) => prev.map((b) => (b._id === id ? res.booking : b)));
      toast('Status updated');
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Update failed', 'error');
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await adminApi.deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast('Deleted');
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Delete failed', 'error');
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Bookings</h1>
          <p className="text-sm text-ink-soft">Requests from the desk, newest first.</p>
        </div>
        <button type="button" className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-stone-50" onClick={load}>
          Refresh
        </button>
      </div>

      {loading ? <p className="text-sm text-ink-soft">Loading…</p> : null}
      {error ? <p className="text-sm text-brand-600">{error}</p> : null}

      {!loading && bookings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-sm text-ink-soft">
          No bookings yet. They will appear here once the desk is used.
        </div>
      ) : null}

      <div className="space-y-3">
        {bookings.map((booking) => (
          <article key={booking._id} className="rounded-xl border border-stone-200 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs font-bold text-brand-600">{booking.reference}</p>
                <p className="font-semibold text-ink">{booking.name} · {booking.phone}</p>
                <p className="text-xs text-ink-soft">
                  {booking.offeringId} · {booking.eventId} · qty {booking.quantity}
                  {booking.city ? ` · ${booking.city}` : ''}
                  {booking.organisation ? ` · ${booking.organisation}` : ''}
                </p>
                {booking.note ? <p className="mt-2 text-sm text-ink-soft">{booking.note}</p> : null}
                <p className="mt-2 text-xs text-ink-soft">{new Date(booking.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <select
                  className="rounded-lg border border-stone-200 px-2 py-1 text-xs"
                  value={booking.status}
                  onChange={(e) => changeStatus(booking._id, e.target.value as BookingRecord['status'])}
                >
                  {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <button type="button" className="text-xs font-semibold text-brand-600 hover:underline" onClick={() => remove(booking._id)}>
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
