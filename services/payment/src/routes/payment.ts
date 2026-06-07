import express from 'express';
import { checkOut, paymentVerification } from '../controllers/payment';
import { isAuth } from '../middleware/user';

const router=express.Router();

router.post("/checkout",isAuth,checkOut);
router.post("/verify",isAuth,paymentVerification);


export default router;