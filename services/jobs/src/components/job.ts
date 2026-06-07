// import axios from 'axios';
// import { AuthenticatedRequest } from '../middleware/user.js';

// import getBuffer from '../utils/buffer.js';
// import { sql } from '../utils/db.js';
// import ErrorHandler from '../utils/errorHandler.js';
// import { TryCatch } from '../utils/TryCatch.js';
// import { applicationStatusUpdateTemplate } from '../template.js';
// import { publishToTopic } from '../producer.js';

// export const createCompany = TryCatch(async(req:AuthenticatedRequest,res)=>{
//     const user=req.user;
//     if(!user){
//         throw new ErrorHandler(401,"Authentication required")

//     }
//     if(user.role!=="recruiter"){
//         throw new ErrorHandler(
//             403,
//             "Forbidden:Only recruiters can create a company"
//         );
//     }

//     const {name,description,website}=req.body;
//     if(!name || !description || !website){
//         throw new ErrorHandler(400,"All fields required");
//     }

//     const existingCompanies=await sql`
//     SELECT company_id FROM companies WHERE name=${name}`;

//     if(existingCompanies.length>0){
//         throw new ErrorHandler(
//             409,
//             `A company with the name ${name} already exists`
//         );
//     }
//     const file=req.file;
//     if(!file){
//         throw new ErrorHandler(400,"Company Logo is required");

//     }

//     const fileBuffer=await getBuffer(file);
//     if(!fileBuffer || !fileBuffer.content){
//         throw new ErrorHandler(500,"Failed to create file buffer");
//     }
//     const {data}=await axios.post(
//         `${process.env.UPLOAD_SERVICE}/api/utils/upload`,
//         {buffer:fileBuffer.content}
//     );

//     const [newCompany]=await axios.post(
//         `${process.env.UPLOAD_SERVICE}/api/upload`,
//         {buffer:fileBuffer.content}
//     );
//     const [newCompany]=await sql`INTERT INTO companies (name,description,website,logo,logo_public_id,recruiter_id) VALUES (${name},${description},${website},${data.url},${data.public_id},${req.user?.user_id}) RETURNING *`;

//      res.json({
//         message:"Company created successfully",
//         company:newCompany,
//      })
// })

// export const deletecompany=TryCatch(async(req:AuthenticatedRequest,res)=>{
//     const user=req.user;
//     const {company_id}=req.params;
//     const [company]=await sql`
//     SELECT logo_public_id FROM companies WHERE company_id=${company_id} AND recruiter_id=${user?.user_id}`;

//     if(!company){
//         throw new ErrorHandler(404,"Company not found or you're not authorized to delete it.");
//     }
//     await sql`DELETE FROM companies WHERE company_id=${company_id}`;
    
//     res.json({
//     message:"Company and all associated jobs has been deleted",
//     });

// });

// export const createJob=TryCatch(async(req:AuthenticatedRequest,res)=>{
//     const user=req.user;
//     if(!user){
//         throw new ErrorHandler(401,"Authentication required")

//     }

//     if(user.role!=="recruiter"){
//         throw new ErrorHandler(
//             403,
//             "Forbidden:Only recruiter can create a job"
//         );

//     }
//  const {
//     title,
//     description,
//     salary,
//     location,
//     role,
//     job_type,
//     work_location,
//     company_id,
//     openings,
//  }=req.body;
//  if(!title || !description || !role || !job_type || !work_location || !company_id || !openings){
//     throw new ErrorHandler(400,"All fields are required");
//  }
//  const [company]=await sql`
// SELECT company_id FROM companies WHERE company_id=${company_id} AND recruiter_id=${user?.user_id}`;
// if(!company){
//     throw new ErrorHandler(404,"Company not found");
// }

// const [newJob]=await sql`
// INSERT INTO jobs (title,description,salary,location,role,job_type,work_location,company_id,posted_by_recruiter_id,openings) VALUES (${title},${description},${salary},${location},${role},${job_type},${work_location},${company_id},${user?.user_id},${openings}) RETURNING *`;

// res.json({
//     message:"Job created successfully",
//     job:newJob,
// })
// })

// export const updateJob=TryCatch(async(req:AuthenticatedRequest,res)=>{
//     const user=req.user;
//     if(!user){
//         throw new ErrorHandler(401,"Authentication required")

