import { TryCatch } from "../utils/TryCatch";

import {AuthenthicatedRequest} from "../middleware/user.ts";
import ErrorHandler from "../utils/errorHandler.ts";
import { sql } from "../utils/db.ts";
import { instance } from "..";


export const checkOut=TryCatch(async(req:AuthenthicatedRequest,res)=>{
    if(!req.user){
        throw new ErrorHandler(401,"No valid User");

    }

    const user_id=req.user.user_id;

    const [user]=await sql `
    SELECT * FROM users WHERE user_id=${user_id}`;

    const subTime=user?.subscription
    ? new Date(user.subscription).getTime()
    :0;

    const now=Date.now();

    const isSubscribed=subTime>now;

    if(isSubscribed){
        throw new ErrorHandler(400,"You already have a subscription");
    }

    const options={
        amount:Number(199*100),
        currency:"INR",
        notes:{
            user_id:user_id.toString(),

        },

    };

    const order=await instance.orders.create(options);
    
    res.status(201).json({
        order,
    });
    });

    export const paymentVerification=TryCatch(async(req:AuthenthicatedRequest,res)=>{
        
        const user=req.user;

        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;

        const body=razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature=crypto.createHmac("sha256",process.env.Razorpay_secret as string)
        .update(body.toString())
        .digest("hex");
    

     const isAuthentic=expectedSignature===razorpay_signature;

     if(isAuthentic){
        const now=new Date();
        const thirtyDays=30*24*64*60*1000;

        const expiryDate=new Date(now.getTime()+thirtyDays);
         
        const [updatedUser]=await sql `UPDATE users SET subscription=${expiryDate} WHERE user_id=${user.user_id} RETURNING *`;
        
        res.json({
            message:"Payment successful",
            updatedUser,
        });
     }else{
        return res.status(400).json({
            message:"Payment Failed"
        });
     }

}    )

   