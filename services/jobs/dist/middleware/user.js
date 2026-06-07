"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_ts_1 = require("../utils/db.ts");
const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // FIX 1 -> startsWith spelling
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            res.status(401).json({
                message: "Authorization header missing or invalid",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        // FIX 2 -> proper type assertion
        const decodedPayload = jsonwebtoken_1.default.verify(token, process.env.JWT_SEC);
        if (!decodedPayload || !decodedPayload.id) {
            res.status(401).json({
                message: "Invalid token",
            });
            return;
        }
        // FIX 3 -> corrected SQL query
        const users = await (0, db_ts_1.sql) `
      SELECT 
        u.user_id,
        u.name,
        u.email,
        u.phone_number,
        u.role,
        u.bio,
        u.resume,
        u.resume_public_id,
        u.profile_pic,
        u.profile_pic_public_id,
        u.subscription,
        ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) AS skills

      FROM users u

      LEFT JOIN user_skills us
      ON u.user_id = us.user_id

      LEFT JOIN skills s
      ON us.skill_id = s.skill_id

      WHERE u.user_id = ${decodedPayload.id}

      GROUP BY u.user_id
    `;
        if (users.length === 0) {
            res.status(401).json({
                message: "User associated with this token no longer exists",
            });
            return;
        }
        const user = users[0];
        user.skills = user.skills || [];
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Authentication failed. Please login again",
        });
    }
};
exports.isAuth = isAuth;
