import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';

/** Basic limiter applied to the whole API. */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

/** Stricter limiter for login attempts. */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { error: 'Too many login attempts, please try again later' },
});

/** Analytics events are unauthenticated, so cap them per IP. */
export const analyticsLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many analytics events' },
});

/** Public booking desk — unauthenticated, so keep it tight. */
export const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many booking attempts. Send the ticket on WhatsApp, or try again shortly.' },
});

/** Uploads are admin-only but still bounded. */
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many uploads, please try again later' },
});

export const trustedOrigins = config.corsOrigins;
