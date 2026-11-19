import mongoose, { Schema, model, type Model } from 'mongoose';

export const BOOKING_OFFERINGS = [
  'stall',
  'sponsor',
  'participant',
  'fashion',
  'talent',
  'award',
  'workshop',
  'enquiry',
] as const;

export const BOOKING_EVENTS = ['diwali-2026', 'next-dec'] as const;
export const BOOKING_STATUSES = ['new', 'contacted', 'confirmed', 'closed'] as const;

export type BookingOffering = (typeof BOOKING_OFFERINGS)[number];
export type BookingEvent = (typeof BOOKING_EVENTS)[number];
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export interface IBooking {
  reference: string;
  offeringId: BookingOffering;
  eventId: BookingEvent;
  name: string;
  phone: string;
  city: string;
  organisation: string;
  quantity: number;
  note: string;
  status: BookingStatus;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    reference: { type: String, required: true, unique: true, index: true },
    offeringId: { type: String, enum: BOOKING_OFFERINGS, required: true },
    eventId: { type: String, enum: BOOKING_EVENTS, required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, default: '', trim: true },
    organisation: { type: String, default: '', trim: true },
    quantity: { type: Number, required: true, min: 1, max: 50 },
    note: { type: String, default: '', trim: true },
    status: { type: String, enum: BOOKING_STATUSES, default: 'new', index: true },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
);

bookingSchema.index({ createdAt: -1 });

export const Booking: Model<IBooking> =
  mongoose.models.Booking ?? model<IBooking>('Booking', bookingSchema);
