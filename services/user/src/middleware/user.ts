import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { sql } from "../utils/db.ts";

interface User {
  user_id: number;
  name: string;
  email: string;
  phone_number: string;
  role: "jobseeker" | "recruiter";
  bio: string | null;
  resume: string | null;
  resume_public_id: string | null;
  profile_pic: string | null;
  profile_pic_public_id: string | null;
  skills: string[];
  subscription: string | null;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", req.headers.authorization);

    // FIX 1 -> startsWith spelling
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(401).json({
        message: "Authorization header missing or invalid",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    // FIX 2 -> proper type assertion
    const decodedPayload = jwt.verify(
      token,
      process.env.JWT_SEC as string
    ) as JwtPayload;

    if (!decodedPayload || !decodedPayload.id) {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }

    // FIX 3 -> corrected SQL query
    const users = await sql`
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

    const user = users[0] as User;

    user.skills = user.skills || [];

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      message: "Authentication failed. Please login again",
    });
  }
};