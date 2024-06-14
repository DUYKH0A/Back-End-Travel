import Booking from '../models/Booking.js'
import Tour from '../models/Tour.js'
import PayOS from '@payos/node';
const payOS = new PayOS(
    "ef9c936d-102a-4430-83d2-dfc727971d20",
    "9522f606-83f5-4d7a-bdbd-130a8cbca18e",
    "4b9ba8bb8e48adcb7bb13fe509c71d85c68d82d1b5d09128e25b26046a0dd696"
  );
//create new booking
export const createBooking = async(req,res)=>{
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        
        // Tăng số lượng booking trong tour
        await Tour.findByIdAndUpdate(
        req.body.tourId,
        { $inc: { numberOfBookings: req.body.guestSize } }
        );
        
        res.status(200).json({success: true, message: "Your tour is booked", data: savedBooking,});
    } catch (error) {
        res.status(500).json({success: false, message: "internal server error"});

    }
};

//get single booking
export const getBooking = async(req,res)=>{
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);
        res.status(200).json({success: true, message: "successful", data: book});

    } catch (error) {
        res.status(404).json({success: true, message: "not found"});

    }
};

//get all booking
export const getAllBooking = async(req,res)=>{

    try {
        const books = await Booking.find();
        res.status(200).json({success: true, message: "successful", data: books,});

    } catch (error) {
        res.status(500).json({success: true, message: "internal server error"});

    }
};

// Get bookings by user
export const getBookingsByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
      const books = await Booking.find({ userId: userId });
      res.status(200).json({ success: true, message: "Successful", data: books });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

export const createPaymentLink = async (req, res) => {
    try {
        
        const encodedData = encodeURIComponent(JSON.stringify(req.body));
        const body = {
            orderCode: Date.now(),
            amount: 10000,
            description: "Thanh toan don hang",
            buyerName: req.body.fullName,
            buyerPhone: req.body.phone,
            cancelUrl: `${process.env.URL_REACT}/thanh-you?data=${encodedData}`,
            returnUrl: `${process.env.URL_REACT}/cancel`,
        };
        const paymentLink = await payOS.createPaymentLink(body);
        return res.status(200).json({ success: true, paymentLink});
      } catch (error) {
        console.error("Stack Trace:", error.stack);
        res.status(500).json({ success: false, message: "Internal server error" })
      }
};