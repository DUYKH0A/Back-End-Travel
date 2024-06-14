import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const itinerarySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  activities: [activitySchema]
});

const tourSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    tieude: {
      type: String,
      required: true,
    },
    transport: {
      type: String,
      required: true,
    },
    hotel: {
      type: Number,
      required: true,
    },
    departureDate: {
      type: Date,
        required: true,
    },
    Placeofdeparture: {
      type: String,
      required: true,
    },
    photo:{
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    numberOfBookings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      required: true,
    },
    itinerary: [itinerarySchema]
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
