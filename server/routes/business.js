import express from 'express';
import Business from '../controllers/business';
import query from '../middlewares/query';
import { profileValidator, reviewValidator } from '../validator';

const router = express.Router();

// create a business route
router.post('/businesses', profileValidator, (req, res) => {
  new Business(req, res).createBusiness();
});

// fetch a business
router.get('/businesses/:businessId', (req, res) => {
  new Business(req, res).getBusiness();
});

// fetch all businesses
router.get('/businesses', query, (req, res) => {
  new Business(req, res).getAllBusiness();
});

// update a business
router.put('/businesses/:businessId', profileValidator, (req, res) => {
  new Business(req, res).updateBusiness();
});

// delete a business
router.delete('/businesses/:businessId', (req, res) => {
  new Business(req, res).deleteBusiness();
});

// add a review to a business
router.post('/businesses/:businessId/reviews', reviewValidator, (req, res) => {
  new Business(req, res).createReview();
});

// fetch all reviews for a business
router.get('/businesses/:businessId/reviews', (req, res) => {
  new Business(req, res).getReviews();
});

export default router;
