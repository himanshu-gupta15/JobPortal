// // export interface JobOptions{
// //     title:string;
// //     responsibilities:string;
// //     why:string;

// import { ReactNode } from "react";

// // }

// // export interface skillsToLearn{
// //    title:string;
// //    why:string;
// //    how:string;


// // }

// // export interface SkillCategory{
// //     category:string;
// //     skills:skillsToLearn[];

// // }

// // export interface LearningApproach{
// //     title:string;
// //     points:string[];
// // }

// // export interface CarrerGuideResponse{
// //     summary:string;
// //     jobOptions:JobOptions[];
// //     skillsToLearn:SkillCategory[];
// //     learningApproach:LearningApproach;

// // }

// // export const utils_service="http://localhost:5001"

// export interface JobOptions {
//   title: string;
//   responsibilities: string;
//   why: string;
// }

// export interface SkillToLearn {
//   title: string;
//   why: string;
//   how: string;
// }

// export interface SkillCategory {
//   category: string;
//   skills: SkillToLearn[];
// }

// export interface LearningApproach {
//   title: string;
//   points: string[];
// }

// export interface CareerGuideResponse {
//   summary: string;
//   jobOptions: JobOptions[];
//   skillsToLearn: SkillCategory[];
//   learningApproach: LearningApproach;
// }

// export interface Suggestion{
//     category:string;
//     issue:string;
//     recommendation:string;
//     priority:"high" | "medium" | "low";
// }

// export interface ResumeAnalysisResponse{
//     atsScore:number;
//     scoreBreakdown:ScoreBreakdown;
//     suggestions:Suggestion[];
//     strengths:string[];
//     summary:string;

// }

// export interface User{
//     user_id:number;
//     name:string;
//     email:string;
//     phone_number:string;
//     role:"jobseeker" | "recruiter";
//     bio:string|null;
//     resume:string|null;
//     resume_public_id:string|null;
//     profile_pic :string|null;
//     profile_pic_public_id:string|null;
//     skills:string[]|null;
//     subscription:string|null;

// }
// export interface AppContextType {

//   user: User | null;

//   isAuth: boolean;

//   loading: boolean;

//   btnLoading: boolean;

//   setUser: React.Dispatch<
//     React.SetStateAction<User | null>
//   >;

//   setIsAuth: React.Dispatch<
//     React.SetStateAction<boolean>
//   >;

//   setLoading: React.Dispatch<
//     React.SetStateAction<boolean>
//   >;

//   setBtnLoading: React.Dispatch<
//     React.SetStateAction<boolean>
//   >;

//   logoutUser: () => Promise<void>;
//   updateProfilePic:(formData:any)=>Promise<void>;
//   updateResume:(formData:any)=>Promise<void>;
//     updateUser:(name:string,phoneNumber:string,bio:string)=>Promise<void>;
// }
// export interface AppProviderProps{
//     children:ReactNode;
// }

// export interface AccountProps{
//   user:User;
//   isYourAccount:boolean;

// }
// // export const utils_service =
// //   "http://localhost:5001";


import React, { ReactNode } from "react";

export interface JobOptions {
  title: string;
  responsibilities: string;
  why: string;
}

export interface SkillToLearn {
  title: string;
  why: string;
  how: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillToLearn[];
}

export interface LearningApproach {
  title: string;
  points: string[];
}

export interface CareerGuideResponse {
  summary: string;
  jobOptions: JobOptions[];
  skillsToLearn: SkillCategory[];
  learningApproach: LearningApproach;
}

export interface Suggestion {
  category: string;
  issue: string;
  recommendation: string;
  priority: "high" | "medium" | "low";
}

export interface ScoreBreakdown {
  formatting: number;
  keywords: number;
  experience: number;
  skills: number;
  education: number;
}

export interface ResumeAnalysisResponse {
  atsScore: number;
  scoreBreakdown: ScoreBreakdown;
  suggestions: Suggestion[];
  strengths: string[];
  summary: string;
}

export interface User {
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
  skills: string[] | null;
  subscription: string | null;
}

export interface AppContextType {
  user: User | null;

  isAuth: boolean;

  loading: boolean;

  btnLoading: boolean;

  setUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;

  setIsAuth: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  setLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  setBtnLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  logoutUser: () => Promise<void>;

  updateProfilePic: (
    formData: FormData
  ) => Promise<void>;

  updateResume: (
    formData: FormData
  ) => Promise<void>;

  updateUser: (
    name: string,
    phoneNumber: string,
    bio: string
  ) => Promise<void>;

  addSkill: (
    skill: string,
   setSkill:React.Dispatch<React.SetStateAction<string | "">>
   
  ) => Promise<void>;

 

  removeSkill: (
    skill: string
   
  ) => Promise<void>;

  applyJob: (
    job_id: number
   
  ) => Promise<void>;
 
  applications:Application[]  ;

  fetchApplications:()=>Promise<void>;

  fetchUser: () => Promise<void>;

}

export interface AppProviderProps {
  children: ReactNode;
}

export interface AccountProps {
  user: User;
  isYourAccount: boolean;
}


export interface Job {
  job_id: number;
  title: string;
  salary:string|null;
  location:string |null;
  description:string;
  
  job_type:"Full-time" | "Part-time" | "Contract" | "Internship";
  openings: number;
  role :string;

  work_location :'On-site' | 'Remote' | 'Hybrid';
  company_id :number;
  company_name:string;
  company_logo:string;
  posted_by_recruiter_id :number;
  created_at :string;
  is_active:boolean;
}


export interface Company{
  company_id:string;
  name:string;
  description:string;
  website:string;
  logo:string ;
  logo_public_id:string;
  recruiter_id:number;
  created_st:string;
  jobs?:Job[];
}

type ApplicationStatus='Submitted' | 'Rejected' | 'Hired' ;

export interface Application{
  application_id:number;
  job_id:number;
  applicant_id:number;
  applicant_email:number;
  status:ApplicationStatus;
  resume:string;
  applied_at:string;
  subscribed:boolean;
  job_title:string;
  job_salary:number;
  job_location:string ;

}