//     }

//     if(user.role!=="recruiter"){
//         throw new ErrorHandler(
//             403,
//             "Forbidden:Only recruiter can create a job"
//         );

//     }
//  const {
//     title,
//     description,
//     salary,
//     location,
//     role,
//     job_type,
//     work_location,
//     company_id,
//     openings,
//     is_active
//  }=req.body;

//  const [existingJob]=await sql`
//  SELECT posted_by_recruiter_id FROM jobs WHERE job_id=${req.params.jobId} `;

//  if(!existingJob){
//     throw new ErrorHandler(404,"Job not found");

//  }

//  if(existingJob.posted_by_recruiter_id!==user.user_id){
//     throw new ErrorHandler(403,"Forbidden: You are not allowed");
//  }
//  const [updatedJob]=await sql`
//  UPDATE jobs SET title=${title},
//  description=${description},
//  salary=${salary},
//  location=${location},
//  role=${role},
//  job_type=${job_type},
//  work_location=${work_location},
//  company_id=${company_id},
//  openings=${openings},
//  is_active=${is_active}
//  WHERE job_id=${req.params.jobId} RETURNING *`;
 
//  res.json({
//     message:"Job updated successfully",
//     job:updatedJob,
//  })
// })

// export const getAllCompany=TryCatch(
//     async(req:AuthenticatedRequest,res)=>{
//         const companies=await sql ` SELECT * FROM companies WHERE recruiter_id=${req.user?.user_id}`;
//         res.json((companies))
//     }
// )

// export const getCompanyDetails=TryCatch(
//     async(req:AuthenticatedRequest,res)=>{
//         const {id}=req.params;
//         if(!id){
//            throw new ErrorHandler(400,"Company id is required");

//         }

//         const [companyData]=await sql`SELECT C.*, COALESE(
//             (
//                 SELECT json_agg(j.*) FROM jobs j WHERE j.company_id=C.company_id
//             ), '[]'::json
//         ) AS jobs FROM companies C WHERE C.company_id=${id} GROUP BY C.company_id;`;
//          if(!companyData){
//             throw new ErrorHandler(404,"Company not found");
//          }
//          res.json(companyData);
//     }
// )

// export const getAllActiveJobs=TryCatch(
//     async(req:AuthenticatedRequest,res)=>{
//         const {title,location}=req.query as {
//             title?:string;
//             location?:
//             string;
//         }

//         let queryString=`SELECT j.title,j.description,j.salary,j.location,j.job_type,j.role,j.work_location,j.created_at,c.name AS company_name, c.logo AS company_logo. c.company_id AS company_id FROM jobs j JOIN companies c ON j.company_id=c.company_id WHERE j.is_active=true ;`

//         const values=[];
//         let paramIndex=1;

//         if(title){
//             queryString+=`AND j.title ILIKE $${paramIndex}`
//             values.push(`%${title}%`);
//             paramIndex++;
//         }
//         if(location){
//             queryString+=`AND j.location ILIKE $${paramIndex}`
//             values.push(`%${location}%`);
//             paramIndex++;
//         }
//         queryString+="ORDER BY j.created_at DESC";
//         const jobs=(await sql.query(queryString,values)) as any[];
//         res.json(jobs);
//     }

// )

// export const getSingleJob=TryCatch(async(req, res)=>{
//     const [job]=await sql`SELECT * FROM jobs WHERE job_id=${req.params.jobId} `;

//     res.json(job);
// })

// export const getAllApplicationForJob=TryCatch(async(req:AuthenticatedRequest,res)=>{
//     const user=req.user;
//     if(!user){
//         throw new ErrorHandler(401,"Authentication required")
//     }
//     if(user.role!=="recruiter"){
//         throw new ErrorHandler(403,"Forbidden:Only recruiter can access this");
//     }
//     const {jobId}=req.params;
//     const [job]=await sql`SELECT posted_by_recruiter_id FROM jobs WHERE job_id=${jobId}`;

//     if(!job){
//         throw new ErrorHandler(404,"Job not found");
//     }
//     if(job.posted_by_recruiter_id!==user.user_id){
//         throw new ErrorHandler(403,"Forbidden: you are not allowed")
//     }
//     const application=await sql` SELECT * FROM applications WHERE job_id=${jobId} ORDER BY subscribed DESC, applied_at ASC`;
    
