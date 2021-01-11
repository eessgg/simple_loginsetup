import express from 'express';
const router = express();

import { userById } from '../controllers/user_controller.js'
import { read, create, categoryById, update, remove , list} from '../controllers/category_controller.js';
import { requireSignin, isAdmin, isAuth } from '../controllers/auth_controller.js';


// routes
router.get("/category/:categoryId", read);
router.get("/categories", list);
router.post("/category/create/:userId", requireSignin(), isAdmin, isAuth, create);
router.put("/category/:categoryId/:userId", requireSignin(), isAdmin, isAuth, update);
router.delete("/category/:categoryId/:userId", requireSignin(), isAdmin, isAuth, remove);



// routes
router.param("categoryId", categoryById);
router.param("userId", userById);

export default router;