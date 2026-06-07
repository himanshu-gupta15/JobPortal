import express from 'express';
import dotenv from 'dotenv';
import router from './routes/user.ts';
import cors from 'cors';
dotenv.config();
const app=express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


console.log("PORT",process.env.PORT);
app.use(express.json());
app.use("/api/user", router);

app.listen(process.env.PORT,()=>{
    console.log(`User service is running on http://localhost:${process.env.PORT}`);
})