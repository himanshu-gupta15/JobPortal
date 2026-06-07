// import ErrorHandler from "../utils/errorHandler.ts";
// import { TryCatch } from "../utils/TryCatch.ts";
// import bcrypt from "bcrypt";
// import { sql } from "../utils/db.ts";
// import axios from "axios";
// export const registerUser=TryCatch(async(req,res)=>{
//     const {name,email,password,phoneNumber,role,bio} =req.body;
//     if(!name || !email || !password || !phoneNumber || !role){
//         throw new ErrorHandler(400,"Please fill all details");
//     }

//     const existingUser=await sql`SELECT user_id FROM users WHERE email=${email}`;

//     if(existingUser.length>0){
//         throw new ErrorHandler(409,"User with this email already exisits");

//     }

//     const hashPassword=await bcrypt.hash(password,10);

//     let registeredUser;
//     if(role==="recruiter"){
//         const [user]=await sql`INSERT INTO users(name,email,password,phone_number,role,bio) VALUES(${name},${email},${hashPassword},${phoneNumber},${role},${bio}) RETURNING user_id,name,email,phone_number,role,created_at`;
//         registeredUser=user;
//     }else if(role==="jobseeker"){
//         const file=req.file;
//         if(!file){
//             throw new ErrorHandler(400,"Resume file is required for jobseekers");
//         }
//         const fileBuffer=getBuffer(file);
//         if(!fileBuffer || !fileBuffer.content){
//             throw new ErrorHandler(500,"Failed to generate buffer") 
//         }

//         const {data}=await axios.post(`{process.env.UPLOAD_SERVICE}/api/utils/upload`,{
//             buffer:fileBuffer.content
//         });
//         const [user]=await sql`INSERT INTO users(name,email,password,phone_number,role,bio,resume,resume_pulic_id) VALUES(${name},${email},${hashPassword},${phoneNumber},${role},${bio},${data.url},${data.public_id}) RETURNING user_id,name,email,phone_number,role,bio,resume,created_at`;
//     }
//     res.json({email})
// })

import type { Request, Response } from "express";

import ErrorHandler from "../utils/errorHandler.ts";
import { TryCatch } from "../utils/TryCatch.ts";

import bcrypt from "bcrypt";
import { sql } from "../utils/db.ts";
import axios from "axios";
import jwt from "jsonwebtoken";
import { publishToTopic } from "../producer.ts";
import { forgotPasswordTemplate } from "../template.ts"
import { redishClient } from "../index.ts";

export const registerUser = TryCatch(
  async (req: Request, res: Response) => {
    console.log(req.body)
     
    const {
      name,
      email,
      password,
      phoneNumber,
      role,
      bio
    } = req.body;

    if (!name || !email || !password || !phoneNumber || !role) {
      throw new ErrorHandler(
        "Please fill all details",
        400
      );
    }

    const existingUser =
      await sql`
        SELECT user_id
        FROM users
        WHERE email=${email}
      `;

    if (existingUser.length > 0) {
      throw new ErrorHandler(
        "User with this email already exists",
        409
      );
    }

    const hashPassword =
      await bcrypt.hash(password, 10);

    let registeredUser;

    if (role === "recruiter") {

      const [user] = await sql`
        INSERT INTO users(
          name,
          email,
          password,
          phone_number,
          role,
          bio
        )
        VALUES(
          ${name},
          ${email},
          ${hashPassword},
          ${phoneNumber},
          ${role},
          ${bio}
        )
        RETURNING
          user_id,
          name,
          email,
          phone_number,
          role,
          created_at
      `;

      registeredUser = user;
     
    } else if (role === "jobseeker") {

      const file = req.file;

      if (!file) {
        throw new ErrorHandler(
          "Resume file is required",
          400
        );
      }
     console.log(file)
      const base64Buffer =
        file.buffer.toString("base64");
  
      const { data } = await axios.post(
        `${process.env.UPLOAD_SERVICE}/api/utils/upload`,
        {
          buffer: base64Buffer
        }
      );

      const [user] = await sql`
        INSERT INTO users(
          name,
          email,
          password,
          phone_number,
          role,
          bio,
          resume,
          resume_public_id
        )
        VALUES(
          ${name},
          ${email},
          ${hashPassword},
          ${phoneNumber},
          ${role},
          ${bio},
          ${data.url},
          ${data.public_id}
        )
        RETURNING
          user_id,
          name,
          email,
          phone_number,
          role,
          bio,
          resume,
          created_at
      `;

      registeredUser = user;
    }

   const token = jwt.sign(
  { id: registeredUser?.user_id },
  process.env.JWT_SEC as string,{
    expiresIn:"15d",
  }
);

return res.status(201).json({
  success: true,
  message: "User Registered",
  token,
  user: registeredUser
});
  }
);

