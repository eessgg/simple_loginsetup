import express from 'express';
const router = express();

import {  getAllUsers, getUserById, register, login, signout, requireSignin } from '../controllers/auth_controller.js';
import { userSignupValidator } from '../validator/index.js';
import  {userById} from '../controllers/user_controller.js'

// routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

router.post('/users/register', userSignupValidator, register);
router.post('/users/login', login);
router.get('/users/signout', signout);

router.get('/users/hello', requireSignin(), (req, res) => {
  res.send("hello there.");
});

router.param("userId", userById);


export default router;