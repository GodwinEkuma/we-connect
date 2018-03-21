import express from 'express';
import users from '../controllers/users';
import { signInValidator, signUpValidator } from '../validator';

const router = express.Router();

// signup route
router.post('/auth/signup', signUpValidator, users.signUp);

// signup route
router.post('/auth/signin', signInValidator, users.signIn);

export default router;
