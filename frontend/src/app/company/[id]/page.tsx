// 'use client'
// import { useParams } from 'next/navigation'
// import React, { useEffect, useRef, useState } from 'react'
// import Cookies from 'js-cookie';
// import { job_service, useAppData } from '@/context/AppContext';
// import axios from 'axios';
// import { setInCacheMap } from 'next/dist/client/components/segment-cache/cache-map';
// import { Company, Job } from '@/type';
// import Loading from '@/components/loading';
// import { Card } from '@/components/ui/card';
// import { Briefcase, Building2, CheckCircle, Clock, DollarSign, Eye, FileText, Globe, Laptop, Link, MapPin, Pencil, Plus, Trash2, Users, Users, XCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import toast from 'react-hot-toast';
// import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// function CompanyPage() {
//     const {id}=useParams();
//     const token=Cookies.get("token");

//     const {user,isAuth}=useAppData();
//     const [loading,setLoading]=useState(false);
//     const [company,setCompany]=useState<Company |null>(null); 
//     async function fetchCompany(){
//         try{
//             setLoading(true);
//             const {data}=await axios.get(`${job_service}/api/company/${id}`)
//            setCompany(data);
//         }catch(error){
//             console.log(error);
//         }finally{
//             setLoading(false);
//         }
//     }

//     useEffect(()=>{   
//         fetchCompany();
//     },[id])

//     if(loading)return <Loading/>

//     const isRecruiterOwner=
//     user && company && user.user_id===company.recruiter_id;
//     const [isUpdatedModalOpen,setIsUpdatedModalOpen]=useState(false);
    

//     const addModalRef=useRef<HTMLButtonElement>(null);
//     const updateModalRef=useRef<HTMLButtonElement>(null);

//     const [title,setTitle]=useState("");
//     const [description,setDescription]=useState("");
//     const[role,setRole]=useState("");
//     const [salary,setSalary]=useState("");
//     const[location,setLocation]=useState("");
//     const [job_type,setjob_type]=useState("");
//     const [work_location,setWork_location]=useState("");
//     const [openings,setOpenings]=useState("");
//     const [is_active,setIs_active]=useState(true);
//     const [btnLoading,setBtnLoading]=useState(false);
//     const [selectedJob,setSelectedJob]=useState<Job | null>(null);

//     const clearInput=()=>{
//         setTitle("");
//         setDescription("");
//         setRole("");
//         setSalary("");
//         setLocation("");
//         setjob_type("");
//         setWork_location("");
//         setOpenings("");
//         setIs_active(true);
//     }

//     const addJobHandler=async()=>{
//         setBtnLoading(true);
//         try{
//              const jobData={ title,description,role,salary:Number(salary),location, openings:Number(openings),job_type,work_location,company_id:id,}
//              await axios.post(`$[job_service}/api/job/new`,jobData,{
//                 headers:{
//                     Authorization:`Bearer ${token}`,
//                 }
//                 })
//                 toast.success("New job posted successfully");
//                 fetchCompany();
//                 clearInput();
//                 addModalRef.current?.click();
//         }catch(error:any){
//             console.log(error);
//             toast.error(error.response.data.message);
//         }finally{
//             setBtnLoading(false);
//         }
//     }

//     const deleteHandler=async(jobId:number)=>{
//         setBtnLoading(true);
//         if(confirm("Are you sure you want to delete this job?")){
//             try{

//                 await axios.delete(`${job_service}/api/job/${jobId}`,{
//                     headers:{
//                         Authorization:`Bearer ${token}`,
//                     },
//                 });
//                 toast.success("Job deleted successfully");
//                 fetchCompany();
//             }catch(error:any){
                  
//             toast.error(error.response.data.message);
//             }finally{
//                 setBtnLoading(false);
//             }
//         }
//     }

//     const handleOpenUpdateModal=(job:Job)=>{
//         setSelectedJob(job);
//         setTitle(job.title);
//         setDescription(job.description);
//         setRole(job.role);
//         setSalary( String(job.salary||""));
//         setLocation(job.location ||"");
//         setjob_type(job.job_type);
//         setWork_location(job.work_location);
//         setOpenings(String(job.openings));
//         setIs_active(job.is_active);
//         updateModalRef.current?.click();
//     }

//     const handleCloseUpdateModal=()=>{
//         setIsUpdatedModalOpen(false);
//         setSelectedJob(null);
//         clearInput();
//     }

