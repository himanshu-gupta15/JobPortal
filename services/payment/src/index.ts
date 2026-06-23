import express from 'express';
import dotenv from 'dotenv'
import Razorpay from 'razorpay';
import cors from 'cors';
import router from './routes/payment.ts';

dotenv.config();

export const instance =new Razorpay({
    key_id:process.env.Razorpay_key,
    key_secret:process.env.Razorpay_secret
});

const app = express();

// CORS configuration
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use("/api/payment", router);

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        path: req.path,
    });
});

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
    console.error("Error:", err);
    res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Payment service running on port ${process.env.PORT}`);
});