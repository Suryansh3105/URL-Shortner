import express from 'express';
import controller from '../controllers/auth.controller.js'
import RegisterUserValidate from '../middleware/validateRegister.js';

const router=express.Router();

router.post('/signup',RegisterUserValidate,controller.signUp);

export default router;