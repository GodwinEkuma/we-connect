import express from 'express';
import UserController from '../controllers/UserController';
import { signInValidator, signUpValidator } from '../validator';

const router = express.Router();

// signup route
router.post('/auth/signup', signUpValidator, UserController.signUp);

// signup route
router.post('/auth/signin', signInValidator, UserController.signIn);

export default router;
