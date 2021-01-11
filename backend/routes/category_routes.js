import express from 'express';
const router = express();

import { userById } from '../controllers/user_controller.js'
import { create } from '../controllers/category_controller.js';
import { requireSignin, isAdmin, isAuth } from '../controllers/auth_controller.js';


// routes
router.post("/category/create/:userId", requireSignin(), isAdmin, isAuth, create);


// routes
router.param("userId", userById);

export default router;