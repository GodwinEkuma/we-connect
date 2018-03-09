import express from 'express';
import Business from '../controllers/business';

const router = express.Router();

// create a business route
router.post('/business', (req, res) => {
  new Business(req, res).createBusiness();
});

// fetch a business
router.get('/business/:businessId', (req, res) => {
  new Business(req, res).getBusiness();
});

// fetch all businesses
router.get('/business', (req, res) => {
  new Business(req, res).getAllBusiness();
});

// update a business
router.put('/business/:businessId', (req, res) => {
  new Business(req, res).updateBusiness();
});

// delete a business
router.get('/business', (req, res) => {
  new Business(req, res).deleteBusiness();
});

export default router;
