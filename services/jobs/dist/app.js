import express from 'express';
import jobRoutes from './routes/job.ts';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use("/api/job", jobRoutes);
export default app;
