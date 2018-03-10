import express from 'express';
import Users from '../controllers/users';
import { signInValidator, signUpValidator } from '../validator';

const router = express.Router();

// signup route
router.post('/auth/signup', signUpValidator, (req, res) => {
  new Users(req, res).signUp();
});

// signup route
router.post('/auth/signin', signInValidator, (req, res) => {
  new Users(req, res).signIn();
});

export default router;