//     res.json(application);
// })

// export  const updateApplication=TryCatch(async(req:AuthenticatedRequest,res)=>{
//     const user=req.user;
//     if(!user){
//         throw new ErrorHandler(401,"Authentication required")
//     }
//     if(user.role!=="recruiter"){
//         throw new ErrorHandler(403,"Forbidden:Only recruiter can access this");
//     }
//     const {id}=req.params;
//     const [application]=await sql`SELECT * FROM applicaitons WHERE application_id=${id}`;

//     if(!application){
//         throw new ErrorHandler(404,"Application not found");
//     }
//     const [job]=await sql`SELECT posted_by_recruiter_id, title  FROM jobs WHERE job_id=${application.job_id}`;
//     if(!job){
//         throw new ErrorHandler(404,"no job with this id");
//     }
//     if(job.posted_by_recruiter_id!==user.user_id){
//         throw new ErrorHandler(403,"Forbidden: you are not allowed")
//     }
//     const [updateApplication]=await sql`UPDATE applications SET status=${req.body.status} WHERE application_id=${id} RETURNING *`;
//     const message={
//         to:application.applicant_email,
//         subject:`Application Update-Job portal`,
//         html:applicationStatusUpdateTemplate(job.title)
//     };
//     publishToTopic("send-mail",message).catch((error)=>{
//         console.error("Failed to publish message to kafka",error);

//     })
//     res.json({
//         message:"Application updated",
//         job,
//         updateApplication,
//     })

// });

import axios from "axios";

import type { AuthenticatedRequest } from "../middleware/user";

import getBuffer from "../utils/buffer.ts";
import { sql } from "../utils/db.ts";
import ErrorHandler from "../utils/errorHandler.ts";
import { TryCatch } from "../utils/TryCatch.ts";

import { applicationStatusUpdateTemplate } from "../template.ts";

import { publishToTopic } from "../producer.ts";

/* =======================================================
   CREATE COMPANY
======================================================= */

export const createCompany = TryCatch(
  async (
    req: AuthenticatedRequest,
    res
  ) => {

    const user = req.user;

    if (!user) {

      throw new ErrorHandler(
        401,
        "Authentication required"
      );
    }

    if (user.role !== "recruiter") {

      throw new ErrorHandler(
        403,
        "Only recruiters can create companies"
      );
    }

    const {
      name,
      description,
      website,
    } = req.body;

    if (
      !name ||
      !description ||
      !website
    ) {

      throw new ErrorHandler(
        400,
        "All fields are required"
      );
    }

    const existingCompanies = await sql`

      SELECT company_id
      FROM companies
      WHERE name = ${name}

    `;

    if (existingCompanies.length > 0) {

      throw new ErrorHandler(
        409,
        `Company "${name}" already exists`
      );
    }

    const file = req.file;

    if (!file) {

      throw new ErrorHandler(
        400,
        "Company logo is required"
      );
    }

    const fileBuffer =
      await getBuffer(file);

    if (
      !fileBuffer ||
      !fileBuffer.content
    ) {

      throw new ErrorHandler(
        500,
        "Failed to process file"
      );
    }

    const { data } = await axios.post(
      `${process.env.UPLOAD_SERVICE}/api/utils/upload`,
      {
        buffer: fileBuffer.content,
      }
    );

    const [newCompany] = await sql`

      INSERT INTO companies (
        name,
        description,
        website,
        logo,
        logo_public_id,
        recruiter_id
      )

      VALUES (
        ${name},
        ${description},
        ${website},
        ${data.url},
        ${data.public_id},
        ${user.user_id}
      )

      RETURNING *

    `;

    res.json({
      message:
        "Company created successfully",

      company: newCompany,
    });
  }
);

/* =======================================================
   DELETE COMPANY
======================================================= */

export const deleteCompany = TryCatch(
  async (
    req: AuthenticatedRequest,
    res
  ) => {

    const user = req.user;

    const { company_id } = req.params;

    const [company] = await sql`

      SELECT logo_public_id
      FROM companies
      WHERE company_id = ${company_id}
      AND recruiter_id = ${user?.user_id}

    `;

    if (!company) {

      throw new ErrorHandler(
        404,
        "Company not found or unauthorized"
      );
    }

    await sql`

      DELETE FROM companies
      WHERE company_id = ${company_id}

    `;

    res.json({
      message:
        "Company and associated jobs deleted",
    });
  }
);

