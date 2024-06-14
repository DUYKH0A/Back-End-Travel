import express from 'express'
import { verifyAdminOrManager, verifyAdmin, verifyTourManager, verifyUser } from '../utils/verifyToken.js';
import {getBookingsByUser ,createBooking, getAllBooking, getBooking, createPaymentLink } from '../controllers/bookingController.js';
const router = express.Router()

router.post('/',verifyUser, createBooking);
router.get("/:id",verifyUser, getBooking);
router.get('/',verifyAdminOrManager, getAllBooking);
router.get('/user/:userId', verifyUser, getBookingsByUser); // New route to get bookings by user
router.post('/create-payment-link', createPaymentLink);

export default router;