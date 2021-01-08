import express from 'express';
const router = express();

import { userById } from '../controllers/user_controller.js'
import { getAllUsers, getUserById,requireSignin, isAdmin, isAuth } from '../controllers/auth_controller.js';

router.get('/secret', requireSignin(), (req, res) => {
  res.json({
      user: 'got here yay'
  });
});

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);


// routes
router.param("userId", userById);


export default router;