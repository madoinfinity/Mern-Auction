import express from 'express';
import { login, signup, getUser, updateUser } from '../controllers/User.js';

export const LoginSignupRouter = express.Router();

LoginSignupRouter.post('/LoginUser', login);
LoginSignupRouter.post('/CreateUser', signup);
LoginSignupRouter.get('/GetUsers', getUser);
LoginSignupRouter.post('/UpdateUser', updateUser);
