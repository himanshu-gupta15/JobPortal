// // import express from 'express'
// // import {registerUser} from "../controllers/auth.ts";
// // const router=express.Router()

// // router.post("/register",registerUser);

// // export default router;



// import express from "express";
// import multer from "multer";

// import { registerUser } from "../controllers/auth.ts";

// const authRoutes = express.Router();

// const upload = multer({
//   dest: "uploads/",
// });

// authRoutes.post(
//   "/register",
//   upload.single("file"),
//   registerUser
// );


// export default authRoutes;


import express from "express";
import { forgotPassword, loginUser, registerUser, resetPassword } from "../controllers/auth.ts";
import uploadFile from "../middleware/multer.ts";

const router = express.Router();

router.post(
  "/register",
  uploadFile,
  registerUser
);
router.post("/login",loginUser)
router.post("/forgot",forgotPassword)
router.post("/reset/:token",resetPassword);

export default router;