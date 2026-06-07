import express from 'express';
import uploadFile from '../middleware/multer.ts';
import { createCompany, createJob, deleteCompany, getAllActiveJobs, getAllApplicationForJob, getAllCompany, getCompanyDetails, getSingleJob, updateApplication, updateJob } from '../components/job.ts';
import { isAuth } from '../middleware/user.ts';



const router=express.Router();
router.post("/company/new",isAuth,uploadFile,createCompany);
router.delete("/company/:companyId",isAuth,deleteCompany);
router.post("/new",isAuth,createJob);
router.put("/jobId",isAuth,updateJob)
router.get("/company/all",isAuth,getAllCompany);
router.get("/company/:id",getCompanyDetails);
router.get("/all",getAllActiveJobs);
router.get("/:jobId",getSingleJob);
router.get("application/:jobId",isAuth,getAllApplicationForJob);
router.put("/application/:id",isAuth,updateApplication)
export default router;