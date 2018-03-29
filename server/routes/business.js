import express from 'express';
import BusinessController from '../controllers/BusinessController';
import query from '../middlewares/query';
import auth from '../middlewares/auth';
import { profileValidator, reviewValidator } from '../validator';

const router = express.Router();

// create a business route
router.post('/businesses', auth, profileValidator, BusinessController.create);

// fetch a business
router.get('/businesses/:businessId', BusinessController.get);

// fetch all businesses
router.get('/businesses', query, BusinessController.getAll);

// update a business
router.put('/businesses/:businessId', auth, profileValidator, BusinessController.update);

// delete a business
router.delete('/businesses/:businessId', auth, BusinessController.delete);

// add a review to a business
router.post('/businesses/:businessId/reviews', auth, reviewValidator, BusinessController.createReview);

// fetch all reviews for a business
router.get('/businesses/:businessId/reviews', BusinessController.getReviews);

export default router;
