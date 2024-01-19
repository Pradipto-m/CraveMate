import express from 'express';
import authController from '../Controllers/authController';
import auth from '../Middlewares/auth';

const authRouter = express.Router();

authRouter.post('/api/user/signup', authController.signupUser);

authRouter.post('/api/user/login', authController.loginUser);

authRouter.get('/api/user/auth', auth, authController.getUser);

export default authRouter;