//     const updateJobHandler=async()=>{
//         if(!selectedJob)return;
//         setBtnLoading(true);
//         try{

//              const updateData={ title,description,role,salary:Number(salary),location, openings:Number(openings),job_type,work_location,is_active}
//              await axios.put(`${job_service}/api/job/${selectedJob.job_id}`,updateData,{
//                 headers:{
//                     Authorization:`Bearer ${token}`,

//                 }
//              })
//              toast.success("Job updated successfully");
//                 fetchCompany();
//                 handleCloseUpdateModal();   
//         }catch(error:any){
//             toast.error(error.response.data.message);
//         }finally{
//             setBtnLoading(false);
//         }
//     }


//   return (
//     <div className='min-h-screen bg-secondary/30'>
//         {company &&(
//             <div className='max-w-6xl mx-auto px-4 py-8'>
//                 <Card className='overflow-hidden shadow-lg border-2 mb-8'>
//                    <div className='h-32 bg-blue-600'>

//                    </div>
//                     <div className='px-8 pb-8'>
//                       <div className='flex flex-col md:flex-row gap-6 item-start md:items-end mt-16'>
//                         <div className='w-32 h-32 rounded-2xl border-4 border-background overflow-hidden shadow-xl bg-background shring-0'>
//                             <img src={company.logo} alt='' className='w-full h-full object-cover'/>

//                         </div>

//                         <div className='flex-1 md:mb-4'>
//                             <h1 className='text-3xl font-bold mb-2'> {company.name}</h1>
//                             <p className='text-base leading-relaxed opacity-80 max-w-3xl'>{company.description}</p>

//                         </div>
//                         <Link href={company.website} target="_blank" className='md:mb-4 '>
//                             <Button className='gap-2'>
//                                 <Globe size={16}/>
//                                 Visit Website
//                             </Button>
//                         </Link>

//                       </div>
//                     </div>

                   
//                 </Card>
//                <Dialog>
//               <Card className='shadow-lg border-2 overflow-hidden'>
//                 <div className='bg-blue-600 border-b p-6'>
//                    <div className='flex items-center justify-between flex-wrap gap-4'>
//                     <div className='flex items-center gap-3'>
//                         <div className='h-10 w-10 rounded-lg bg-blue-100 dard:bg-blue-900 flex items-center justify-center'>
//                             <Briefcase size={16} className='text-blue-600'/>
//                         </div>
//                     </div>

//                     <h2 className='text-2xl font-bold'>Open Position</h2>
//                     <p className='text-sm opacity-70'>{company.jobs?.length || 0} active job
//                         {company.jobs?.length !==1 ? "s" :""}

//                     </p>
//                    </div>
//                 </div>

//                 {isRecruiterOwner &&(
//                    <>
//                    <DialogTrigger asChild>
//                     <Button className='gap-2'>
//                         <Plus size={18}/>
//                         Post New Job 
//                     </Button>
//                    </DialogTrigger>

//                    <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
//                     <DialogHeader>
//                         <DialogTitle className='text-2xl flex items-center gap-2'>
//                             Post a new Job
//                         </DialogTitle>
//                     </DialogHeader>
//                       <div className='space-y-5 py-4'>
                    
//                     <div className='space-y-2'>
//                        <Label htmlFor='title' className='text-sm font-medium items-center gap-2'>
//                         <Briefcase size={16}/> Job Title</Label>

//                         <Input type='text' id='title' placeholder='Enter job title' className='h-11' value={title} onChange={(e)=>setTitle(e.target.value)}/>

                       
//                     </div>

//                      <div className='space-y-2'>
//                        <Label htmlFor='description' className='text-sm font-medium items-center gap-2'>
//                         <FileText  size={16}/> Job Description</Label>

//                         <Input type='text' id='description' placeholder='Enter job description' className='h-11' value={description} onChange={(e)=>setDescription(e.target.value)}/>

                       
//                     </div>

//                      <div className='space-y-2'>
//                        <Label htmlFor='role' className='text-sm font-medium items-center gap-2'>
//                         <Globe size={16}/> Job Role</Label>

//                         <Input type='text' id='role' placeholder='Enter job role' className='h-11' value={role} onChange={(e)=>setRole(e.target.value)}/>

                       
//                     </div>

//                      <div className='space-y-2'>
//                        <Label htmlFor='salary' className='text-sm font-medium items-center gap-2'>
//                         <DollarSign size={16}/> Job Salary</Label>

