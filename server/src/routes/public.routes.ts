import { Router } from 'express';
import {
  getCategoryBySlug,
  getPublicSettings,
  getProductBySlug,
  getRelatedProducts,
  listCategories,
  listGallery,
  listProducts,
  listReviews,
  recordAnalyticsEvent,
} from '../controllers/publicController.js';
import { analyticsLimiter, bookingLimiter } from '../middleware/rateLimiters.js';
import { createBooking } from '../controllers/bookingController.js';

const router = Router();

router.get('/products', listProducts);
router.get('/products/:slug', getProductBySlug);
router.get('/products/:slug/related', getRelatedProducts);

router.get('/categories', listCategories);
router.get('/categories/:slug', getCategoryBySlug);

router.get('/reviews', listReviews);
router.get('/gallery', listGallery);
router.get('/settings', getPublicSettings);

router.post('/analytics/events', analyticsLimiter, recordAnalyticsEvent);
router.post('/bookings', bookingLimiter, createBooking);

export default router;
