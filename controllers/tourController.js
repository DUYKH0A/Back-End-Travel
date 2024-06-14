import Review from '../models/Review.js';
import Tour from '../models/Tour.js'
import multer from 'multer';
import sharp from 'sharp';

export const createTour = async (req,res)=>{
    console.log(req.body.photo)
    try {
        const newTour = new Tour(req.body);
        const savedTour = await newTour.save(); 
        res.status(200).json({
            success:true, 
            message:'Successfully created', 
            data:savedTour,
        }); 
    } catch (error) {
        res.status(500).json({
            success:false, 
            message:'Failed to create. Try again', 
            data:error.message, // Trả về thông báo lỗi nếu có
        }); 
    }
};

//update tour
export const updateTour = async (req,res) => {
    
    const id = req.params.id
    try {
        const updateTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        },{new:true}) 

        res
            .status(200)
            .json({
                success:true, 
                message:'Successfully updated', 
                data:updateTour,
            }); 

    } catch (error) {
        res
            .status(500)
            .json({
                success:false, 
                message:'Failed to update', 
                data:savedTour,
            }); 
    }
};

//delete tour
export const deleteTour = async (req,res) => {
    const id = req.params.id

    try {
        await Tour.findByIdAndDelete(id); 
        res
            .status(200)
            .json({
                success:true, 
                message:'Successfully deleted', 
            }); 

    } catch (error) {
        res
            .status(500)
            .json({
                success:false, 
                message:'Failed to delete', 
            }); 
    }
};

//getSingle tour
export const getSingleTour = async (req,res) => {
    const id = req.params.id

    try {
        const tour = await Tour.findById(id).populate("reviews"); 
        res
            .status(200)
            .json({
                success:true, 
                message:'Successfully', 
                data:tour
            }); 

    } catch (error) {
        res
            .status(404)
            .json({
                success:false, 
                message:'not found', 
            }); 
    }
};

//getAll tour
export const getAllTour = async (req,res) => {
    //for pagination
    const page = parseInt(req.query.page);
    try {
        const tours = await Tour.find({}).populate("reviews");
        res
            .status(200)
            .json({
                success:true, 
                count:tours.length,
                message:'Successfully', 
                data:tours
            }); 
    } catch (error) {
        res
            .status(404)
            .json({
                success:false, 
                message:'not found', 
            }); 
    }
};
//get tour by search
export const getTourBySearch = async (req, res) => {
    const tieude = req.query.tieude ? new RegExp(req.query.tieude) : null;
    const maxGroupSize = req.query.maxGroupSize ? parseInt(req.query.maxGroupSize) : null;

    let query = {};

    if (tieude) query.tieude = tieude;
    if (maxGroupSize) query.maxGroupSize = { $gte: maxGroupSize };

    try {
        const tours = await Tour.find(query).populate("reviews");
        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: tours
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'not found',
        });
    }
};


//get featured tour
export const getFeaturedTour = async (req,res) => {

    try {
        const tours = await Tour.find({featured: true}).populate("reviews").limit(8);
        res
            .status(200)
            .json({
                success:true, 
                message:'Successfully', 
                data:tours
            }); 
    } catch (error) {
        res
            .status(404)
            .json({
                success:false, 
                message:'not found', 
            }); 
    }
};

//get tour counts
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        
        res.status(200).json({success: true, data: tourCount});
    } catch (error) {
        res.status(500).json({success: false, message: "failed to fetch"});
        
    }
}
export const getValidTours = async (req, res) => {
    try {
        const currentTime = new Date();

        // Lọc các tour hợp lệ
        const tours = await Tour.find({
            departureDate: { $gte: new Date(currentTime.getTime() + 2 * 24 * 60 * 60 * 1000) },
            $expr: { $gt: ["$maxGroupSize", "$numberOfBookings"] }
        }).populate("reviews");

        res.status(200).json({
            success: true,
            message: 'Successfully fetched valid tours',
            data: tours
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch valid tours',
            error: error.message
        });
    }
};