//                         <Input type='number' id='salary' placeholder='Enter job salary' className='h-11 cursor-pointer' value={salary} onChange={(e)=>setSalary(e.target.value)}/>

                       
//                     </div>


//                       <div className='space-y-2'>
//                        <Label htmlFor='openings' className='text-sm font-medium items-center gap-2'>
//                         <Users size={16}/> Job Openings</Label>

//                         <Input type='number' id='openings' placeholder='Enter number of openings' className='h-11 cursor-pointer' value={openings} onChange={(e)=>setOpenings(e.target.value)}/>

                       
//                     </div>


//                       <div className='space-y-2'>
//                        <Label htmlFor='location' className='text-sm font-medium items-center gap-2'>
//                         <MapPin size={16}/> Location</Label>

//                         <Input type='text' id='location' placeholder='Enter job location' className='h-11 cursor-pointer' value={location} onChange={(e)=>setLocation(e.target.value)}/>

                       
//                     </div>

//                     <div className='grid md:grid-cols-2 gap-4'>
//                         <div className='space-y-2'>
//                            <Label htmlFor='job_type' className='text-sm font-medium flex items-center gap-1'>
//                             <Clock size={16}/> Job Type

//                            </Label>
//                            <Select value={job_type} onValueChange={setjob_type}>
//                             <SelectTrigger className='h-11'>
//                                 <SelectValue placeholder="Select job type"/>
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="full-time">Full-Time</SelectItem>
//                                 <SelectItem value="part-time">Part-Time</SelectItem>
//                                 <SelectItem value="contract">Contract</SelectItem>
//                                 <SelectItem value="internship">Internship</SelectItem>
//                             </SelectContent>
//                            </Select>
//                         </div>

//                                    <div className='space-y-2'>
//                            <Label htmlFor='work_location' className='text-sm font-medium flex items-center gap-1'>
//                             <Laptop size={16}/> Work Location

//                            </Label>
//                            <Select value={work_location} onValueChange={setWork_location}>
//                             <SelectTrigger className='h-11'>
//                                 <SelectValue placeholder="Select work location"/>
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="On-site">On-Site</SelectItem>
//                                 <SelectItem value="Remote">Remote</SelectItem>
//                                 <SelectItem value="Hybrid">Hybrid </SelectItem>
//                             </SelectContent>
//                            </Select>
//                         </div>

//                     </div>
//                 </div>

//                 <DialogFooter>
//                     <DialogClose asChild>
//                    <Button ref={addModalRef} variant={"outline"}>
//                     Cancel
//                    </Button>
//                     </DialogClose>
//                     <Button disabled={btnLoading} onClick={addJobHandler} className='gap-2'>
//                         {btnLoading ? "Posting job ...": "Post Job"}
//                     </Button>
//                 </DialogFooter>
//                    </DialogContent>
//                    </>   
//                 )}

//                 <div className='p-6'>
//                    {company.jobs && company.jobs.length > 0 ? (
//   <div className="space-y-4">
//     {company.jobs.map((j, index) => {
//       return (
//         <div
//           key={index}
//           className="p-5 rounded-lg border-2 hover:border-blue-500 transition-all bg-background"
//         >
//           <div className="flex items-start justify-between gap-4 flex-wrap">
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-3 mb-3 flex-wrap">
//                 <h3 className="text-xl font-semibold">
//                   {j.title}
//                 </h3>
//                 <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${j.is_active ? "bg-green-100 dark:bg-green-900/30 text-green-600":"bg-gray-100 dark:bg-gray-800 text-gray-600"}`}>
//                 {j.is_active? <CheckCircle size={14}/>: <XCircle size={14}/>}{j.is_active?"Active":"Inactive"}</span>
//               </div>

//               <div className='flex flex-wrap gap-x-6 gap-y-3 text-sm'>
//                 <div className='flex items-center gap-2 opacity-70'>
//                   <Building2 size={16}/>
//                   <span>{j.role}</span>
//                 </div>
//                 <div className='flex items-center gap-2 opacity-70'>DollarSign size={16} <span>
                   
//                     {j.salary
//                     ? `₹ ${j.salary.toLocaleString()}` : "Not Disclosed"}</span>
//               </div>

