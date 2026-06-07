import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.ts";
import {  connectKafka } from "./producer.ts";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  console.log("HOME HIT");
  res.send("Server Working");
});
connectKafka();

app.use("/api/auth", authRoutes);

export default app;