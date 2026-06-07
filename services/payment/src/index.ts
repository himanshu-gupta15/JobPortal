import express from 'express';
import dotenv from 'dotenv'
import Razorpay from 'razorpay';
import cors from 'cors';

dotenv.config();

export const instance =new Razorpay({
    key_id:process.env.Razorpay_key,
    key_secret:process.env.Razorpay_secret
});

const app = express();
app.use(cors());
app.use(express.json());


app.listen(process.env.PORT,()=>{
    console.log(`Payment service running on port ${process.env.PORT}`);
});