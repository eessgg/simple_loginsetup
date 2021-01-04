import express from 'express';
const router = express();

import {getUsers ,register } from '../controllers/user_controller.js'

router.get('/', getUsers)
router.post('/register', register)

export default router;
