import crypto from 'node:crypto';
import { z } from 'zod';
import { Booking, BOOKING_EVENTS, BOOKING_OFFERINGS, BOOKING_STATUSES } from '../models/booking.model.js';
import { ApiError } from '../middleware/errors.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const bookingInputSchema = z.object({
  offeringId: z.enum(BOOKING_OFFERINGS),
  eventId: z.enum(BOOKING_EVENTS),
  name: z.string().trim().min(2, 'Name is required').max(80),
  phone: z
    .string()
    .trim()
    .min(8, 'Phone is required')
    .max(20)
    .regex(/^[0-9+\-\s()]{8,20}$/, 'Enter a valid phone number'),
  city: z.string().trim().max(80).default(''),
  organisation: z.string().trim().max(120).default(''),
  quantity: z.coerce.number().int().min(1).max(50).default(1),
  note: z.string().trim().max(1000).default(''),
});

const statusSchema = z.object({
  status: z.enum(BOOKING_STATUSES),
});

function makeReference(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.randomBytes(4);
  let code = 'RT';
  for (const byte of bytes) code += alphabet[byte % alphabet.length];
  return code;
}

/** POST /api/bookings — public desk. Returns only the caller's ticket. */
export const createBooking = asyncHandler(async (req, res) => {
  const parsed = bookingInputSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, 'Check the booking form', parsed.error.flatten().fieldErrors);
  }

  let booking = null;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      booking = await Booking.create({
        ...parsed.data,
        reference: makeReference(),
        status: 'new',
        source: 'website',
      });
      break;
    } catch (err) {
      const code = (err as { code?: number }).code;
      if (code === 11000) continue;
      throw err;
    }
  }

  if (!booking) {
    throw new ApiError(503, 'Could not issue a booking reference. Try again.');
  }

  res.status(201).json({
    booking: {
      reference: booking.reference,
      offeringId: booking.offeringId,
      eventId: booking.eventId,
      name: booking.name,
      phone: booking.phone,
      city: booking.city,
      organisation: booking.organisation,
      quantity: booking.quantity,
      note: booking.note,
      status: booking.status,
      saved: true,
    },
  });
});

/** GET /api/admin/bookings */
export const listAdminBookings = asyncHandler(async (_req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 }).limit(300).lean();
  res.json({ bookings });
});

/** PUT /api/admin/bookings/:id */
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, 'Invalid status', parsed.error.flatten().fieldErrors);
  }
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: parsed.data.status },
    { new: true }
  ).lean();
  if (!booking) throw new ApiError(404, 'Booking not found');
  res.json({ booking });
});

/** DELETE /api/admin/bookings/:id */
export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id).lean();
  if (!booking) throw new ApiError(404, 'Booking not found');
  res.json({ ok: true });
});
