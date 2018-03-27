import express from 'express';
import BusinessController from '../controllers/BusinessController';
import query from '../middlewares/query';
import auth from '../middlewares/auth';
import { profileValidator, reviewValidator } from '../validator';

const router = express.Router();

// create a business route
router.post('/businesses', auth, profileValidator, BusinessController.createBusiness);

// fetch a business
router.get('/businesses/:businessId', BusinessController.getBusiness);

// fetch all businesses
router.get('/businesses', query, BusinessController.getAllBusiness);

// update a business
router.put('/businesses/:businessId', auth, profileValidator, BusinessController.updateBusiness);

// delete a business
router.delete('/businesses/:businessId', BusinessController.deleteBusiness);

// add a review to a business
router.post('/businesses/:businessId/reviews', auth, reviewValidator, BusinessController.createReview);

// fetch all reviews for a business
router.get('/businesses/:businessId/reviews', BusinessController.getReviews);

export default router;
