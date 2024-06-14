
import express from 'express'
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../controllers/tourController.js';
import { verifyAdmin,verifyAdminOrManager } from '../utils/verifyToken.js';
const router = express.Router()

//create new tour
router.post("/",verifyAdminOrManager, createTour);
//update tour
router.put("/:id",verifyAdminOrManager, updateTour);
//delete tour
router.delete("/:id",verifyAdminOrManager, deleteTour);
//get single tour
router.get("/:id", getSingleTour);
//get all tour
router.get("/", getAllTour);
//get tour by search
router.get("/search/getTourBySearch",getTourBySearch);
router.get("/search/getFeaturedTour",getFeaturedTour);
router.get("/search/getTourCount",getTourCount);


export default router;