// export const loginUser=TryCatch(async(req,res, next)=>{
//     const {email,password}=req.body;
//     console.log(req.body)

//     if(!email || !password){
//         throw new ErrorHandler("Please fill all details",400);
//     }

//     const user=await sql`
//     SELECT u.user_id,u.name,u.email,u.password,u.phone_number,u.role,u.bio,u.resume,u.profile_pic,u.subscription, ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills FROM users u LEFT JOIN user_skills as ON u.user_id = us.user_id LEFT JOIN user_skills us ON u.user_id = us.user_id
     
//     `;

//     if( user.length===0){
//         throw new ErrorHandler(400,"Invalid credentials");


//     }

//     const userObject=user[0];
//     const matchPassword=await bcrypt.compare(password,userObject?.password);
//     if(!matchPassword){
//           throw new ErrorHandler(400,"Invalid credentials");
//     }
//    userObject.skills=userObject?.skills ||[];

//    delete  userObject?.password;
//       const token = jwt.sign(
//   { id: registeredUser?.user_id },
//   process.env.JWT_SEC as string,{
//     expiresIn:"15d",
//   }
// );

// return res.status(201).json({
//   success: true,
//   message: "User Logged in",
//   userObject,
//   token,
  
// });

// })

export const loginUser = TryCatch(
  async (req, res, next) => {

    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      throw new ErrorHandler(
        "Please fill all details",
        400
      );
    }

    const user = await sql`
      SELECT
        u.user_id,
        u.name,
        u.email,
        u.password,
        u.phone_number,
        u.role,
        u.bio,
        u.resume,
        u.profile_pic,
        u.subscription,

        ARRAY_AGG(s.name)
        FILTER (
          WHERE s.name IS NOT NULL
        ) as skills

      FROM users u

      LEFT JOIN user_skills us
      ON u.user_id = us.user_id

      LEFT JOIN skills s
      ON us.skill_id = s.skill_id

      WHERE u.email = ${email}

      GROUP BY u.user_id;
    `;

    if (user.length === 0) {
      throw new ErrorHandler(
        "Invalid credentials",
        400
      );
    }

    const userObject = user[0];

    const matchPassword =
      await bcrypt.compare(
        password,
        userObject.password
      );

    if (!matchPassword) {
      throw new ErrorHandler(
        "Invalid credentials",
        400
      );
    }

    userObject.skills =
      userObject.skills || [];

    delete userObject.password;

    const token = jwt.sign(
      { id: userObject.user_id },
      process.env.JWT_SEC as string,
      {
        expiresIn: "15d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "User Logged in",
      user: userObject,
      token,
    });
  }
);

export const forgotPassword=TryCatch(async(req,res)=>{
  const {email}=req.body;
  if(!email){
    throw new ErrorHandler(400,"email is required");

  }

  const users=await sql`
  SELECT user_id,name,email FROM users WHERE email=${email}`;
  if(users.length==0){
    return res.json({
      message:"If a user with this email exists, a password reset link will be sent"
    });
  }
  const user=users[0];
  const resetToken=jwt.sign(
    {
    email:user?.email,
    type:"reset",
  },
  process.env.JWT_SEC as string,
  {expiresIn:"15m"}
 );
 const resetLink=`${process.env.Frontend_Url}/reset/${resetToken}`
 await redishClient.set(`forgot:${email}`,resetToken,{
  EX:9000
 })
 const message={
  to:email,
  subject:"RESET YOU Password -hireheaven",
  html:forgotPasswordTemplate(resetLink),

 };
 publishToTopic("send-mail",message);

 res.json({
  message:"If a user with this email exists, a password reset link will be sent"
 })

  
})

export const resetPassword = TryCatch(async (req, res) => {
  const token = decodeURIComponent(req.params.token);

  const { password } = req.body;

  let decoded: any;

  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SEC as string
    );
  } catch (error: any) {
    console.log(error);

    throw new ErrorHandler(400, error.message);
  }

  const email = decoded.email;

  const storedToken = await redisClient.get(`forgot:${email}`);

  if (!storedToken || storedToken !== token) {
    throw new ErrorHandler(400, "Token has expired");
  }

  const users = await sql`
    SELECT user_id 
    FROM users 
    WHERE email = ${email}
  `;

  if (users.length === 0) {
    throw new ErrorHandler(404, "User not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`
    UPDATE users
    SET password = ${hashedPassword}
    WHERE email = ${email}
  `;

  await redisClient.del(`forgot:${email}`);

  res.json({
    message: "Password changed successfully",
  });
});