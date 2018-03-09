import express from 'express';
import Users from '../controllers/users';

const router = express.Router();

// signup route
router.post('/auth/signup', (req, res) => {
  new Users(req, res).signUp();
});

// signup route
router.post('/auth/signin', (req, res) => {
  new Users(req, res).signIn();
});

export default router;