//               <div className='flex items-center gap-2 opacity-70'>
//                 <MapPin size={16}/>
//                 <span>{j.location}</span>
//               </div>
//               <div className='flex items-center gap-2 opacity-70'>
//                 <Laptop size={16}/>
//                 <span>{j.work_location} ({j.job_type})</span>
//               </div>
//               <div className='flex items-center gap-2 opacity-70'>
//                 <Users size={16}/>
//                 <span>{j.openings} vacancies</span>
//               </div>
//             </div>
//           </div>

//           <div className='flex items-center gap-2'>
//             <Link href={`/jobs/${j.job_id}`}>
//             <Button variant={"outline"} size={"sm"} className='gap-2'>
//                 <Eye size={16}/>
//                 View
//               </Button>
//             </Link>

//             {
//                 isRecruiterOwner &&(
//                   <>
//                   <Button onClick={()=>handleOpenUpdateModal(j)} variant={"outline"} size={"sm"} className='gap-2'>
//                     <Pencil size={16} />
//                     Edit
//                   </Button>
                 
//                   </>  
//                 )
//             }
//                </div>
//           </div>
//         </div>
//       );
//     })}
//   </div>
// ) : (
//     <>
//     <div className='text-center py-12'>
//         <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4'>
//             <Briefcase className='opacity-40' size={32}/>

//         </div>
//         <p className='text-base opacity-70 mb-2'>
//             No jobs posted yet
//         </p>
//     </div>
//     </>
// )}
//                 </div>
//               </Card>
//                </Dialog>

//                <Dialog open={isUpdatedModalOpen} onOpenChange={setIsUpdatedModalOpen}>
//                   <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
//                     <DialogHeader>
//                         <DialogTitle className='text-2xl flex items-center gap-2'>
//                             Update Job
//                         </DialogTitle>
//                     </DialogHeader>
//                       <div className='space-y-5 py-4'>
                    
//                     <div className='space-y-2'>
//                        <Label htmlFor='title' className='text-sm font-medium items-center gap-2'>
//                         <Briefcase size={16}/> Job Title</Label>

//                         <Input type='text' id='title' placeholder='Enter job title' className='h-11' value={title} onChange={(e)=>setTitle(e.target.value)}/>

                       
//                     </div>

//                      <div className='space-y-2'>
//                        <Label htmlFor='description' className='text-sm font-medium items-center gap-2'>
//                         <FileText  size={16}/> Job Description</Label>

//                         <Input type='text' id='description' placeholder='Enter job description' className='h-11' value={description} onChange={(e)=>setDescription(e.target.value)}/>

                       
//                     </div>

//                      <div className='space-y-2'>
//                        <Label htmlFor='role' className='text-sm font-medium items-center gap-2'>
//                         <Globe size={16}/> Job Role</Label>

//                         <Input type='text' id='role' placeholder='Enter job role' className='h-11' value={role} onChange={(e)=>setRole(e.target.value)}/>

                       
//                     </div>

//                      <div className='space-y-2'>
//                        <Label htmlFor='salary' className='text-sm font-medium items-center gap-2'>
//                         <DollarSign size={16}/> Job Salary</Label>

//                         <Input type='number' id='salary' placeholder='Enter job salary' className='h-11 cursor-pointer' value={salary} onChange={(e)=>setSalary(e.target.value)}/>

                       
//                     </div>


//                       <div className='space-y-2'>
//                        <Label htmlFor='openings' className='text-sm font-medium items-center gap-2'>
//                         <Users size={16}/> Job Openings</Label>

//                         <Input type='number' id='openings' placeholder='Enter number of openings' className='h-11 cursor-pointer' value={openings} onChange={(e)=>setOpenings(e.target.value)}/>

                       
//                     </div>


//                       <div className='space-y-2'>
//                        <Label htmlFor='location' className='text-sm font-medium items-center gap-2'>
//                         <MapPin size={16}/> Location</Label>

//                         <Input type='text' id='location' placeholder='Enter job location' className='h-11 cursor-pointer' value={location} onChange={(e)=>setLocation(e.target.value)}/>

                       
//                     </div>

//                     <div className='grid md:grid-cols-2 gap-4'>
//                         <div className='space-y-2'>
//                            <Label htmlFor='job_type' className='text-sm font-medium flex items-center gap-1'>
//                             <Clock size={16}/> Job Type

