import express from 'express';
import { checkOut, paymentVerification } from '../controllers/payment.ts';
import { isAuth } from '../middleware/user.ts';

const router=express.Router();

router.post("/checkout",isAuth,checkOut);
router.post("/verify",isAuth,paymentVerification);


export default router;