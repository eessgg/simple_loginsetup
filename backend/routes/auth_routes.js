import express from 'express';
const router = express();

import {  register, login, logout, requireSignin } from '../controllers/auth_controller.js';
import { userSignupValidator } from '../validator/index.js';
import  { userById } from '../controllers/user_controller.js'

// routes
router.get("/users/logout", logout);
router.post('/users/login', login);
router.post('/users/register', userSignupValidator, register);


router.param("userId", userById);


export default router;