//                            </Label>
//                            <Select value={job_type} onValueChange={setjob_type}>
//                             <SelectTrigger className='h-11'>
//                                 <SelectValue placeholder="Select job type"/>
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="full-time">Full-Time</SelectItem>
//                                 <SelectItem value="part-time">Part-Time</SelectItem>
//                                 <SelectItem value="contract">Contract</SelectItem>
//                                 <SelectItem value="internship">Internship</SelectItem>
//                             </SelectContent>
//                            </Select>
//                         </div>

//                                    <div className='space-y-2'>
//                            <Label htmlFor='work_location' className='text-sm font-medium flex items-center gap-1'>
//                             <Laptop size={16}/> Work Location

//                            </Label>
//                            <Select value={work_location} onValueChange={setWork_location}>
//                             <SelectTrigger className='h-11'>
//                                 <SelectValue placeholder="Select work location"/>
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="On-site">On-Site</SelectItem>
//                                 <SelectItem value="Remote">Remote</SelectItem>
//                                 <SelectItem value="Hybrid">Hybrid </SelectItem>
//                             </SelectContent>
//                            </Select>
//                         </div>

//                         <div className='space-y-2'>
//                             <Label htmlFor='update-is_active' className='text-sm font-medium flex items-center gap-2'>{is_active ? <CheckCircle size={16} className='text-green-600'/>:(
//                                 <XCircle size={16} className=' text-gray-50'
//                             />)}

//                             </Label> 

//                              <Select value={is_active?"true":"false"} onValueChange={value=>setIs_active(value==="true")}>
//                             <SelectTrigger className='h-11'>
//                                 <SelectValue placeholder="Select Status"/>
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="true">Active</SelectItem>
//                                 <SelectItem value="false">Inactive</SelectItem>
//                             </SelectContent>
//                            </Select>

//                         </div>



//                     </div>
//                 </div>

//                 <DialogFooter>
//                     <DialogClose asChild>
//                    <Button ref={addModalRef} variant={"outline"}>
//                     Cancel
//                    </Button>
//                     </DialogClose>
//                     <Button disabled={btnLoading} onClick={updateJobHandler} className='gap-2'>
//                         {btnLoading ? "Updating job ...": "Update Job"}
//                     </Button>
//                 </DialogFooter>
//                    </DialogContent>
//                </Dialog>


//             </div>
//         )}
//     </div>
//   )
// }

// export default CompanyPage

