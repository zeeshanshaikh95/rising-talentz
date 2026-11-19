import { useState } from 'react';
import { Seo } from '@/components/seo/Seo';
import { bookingApi } from '@/api/endpoints';
import { DIWALI, INSTAGRAM_URL, MAPS_URL, WHATSAPP_DISPLAY, YOUTUBE_URL, defaultEventId, waLink } from '@/lib/event';

export function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Exhibit');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const offeringId = interest === 'Sponsor' ? 'sponsor' : interest === 'Participate' ? 'participant' : interest === 'Exhibit' ? 'stall' : 'enquiry';
    const eventId = defaultEventId();
    const note = message.trim();
    const text = [
      'Hello Rising Talents,',
      '',
      `I am interested in: ${interest}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      note ? `Message: ${note}` : '',
      '',
      `Event on the site: ${DIWALI.name}, ${DIWALI.when}.`,
      'Thank you.',
    ].filter(Boolean).join('\n');

    bookingApi.create({
      offeringId,
      eventId,
      name: name.trim(),
      phone: phone.trim(),
      city: '',
      organisation: '',
      quantity: 1,
      note: `${interest}. ${note}`,
    }).catch(() => undefined);

    setSent(text);
    window.open(waLink(text), '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <Seo title="Talk to the team" description={`Every enquiry is handled on WhatsApp at ${WHATSAPP_DISPLAY}.`} canonicalPath="/contact" />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-600">Contact</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-wine">Talk to the team</h1>
          <p className="mt-4 text-ink-soft">Every enquiry is handled on WhatsApp at {WHATSAPP_DISPLAY}.</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="font-semibold">{DIWALI.venue}</li>
            <li>{DIWALI.when} · {DIWALI.time}</li>
            <li><a className="font-bold text-brand-600" href={MAPS_URL}>Get directions</a></li>
            <li><a className="font-bold text-brand-600" href={INSTAGRAM_URL}>Instagram</a></li>
            <li><a className="font-bold text-brand-600" href={YOUTUBE_URL}>YouTube</a></li>
          </ul>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 border border-wine/10 bg-white p-6">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">Name</span>
            <input className="input mt-1" required value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">Phone</span>
            <input className="input mt-1" required value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">I am interested in</span>
            <select className="input mt-1" value={interest} onChange={(e) => setInterest(e.target.value)}>
              <option>Exhibit</option>
              <option>Sponsor</option>
              <option>Participate</option>
              <option>Something else</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">Message</span>
            <textarea className="input mt-1 min-h-28" value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
          <button type="submit" className="mark-fill w-full rounded-full py-3 text-sm font-bold text-white">Send on WhatsApp</button>
          {sent ? <p className="text-xs text-ink-soft">WhatsApp should have opened with your message. If the desk API is online, a copy was saved too.</p> : null}
        </form>
      </section>
    </>
  );
}
