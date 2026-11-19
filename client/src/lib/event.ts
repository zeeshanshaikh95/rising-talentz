/**
 * Facts taken from the public Rising Talents event site and Instagram.
 * Nothing here is a guessed price, award category, or inclusion.
 */

export const WHATSAPP_E164 = '918454922897';
export const WHATSAPP_DISPLAY = '+91 84549 22897';
export const INSTAGRAM_URL = 'https://www.instagram.com/rising_talentz_/';
export const INSTAGRAM_HANDLE = '@rising_talentz_';
export const YOUTUBE_URL = 'https://www.youtube.com/@rising_talents';
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Rassaz%20Ground%20Near%20Rassaz%20Mall%20Mira%20Road%20East%20Thane%20Maharashtra%20401107';

export const MOTTO = 'we create future star';

export const ABOUT = {
  lead: 'Rising Talents creates platforms where new talent and growing brands can be seen.',
  mottoLine: 'Our motto — “we create future star” — guides every stage, stall and showcase we build.',
  since: 'Since 2015',
};

export interface EventBill {
  id: 'diwali-2026' | 'next-dec';
  name: string;
  when: string;
  days: string;
  time: string;
  venue: string;
  source: string;
}

export const EVENTS: EventBill[] = [
  {
    id: 'diwali-2026',
    name: 'Rising Talents Diwali Carnival Exhibition & Show',
    when: '24 & 25 October 2026',
    days: 'Saturday & Sunday',
    time: '4:00 PM – 11:00 PM',
    venue: 'Rassaz Ground, Near Rassaz Mall, Mira Road East, Thane – 401107, Maharashtra, India',
    source: 'Published on the Rising Talents event site',
  },
  {
    id: 'next-dec',
    name: 'Next exhibition',
    when: '11, 12 & 13 December',
    days: 'Dates as listed on Instagram',
    time: 'Timing shared on request',
    venue: 'Mira Road, Rassaz Ground',
    source: `Listed on ${INSTAGRAM_HANDLE}. The profile does not state the year.`,
  },
];

export const DIWALI = EVENTS[0];
export const NEXT_LISTING = EVENTS[1];

/** After the published October dates, the booking desk opens on the Instagram listing. */
export function defaultEventId(): EventBill['id'] {
  const cutoff = new Date('2026-10-26T00:00:00+05:30');
  return new Date() >= cutoff ? 'next-dec' : 'diwali-2026';
}

export type OfferingId =
  | 'stall'
  | 'sponsor'
  | 'participant'
  | 'fashion'
  | 'talent'
  | 'award'
  | 'workshop'
  | 'enquiry';

export type Lane = 'exhibit' | 'sponsor' | 'stage' | 'desk';

export interface Offering {
  id: OfferingId;
  lane: Lane;
  name: string;
  /** Wording taken from the event site, not expanded. */
  detail: string;
  unit: string;
}

export const OFFERINGS: Offering[] = [
  {
    id: 'stall',
    lane: 'exhibit',
    name: 'Exhibition Stall',
    detail: 'Book an exhibition stall and present your products to carnival visitors across both festive evenings.',
    unit: 'stalls',
  },
  {
    id: 'sponsor',
    lane: 'sponsor',
    name: 'Sponsorship Package',
    detail: 'Align your brand with a Diwali celebration of talent, culture and commerce through a sponsorship package.',
    unit: 'packages',
  },
  {
    id: 'participant',
    lane: 'stage',
    name: 'Participant Registration',
    detail: 'Register to take part in the show — fashion, talent, workshops and award nominations.',
    unit: 'people',
  },
  {
    id: 'fashion',
    lane: 'stage',
    name: 'Fashion Show Registration',
    detail: 'Register for the fashion show. Categories and the running order are shared on request.',
    unit: 'entries',
  },
  {
    id: 'talent',
    lane: 'stage',
    name: 'Talent Competition Entry',
    detail: 'Enter the talent competition. Categories and criteria are shared on request.',
    unit: 'entries',
  },
  {
    id: 'award',
    lane: 'stage',
    name: 'Award Nomination',
    detail: 'Award nominations are open. Categories and criteria are shared on request.',
    unit: 'nominations',
  },
  {
    id: 'workshop',
    lane: 'stage',
    name: 'Workshop Registration',
    detail: 'Register for a workshop. The schedule is shared on request.',
    unit: 'seats',
  },
  {
    id: 'enquiry',
    lane: 'desk',
    name: 'General enquiry',
    detail: 'Ask the team a question that is not a stall, sponsorship or stage booking.',
    unit: 'notes',
  },
];

export const DESK_OFFERINGS = OFFERINGS.filter((item) => item.id !== 'enquiry');

export const LANES: Array<{ id: Lane; index: string; title: string; text: string }> = [
  {
    id: 'exhibit',
    index: '01',
    title: 'Exhibit',
    text: 'Showcase your brand. Book a stall and present your products across both festive evenings.',
  },
  {
    id: 'sponsor',
    index: '02',
    title: 'Sponsor',
    text: 'Partner with the carnival. Sponsorship options and benefits are confirmed on WhatsApp.',
  },
  {
    id: 'stage',
    index: '03',
    title: 'Take the stage',
    text: 'Fashion, talent, workshops and award nominations. Eligibility is shared when you book.',
  },
];

export function offeringById(id: string): Offering | undefined {
  return OFFERINGS.find((item) => item.id === id);
}

export function eventById(id: string): EventBill | undefined {
  return EVENTS.find((item) => item.id === id);
}

export function waLink(message: string, number = WHATSAPP_E164): string {
  const digits = number.replace(/\D/g, '');
  return `https://wa.me/${digits || WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}

export function resolveWhatsApp(settingsNumber?: string): string {
  const digits = (settingsNumber ?? '').replace(/\D/g, '');
  return digits.length >= 8 ? digits : WHATSAPP_E164;
}

export interface BookingDraft {
  reference: string;
  offeringId: OfferingId;
  eventId: EventBill['id'];
  name: string;
  phone: string;
  city: string;
  organisation: string;
  quantity: number;
  note: string;
}

export function buildBookingMessage(draft: BookingDraft): string {
  const offering = offeringById(draft.offeringId);
  const event = eventById(draft.eventId);
  const lines = [
    'Hello Rising Talents,',
    '',
    `Booking reference: ${draft.reference}`,
    `I want to book: ${offering?.name ?? draft.offeringId}`,
    `Event: ${event?.name ?? draft.eventId}`,
    `When: ${event?.when ?? ''}${event?.days ? ` · ${event.days}` : ''}`,
    `Time: ${event?.time ?? ''}`,
    `Venue: ${event?.venue ?? ''}`,
    '',
    `Name: ${draft.name}`,
    `Phone: ${draft.phone}`,
    draft.city ? `City: ${draft.city}` : '',
    draft.organisation ? `Organisation: ${draft.organisation}` : '',
    `Quantity: ${draft.quantity} ${offering?.unit ?? ''}`.trim(),
    draft.note ? `Note: ${draft.note}` : '',
    '',
    'Please confirm availability and the price. Thank you.',
  ];
  return lines.filter((line) => line !== '').join('\n');
}