'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { job_service, useAppData } from '@/context/AppContext';
import axios from 'axios';
import { Company, Job } from '@/type';
import Loading from '@/components/loading';
import { Card } from '@/components/ui/card';
import { 
  Briefcase, 
  Building2, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Eye, 
  FileText, 
  Globe, 
  Laptop, 
  MapPin, 
  Pencil, 
  Plus, 
  Trash2, 
  Users, 
  XCircle 
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

function CompanyPage() {
    const { id } = useParams();
    const token = Cookies.get("token");

    const { user } = useAppData();
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState<Company | null>(null); 
    const [isUpdatedModalOpen, setIsUpdatedModalOpen] = useState(false);

    const addModalRef = useRef<HTMLButtonElement>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [role, setRole] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [job_type, setjob_type] = useState("");
    const [work_location, setWork_location] = useState("");
    const [openings, setOpenings] = useState("");
    const [is_active, setIs_active] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    async function fetchCompany() {
        try {
            setLoading(true);
            const { data } = await axios.get(`${job_service}/api/job/company/${id}`);
            setCompany(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {   
        if (id) fetchCompany();
    }, [id]);

    if (loading) return <Loading />;

    const isRecruiterOwner = user && company && user.user_id === company.recruiter_id;

    const clearInput = () => {
        setTitle("");
        setDescription("");
        setRole("");
        setSalary("");
        setLocation("");
        setjob_type("");
        setWork_location("");
        setOpenings("");
        setIs_active(true);
    };

    const addJobHandler = async () => {
        setBtnLoading(true);
        try {
            const jobData = { 
                title, 
                description, 
                role, 
                salary: Number(salary), 
                location, 
                openings: Number(openings), 
                job_type, 
                work_location, 
                company_id: id 
            };
            await axios.post(`${job_service}/api/job/new`, jobData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success("New job posted successfully");
            fetchCompany();
            clearInput();
            addModalRef.current?.click();
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setBtnLoading(false);
        }
    };

    const deleteHandler=async(jobId:number)=>{
        setBtnLoading(true);
        if(confirm("Are you sure you want to delete this job?")){
            try{

                await axios.delete(`${job_service}/api/job/${jobId}`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                });
                toast.success("Job deleted successfully");
                fetchCompany();
            }catch(error:any){
                  
            toast.error(error.response.data.message);
            }finally{
                setBtnLoading(false);
            }
        }
    }


    const handleOpenUpdateModal = (job: Job) => {
        setSelectedJob(job);
        setTitle(job.title);
        setDescription(job.description);
        setRole(job.role);
        setSalary(String(job.salary || ""));
        setLocation(job.location || "");
        setjob_type(job.job_type);
        setWork_location(job.work_location);
        setOpenings(String(job.openings));
        setIs_active(job.is_active);
        setIsUpdatedModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdatedModalOpen(false);
        setSelectedJob(null);
        clearInput();
    };

    const updateJobHandler = async () => {
        if (!selectedJob) return;
        setBtnLoading(true);
        try {
            const updateData = { 
                title, 
                description, 
                role, 
                salary: Number(salary), 
                location, 
                openings: Number(openings), 
                job_type, 
                work_location, 
                is_active 
            };
            await axios.put(`${job_service}/api/job/${selectedJob.job_id}`, updateData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success("Job updated successfully");
            fetchCompany();
            handleCloseUpdateModal();   
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-secondary/30'>
            {company && (
                <div className='max-w-6xl mx-auto px-4 py-8'>
                    <Card className='overflow-hidden shadow-lg border-2 mb-8'>
                        <div className='h-32 bg-blue-600'></div>
                        <div className='px-8 pb-8'>
                            <div className='flex flex-col md:flex-row gap-6 items-start md:items-end mt-16'>
                                <div className='w-32 h-32 rounded-2xl border-4 border-background overflow-hidden shadow-xl bg-background shrink-0'>
                                    <img src={company.logo} alt='' className='w-full h-full object-cover' />
                                </div>

                                <div className='flex-1 md:mb-4'>
                                    <h1 className='text-3xl font-bold mb-2'>{company.name}</h1>
                                    <p className='text-base leading-relaxed opacity-80 max-w-3xl'>{company.description}</p>
                                </div>
                                {company.website && (
                                    <Link href={company.website} target="_blank" className='md:mb-4'>
                                        <Button className='gap-2'>
                                            <Globe size={16} />
                                            Visit Website
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </Card>

                    <Dialog>
                        <Card className='shadow-lg border-2 overflow-hidden'>
                            <div className='bg-blue-600 border-b p-6 text-white'>
                                <div className='flex items-center justify-between flex-wrap gap-4'>
                                    <div className='flex items-center gap-3'>
                                        <div className='h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center'>
                                            <Briefcase size={16} className='text-blue-600' />
                                        </div>
                                        <div>
                                            <h2 className='text-2xl font-bold'>Open Positions</h2>
                                            <p className='text-sm opacity-70'>
                                                {company.jobs?.length || 0} active job{company.jobs?.length !== 1 ? "s" : ""}
                                            </p>
                                        </div>
                                    </div>

                                    {isRecruiterOwner && (
                                        <DialogTrigger asChild>
                                            <Button variant="secondary" className='gap-2'>
                                                <Plus size={18} />
                                                Post New Job 
                                            </Button>
                                        </DialogTrigger>
                                    )}
                                </div>
                            </div>

                            {isRecruiterOwner && (
                                <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
                                    <DialogHeader>
                                        <DialogTitle className='text-2xl flex items-center gap-2'>
                                            Post a new Job
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className='space-y-5 py-4'>
                                        <div className='space-y-2'>
                                            <Label htmlFor='title' className='text-sm font-medium flex items-center gap-2'>
                                                <Briefcase size={16} /> Job Title
                                            </Label>
                                            <Input type='text' id='title' placeholder='Enter job title' className='h-11' value={title} onChange={(e) => setTitle(e.target.value)} />
                                        </div>

                                        <div className='space-y-2'>
                                            <Label htmlFor='description' className='text-sm font-medium flex items-center gap-2'>
                                                <FileText size={16} /> Job Description
                                            </Label>
                                            <Input type='text' id='description' placeholder='Enter job description' className='h-11' value={description} onChange={(e) => setDescription(e.target.value)} />
                                        </div>

                                        <div className='space-y-2'>
                                            <Label htmlFor='role' className='text-sm font-medium flex items-center gap-2'>
                                                <Globe size={16} /> Job Role
                                            </Label>
                                            <Input type='text' id='role' placeholder='Enter job role' className='h-11' value={role} onChange={(e) => setRole(e.target.value)} />
                                        </div>

                                        <div className='space-y-2'>
                                            <Label htmlFor='salary' className='text-sm font-medium flex items-center gap-2'>
                                                <DollarSign size={16} /> Job Salary
                                            </Label>
                                            <Input type='number' id='salary' placeholder='Enter job salary' className='h-11' value={salary} onChange={(e) => setSalary(e.target.value)} />
                                        </div>

                                        <div className='space-y-2'>
                                            <Label htmlFor='openings' className='text-sm font-medium flex items-center gap-2'>
                                                <Users size={16} /> Job Openings
                                            </Label>
                                            <Input type='number' id='openings' placeholder='Enter number of openings' className='h-11' value={openings} onChange={(e) => setOpenings(e.target.value)} />
                                        </div>

                                        <div className='space-y-2'>
                                            <Label htmlFor='location' className='text-sm font-medium flex items-center gap-2'>
                                                <MapPin size={16} /> Location
                                            </Label>
                                            <Input type='text' id='location' placeholder='Enter job location' className='h-11' value={location} onChange={(e) => setLocation(e.target.value)} />
                                        </div>

                                        <div className='grid md:grid-cols-2 gap-4'>
                                            <div className='space-y-2'>
                                                <Label htmlFor='job_type' className='text-sm font-medium flex items-center gap-1'>
                                                    <Clock size={16} /> Job Type
                                                </Label>
                                                <Select value={job_type} onValueChange={setjob_type}>
                                                    <SelectTrigger className='h-11'>
                                                        <SelectValue placeholder="Select job type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Full-time">Full-Time</SelectItem>
                                                        <SelectItem value="Part-time">Part-Time</SelectItem>
                                                        <SelectItem value="Contract">Contract</SelectItem>
                                                        <SelectItem value="Internship">Internship</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className='space-y-2'>
                                                <Label htmlFor='work_location' className='text-sm font-medium flex items-center gap-1'>
                                                    <Laptop size={16} /> Work Location
                                                </Label>
                                                <Select value={work_location} onValueChange={setWork_location}>
                                                    <SelectTrigger className='h-11'>
                                                        <SelectValue placeholder="Select work location" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="On-site">On-Site</SelectItem>
                                                        <SelectItem value="Remote">Remote</SelectItem>
                                                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button ref={addModalRef} variant="outline">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button disabled={btnLoading} onClick={addJobHandler} className='gap-2'>
                                            {btnLoading ? "Posting job ..." : "Post Job"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            )}

                            <div className='p-6'>
                                {company.jobs && company.jobs.length > 0 ? (
                                    <div className="space-y-4">
                                        {company.jobs.map((j, index) => (
                                            <div key={index} className="p-5 rounded-lg border-2 hover:border-blue-500 transition-all bg-background">
                                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                            <h3 className="text-xl font-semibold">{j.title}</h3>
                                                            <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${j.is_active ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-red-100 dark:bg-red-900/30 text-red-600"}`}>
                                                                {j.is_active ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                                                {j.is_active ? "Active" : "Inactive"}
                                                            </span>
                                                        </div>

                                                        <div className='flex flex-wrap gap-x-6 gap-y-3 text-sm'>
                                                            <div className='flex items-center gap-2 opacity-70'>
                                                                <Building2 size={16} />
                                                                <span>{j.role}</span>
                                                            </div>
                                                            <div className='flex items-center gap-2 opacity-70'>
                                                                <DollarSign size={16} /> 
                                                                <span>{j.salary ? `₹ ${j.salary.toLocaleString()}` : "Not Disclosed"}</span>
                                                            </div>
                                                            <div className='flex items-center gap-2 opacity-70'>
                                                                <MapPin size={16} />
                                                                <span>{j.location}</span>
                                                            </div>
                                                            <div className='flex items-center gap-2 opacity-70'>
                                                                <Laptop size={16} />
                                                                <span>{work_location} ({job_type})</span>
                                                            </div>
                                                            <div className='flex items-center gap-2 opacity-70'>
                                                                <Users size={16} />
                                                                <span>{j.openings} vacancies</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center gap-2'>
                                                        <Link href={`/jobs/${j.job_id}`}>
                                                            <Button variant="outline" size="sm" className='gap-2'>
                                                                <Eye size={16} />
                                                                View
                                                            </Button>
                                                        </Link>

                                                        {isRecruiterOwner && (
                                                            <>
                                                            <Button onClick={() => handleOpenUpdateModal(j)} variant="outline" size="sm" className='gap-2'>
                                                                <Pencil size={16} />
                                                                Edit
                                                            </Button>
                                                           
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='text-center py-12'>
                                        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4'>
                                            <Briefcase className='opacity-40' size={32} />
                                        </div>
                                        <p className='text-base opacity-70 mb-2'>No jobs posted yet</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </Dialog>

                    <Dialog open={isUpdatedModalOpen} onOpenChange={setIsUpdatedModalOpen}>
                        <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
                            <DialogHeader>
                                <DialogTitle className='text-2xl flex items-center gap-2'>
                                    Update Job
                                </DialogTitle>
                            </DialogHeader>
                            <div className='space-y-5 py-4'>
                                <div className='space-y-2'>
                                    <Label htmlFor='update-title' className='text-sm font-medium flex items-center gap-2'>
                                        <Briefcase size={16} /> Job Title
                                    </Label>
                                    <Input type='text' id='update-title' placeholder='Enter job title' className='h-11' value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='update-description' className='text-sm font-medium flex items-center gap-2'>
                                        <FileText size={16} /> Job Description
                                    </Label>
                                    <Input type='text' id='update-description' placeholder='Enter job description' className='h-11' value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='update-role' className='text-sm font-medium flex items-center gap-2'>
                                        <Globe size={16} /> Job Role
                                    </Label>
                                    <Input type='text' id='update-role' placeholder='Enter job role' className='h-11' value={role} onChange={(e) => setRole(e.target.value)} />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='update-salary' className='text-sm font-medium flex items-center gap-2'>
                                        <DollarSign size={16} /> Job Salary
                                    </Label>
                                    <Input type='number' id='update-salary' placeholder='Enter job salary' className='h-11' value={salary} onChange={(e) => setSalary(e.target.value)} />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='update-openings' className='text-sm font-medium flex items-center gap-2'>
                                        <Users size={16} /> Job Openings
                                    </Label>
                                    <Input type='number' id='update-openings' placeholder='Enter number of openings' className='h-11' value={openings} onChange={(e) => setOpenings(e.target.value)} />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='update-location' className='text-sm font-medium flex items-center gap-2'>
                                        <MapPin size={16} /> Location
                                    </Label>
                                    <Input type='text' id='update-location' placeholder='Enter job location' className='h-11' value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>

                                <div className='grid md:grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                        <Label htmlFor='update-job_type' className='text-sm font-medium flex items-center gap-1'>
                                            <Clock size={16} /> Job Type
                                        </Label>
                                        <Select value={job_type} onValueChange={setjob_type}>
                                            <SelectTrigger className='h-11'>
                                                <SelectValue placeholder="Select job type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="full-time">Full-Time</SelectItem>
                                                <SelectItem value="part-time">Part-Time</SelectItem>
                                                <SelectItem value="contract">Contract</SelectItem>
                                                <SelectItem value="internship">Internship</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className='space-y-2'>
                                        <Label htmlFor='update-work_location' className='text-sm font-medium flex items-center gap-1'>
                                            <Laptop size={16} /> Work Location
                                        </Label>
                                        <Select value={work_location} onValueChange={setWork_location}>
                                            <SelectTrigger className='h-11'>
                                                <SelectValue placeholder="Select work location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="On-site">On-Site</SelectItem>
                                                <SelectItem value="Remote">Remote</SelectItem>
                                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className='space-y-2 col-span-2'>
                                        <Label htmlFor='update-is_active' className='text-sm font-medium flex items-center gap-2'>
                                            Status Status
                                        </Label> 
                                        <Select value={is_active ? "true" : "false"} onValueChange={(value) => setIs_active(value === "true")}>
                                            <SelectTrigger className='h-11'>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Active</SelectItem>
                                                <SelectItem value="false">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button variant="outline" onClick={handleCloseUpdateModal}>
                                    Cancel
                                </Button>
                                <Button disabled={btnLoading} onClick={updateJobHandler} className='gap-2'>
                                    {btnLoading ? "Updating job ..." : "Update Job"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </div>
    );
}

export default CompanyPage;