/* =======================================================
   CREATE JOB
======================================================= */

export const createJob = TryCatch(
  async (
    req: AuthenticatedRequest,
    res
  ) => {

    const user = req.user;

    if (!user) {

      throw new ErrorHandler(
        401,
        "Authentication required"
      );
    }

    if (user.role !== "recruiter") {

      throw new ErrorHandler(
        403,
        "Only recruiters can create jobs"
      );
    }

    const {
      title,
      description,
      salary,
      location,
      role,
      job_type,
      work_location,
      company_id,
      openings,
    } = req.body;

    if (
      !title ||
      !description ||
      !role ||
      !job_type ||
      !work_location ||
      !company_id ||
      !openings
    ) {

      throw new ErrorHandler(
        400,
        "All fields are required"
      );
    }

    const [company] = await sql`

      SELECT company_id
      FROM companies
      WHERE company_id = ${company_id}
      AND recruiter_id = ${user.user_id}

    `;

    if (!company) {

      throw new ErrorHandler(
        404,
        "Company not found"
      );
    }

    const [newJob] = await sql`

      INSERT INTO jobs (
        title,
        description,
        salary,
        location,
        role,
        job_type,
        work_location,
        company_id,
        posted_by_recruiter_id,
        openings
      )

      VALUES (
        ${title},
        ${description},
        ${salary},
        ${location},
        ${role},
        ${job_type},
        ${work_location},
        ${company_id},
        ${user.user_id},
        ${openings}
      )

      RETURNING *

    `;

    res.json({
      message:
        "Job created successfully",

      job: newJob,
    });
  }
);

/* =======================================================
   UPDATE JOB
======================================================= */

export const updateJob = TryCatch(
  async (
    req: AuthenticatedRequest,
    res
  ) => {

    const user = req.user;

    if (!user) {

      throw new ErrorHandler(
        401,
        "Authentication required"
      );
    }

    if (user.role !== "recruiter") {

      throw new ErrorHandler(
        403,
        "Only recruiters can update jobs"
      );
    }

    const {
      title,
      description,
      salary,
      location,
      role,
      job_type,
      work_location,
      company_id,
      openings,
      is_active,
    } = req.body;

    const [existingJob] = await sql`

      SELECT posted_by_recruiter_id
      FROM jobs
      WHERE job_id = ${req.params.jobId}

    `;

    if (!existingJob) {

      throw new ErrorHandler(
        404,
        "Job not found"
      );
    }

    if (
      existingJob.posted_by_recruiter_id !==
      user.user_id
    ) {

      throw new ErrorHandler(
        403,
        "Unauthorized"
      );
    }

    const [updatedJob] = await sql`

      UPDATE jobs

      SET
        title = ${title},
        description = ${description},
        salary = ${salary},
        location = ${location},
        role = ${role},
        job_type = ${job_type},
        work_location = ${work_location},
        company_id = ${company_id},
        openings = ${openings},
        is_active = ${is_active}

      WHERE job_id = ${req.params.jobId}

      RETURNING *

    `;

    res.json({
      message:
        "Job updated successfully",

      job: updatedJob,
    });
  }
);

/* =======================================================
   GET ALL COMPANIES
======================================================= */

export const getAllCompany = TryCatch(
  async (
    req: AuthenticatedRequest,
    res
  ) => {

    const companies = await sql`

      SELECT *
      FROM companies
      WHERE recruiter_id =
      ${req.user?.user_id}

    `;

    res.json(companies);
  }
);

/* =======================================================
   GET COMPANY DETAILS
======================================================= */

export const getCompanyDetails = TryCatch(
  async (
    req: AuthenticatedRequest,
    res
  ) => {

    const { id } = req.params;

    if (!id) {

      throw new ErrorHandler(
        400,
        "Company ID is required"
      );
    }

    const [companyData] = await sql`

      SELECT
        c.*,

        COALESCE(
          (
            SELECT json_agg(j.*)
            FROM jobs j
            WHERE j.company_id =
            c.company_id
          ),
          '[]'::json
        ) AS jobs

      FROM companies c

      WHERE c.company_id = ${id}

      GROUP BY c.company_id

    `;

    if (!companyData) {

      throw new ErrorHandler(
        404,
        "Company not found"
      );
    }

    res.json(companyData);
  }
);

