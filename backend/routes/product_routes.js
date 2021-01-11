import express from 'express';
const router = express();

import { userById } from '../controllers/user_controller.js'
import { read, create, producBytId, remove, update } from '../controllers/product_controller.js';
import { requireSignin, isAdmin, isAuth } from '../controllers/auth_controller.js';


// routes
router.get("/product/:productId",read);
router.post("/product/create/:userId",requireSignin(), isAdmin, isAuth, create);
router.delete("/product/:productId/:userId",requireSignin(), isAdmin, isAuth, remove);
router.put("/product/:productId/:userId",requireSignin(), isAdmin, isAuth, update);
// routes
router.param("userId", userById);
router.param("productId", producBytId);



export default router;