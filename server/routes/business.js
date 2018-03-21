import express from 'express';
import business from '../controllers/business';
import query from '../middlewares/query';
import { profileValidator, reviewValidator } from '../validator';

const router = express.Router();

// create a business route
router.post('/businesses', profileValidator, business.createBusiness);

// fetch a business
router.get('/businesses/:businessId', business.getBusiness);

// fetch all businesses
router.get('/businesses', query, business.getAllBusiness);

// update a business
router.put('/businesses/:businessId', profileValidator, business.updateBusiness);

// delete a business
router.delete('/businesses/:businessId', business.deleteBusiness);

// add a review to a business
router.post('/businesses/:businessId/reviews', reviewValidator, business.createReview);

// fetch all reviews for a business
router.get('/businesses/:businessId/reviews', business.getReviews);

export default router;
