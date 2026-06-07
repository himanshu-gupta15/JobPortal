import express from 'express';
import dotenv from 'dotenv';
import routes from './routes.js';
import cors from 'cors'
import {v2 as cloudinary} from 'cloudinary';
import { startSendmailConsumer } from './consumer.js';


dotenv.config();

startSendmailConsumer();
// console.log(process.env.CLOUDINARY_CLOUD_NAME);
// console.log(process.env.CLOUDINARY_API_KEY);
// console.log(process.env.CLOUDINARY_API_SECRET);
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudApiKey = process.env.CLOUDINARY_API_KEY;
const cloudApiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !cloudApiKey || !cloudApiSecret) {
    throw new Error('Missing Cloudinary environment variables');
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudApiKey,
    api_secret: cloudApiSecret

});
const app=express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}))
app.use("/api/utils",routes);
app.listen(process.env.PORT,()=>{
    console.log(`Utils service is running on http://localhost:${process.env.PORT}`);
})