import express from 'express';
import authController from '../Controllers/authController';
import auth from '../Middlewares/auth';

const authRouter = express.Router();

authRouter.post('/api/v1/user/signup', authController.signupUser);

authRouter.post('/api/v1/user/login', authController.loginUser);

authRouter.get('/api/v1/user/auth', auth, authController.getUser);

export default authRouter;