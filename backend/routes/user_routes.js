import express from 'express';
const router = express();

import { userById } from '../controllers/user_controller.js'
import { requireSignin, isAdmin, isAuth } from '../controllers/auth_controller.js';

router.get('/secret/:userId', requireSignin(), isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  })
})

// routes
router.param("userId", userById);


export default router;