/* =======================================================
   GET ALL ACTIVE JOBS
======================================================= */

export const getAllActiveJobs = TryCatch(
  async (req, res) => {

    const {
      title,
      location,
    } = req.query as {
      title?: string;
      location?: string;
    };

    let queryString = `

      SELECT
        j.*,
        c.name AS company_name,
        c.logo AS company_logo,
        c.company_id AS company_id

      FROM jobs j

      JOIN companies c
      ON j.company_id = c.company_id

      WHERE j.is_active = true

    `;

    const values: any[] = [];

    let paramIndex = 1;

    if (title) {

      queryString += `
        AND j.title ILIKE $${paramIndex}
      `;

      values.push(`%${title}%`);

      paramIndex++;
    }

    if (location) {

      queryString += `
        AND j.location ILIKE $${paramIndex}
      `;

      values.push(`%${location}%`);

      paramIndex++;
    }

    queryString += `
      ORDER BY j.created_at DESC
    `;

    const jobs =
      (await sql.query(
        queryString,
        values
      )) as any[];

    res.json(jobs);
  }
);

/* =======================================================
   GET SINGLE JOB
======================================================= */

export const getSingleJob = TryCatch(
  async (req, res) => {

    const [job] = await sql`

      SELECT *
      FROM jobs
      WHERE job_id =
      ${req.params.jobId}

    `;

    res.json(job);
  }
);

/* =======================================================
   GET APPLICATIONS FOR JOB
======================================================= */

export const getAllApplicationForJob =
  TryCatch(
    async (
      req: AuthenticatedRequest,
      res
    ) => {

      const user = req.user;

      if (!user) {

        throw new ErrorHandler(
          401,
          "Authentication required"
        );
      }

      if (user.role !== "recruiter") {

        throw new ErrorHandler(
          403,
          "Unauthorized"
        );
      }

      const { jobId } = req.params;

      const [job] = await sql`

        SELECT posted_by_recruiter_id
        FROM jobs
        WHERE job_id = ${jobId}

      `;

      if (!job) {

        throw new ErrorHandler(
          404,
          "Job not found"
        );
      }

      if (
        job.posted_by_recruiter_id !==
        user.user_id
      ) {

        throw new ErrorHandler(
          403,
          "Unauthorized"
        );
      }

      const applications = await sql`

        SELECT *
        FROM applications
        WHERE job_id = ${jobId}
        ORDER BY applied_at DESC

      `;

      res.json(applications);
    }
  );

/* =======================================================
   UPDATE APPLICATION
======================================================= */

export const updateApplication =
  TryCatch(
    async (
      req: AuthenticatedRequest,
      res
    ) => {

      const user = req.user;

      if (!user) {

        throw new ErrorHandler(
          401,
          "Authentication required"
        );
      }

      if (user.role !== "recruiter") {

        throw new ErrorHandler(
          403,
          "Unauthorized"
        );
      }

      const { id } = req.params;

      const [application] = await sql`

        SELECT *
        FROM applications
        WHERE application_id = ${id}

      `;

      if (!application) {

        throw new ErrorHandler(
          404,
          "Application not found"
        );
      }

      const [job] = await sql`

        SELECT
          posted_by_recruiter_id,
          title

        FROM jobs

        WHERE job_id =
        ${application.job_id}

      `;

      if (!job) {

        throw new ErrorHandler(
          404,
          "Job not found"
        );
      }

      if (
        job.posted_by_recruiter_id !==
        user.user_id
      ) {

        throw new ErrorHandler(
          403,
          "Unauthorized"
        );
      }

      const [updatedApplication] =
        await sql`

        UPDATE applications

        SET status =
        ${req.body.status}

        WHERE application_id = ${id}

        RETURNING *

      `;

      const message = {

        to:
          application.applicant_email,

        subject:
          "Application Update - Job Portal",

        html:
          applicationStatusUpdateTemplate(
            job.title
          ),
      };

      publishToTopic(
        "send-mail",
        message
      ).catch((error) => {

        console.error(
          "Failed to publish to Kafka",
          error
        );
      });

      res.json({
        message:
          "Application updated successfully",

        job,

        updatedApplication,
      });
    }
  );