// import { job_service, useAppData } from '@/context/AppContext'
// import React, { useEffect, useRef, useState } from 'react'
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Loading from '@/components/loading';
// import { Card, CardDescription, CardTitle } from '@/components/ui/card';
// import { Briefcase, Building2, Eye, FileText, Globe, Link, Plus, Trash2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Company as CompanyType } from '@/type';

// import { DialogContent, DialogTitle, DialogTrigger,Dialog, DialogHeader, DialogFooter  } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';

// function Company() {
//     const {loading}=useAppData();
//     const addRef=useRef<HTMLButtonElement| null>(null);

//     const openDialog=()=>{
//         addRef.current?.click();
//     }

//     const [name,setName]=useState("")
//      const [description,setDescription]=useState("")
//       const [website,setWebsite]=useState("")
//        const [logo,setLogo]=useState<File | null>(null)
//         const [btnLoading,setBtnLoading]=useState(false)
//          const [companies,setCompanies]=useState<CompanyType[]>([])
//          const [companyLoading,setCompanyLoading]=useState(true);
//          const clearData=()=>{
//             setName("");
//             setDescription("")
//             setWebsite("");
//             setLogo(null)
//          }
//          const token=Cookies.get("token")
//          async function fetchCompanies(){
//             try{

//                 const {data}=await axios.get(`${job_service}/api/job/company/all`,{
//                     headers:{
//                         Authorization:`Bearer ${token}`,
//                     },
//                 })
//                 setCompanies(data);
//             }catch(error:any){
//                 console.log(error);
//             }finally{
//                 setCompanyLoading(false)
//             }
//          }

//          async function addCompanyHandler(){
//             if(!name || !description || !website || !logo){
//                 return alert("Please Provide all details");
//             }
//             const formData=new FormData()

//             formData.append("name",name);
//             formData.append("description",description);
//             formData.append("website",website);
//             formData.append("logo",logo);

//             try{  

//                 setBtnLoading(true);
//                 const {data}=await axios.post(`${job_service}/api/job/company/new`,formData,{
//                     headers:{
//                         Authorization:`Bearer ${token}`,
//                     },
//                 });

//                 toast.success(data.message);
//                 clearData();
//                 fetchCompanies()

//             }catch (error: any) {
//   console.log(error);

//   toast.error(
//     error?.response?.data?.message ||
//     error?.message ||
//     "Something went wrong"
//   );
// }finally{
//                 setBtnLoading(false);
//             }

//          }

//          async function deleteCompany(id:string) {
//             if(confirm("Are you sure you want to delete this company? ")){

            
//             try{
//                     setBtnLoading(true);
//                     const  {data}=await axios.delete(`${job_service}/api/company/delete/${id}`,{
//                         headers:{
//                             Authorization:`Bearer ${token}`,
//                         },
//                     });
//                     toast.success(data.message);
//                     fetchCompanies();
//             }catch(error:any){
//                 toast.error(error.response.data.message);
//             }finally{
//                 setBtnLoading(false);
//                     }
//                 }

//          }
//      useEffect(()=>{
//         fetchCompanies();
//      },[]);

//    if(loading) return <Loading/>

//   return (
//     <div className='max-w-7xl mx-auto px-4 py-6'>
//         <Card className='shadow-lg border-2 overflow-hidden'>
//             <div className='bg-blue-500 p-6 border-b'>
//             <div className='flex items-center justify-center flex-wrap gap-4'>
//                 <div className='flex items-center gap-3'>
//                   <div className='h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center'>

//                     <Building2 size={20} className='text-blue-600'/>

//                   </div>
//                 </div>
//                 <CardTitle className='text-2xl text-white'>
//                     My Companies
//                 </CardTitle>

//                 <CardDescription className='text-sm mt-1 text-white'>
//                     Manage you resistered companies and their details ({companies.length}/3)

//                 </CardDescription>

//                 {
//                 companies.length<3 &&( <Button onClick={openDialog} className='gap-2'>
//                     <Plus size={18}/>
//                     Add Company
//                 </Button>
//             )}
//             </div>
//             </div>

//             {companyLoading ?(
//                 <Loading/>
//                 ):<div> 
//                 {companies.length>0 ? (
//                     <div className='grid gap-4'>
//                         {companies.map((c)=>(
//                             <div key={c.company_id} className='flex items-center gap-4 p-4 rounded-lg border02 hover:border-blue-500 transition-all bg-background'>
                              
//                               <div className='h-16 w-16 rounded-full border-2 overflow-hidden shrink-0 bg-background'>
//                                 <img src={c.logo} alt='' className='w-full h-full object-cover'/>
                               
//                               </div>
//                               {/*   Company Info */}
//                               <div className='flex-1 min-w-0'>
//                                 <h3 className='text-sm opacity-70 line-clamp-2 mb-2'>
//                                     {c.name}
//                                 </h3>
//                                 <p className='text-sm opacity-70 line-clamp-2 mb-2'>
//                                     {c.description}
//                                 </p>
//                                 <a href={c.website} target='_blank' rel='noopener noreferrer' className='text-xs text-blue-500 hover:underline flex items-center gap-1'>
//                                     <Globe size={14}/>
//                                     {c.website}
//                                 </a>

//                               </div>
//                               <div className='flex items-center gap-2 shrink-0'>
//                                 <Link href={`/company/${c.company_id}`}><Button variant={"outline"} size={"icon"} className='h-9 w-9'>
//                                     <Eye size={16}/>

//                                 </Button>
//                                 </Link>

//                                 <Button variant={"destructive"} size={"icon"} className='h-9 w-9' onClick={()=>deleteCompany(c.company_id)}>
//                                     <Trash2 size={16}/>

//                                 </Button>

//                             </div>
//                             </div>
//                         ))}

//                         </div>
//                 ):(
//                     <>
//                     <div className='text-center py-12'>
//                         <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4'>
//                             <Building2 size={32} className='opacity-40'/>
//                         </div>
//                         <CardDescription className='text-base mb-4'>
//                             No Companies registered yet
//                         </CardDescription>
//                         <p className='text-sm opacity-60'>Add you first company to get started</p>
//                     </div>

//                     </>
//                 )}
//             </div>}
            
//         </Card>
//         {/*  Add company dialog */}
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button className='hidden' ref={addRef}>

//                 </Button>
//             </DialogTrigger>
//             <DialogContent className='sm:max-w-[550px]'>
//                 <DialogHeader>
//                     <DialogTitle className='text-2xl flex items-center gap-2'>
//                         <Building2 className='text-blue-600'/>
//                         Add Company
//                     </DialogTitle>
//                 </DialogHeader>

//                 <div className='space-y-5 py-4'>
                    
//                     <div className='space-y-2'>
//                        <Label htmlFor='name' className='text-sm font-medium items-center gap-2'>
//                         <Briefcase size={16}/> Company Name</Label>

//                         <Input type='text' id='name' placeholder='Enter company name' className='h-11' value={name} onChange={(e)=>setName(e.target.value)}/>

                       
//                     </div>

//                      <div className='space-y-2'>
//                        <Label htmlFor='description' className='text-sm font-medium items-center gap-2'>
//                         <FileText  size={16}/> Company Description</Label>

//                         <Input type='text' id='description' placeholder='Enter company description' className='h-11' value={description} onChange={(e)=>setDescription(e.target.value)}/>

                       
//                     </div>

//                      <div className='space-y-2'>
//                        <Label htmlFor='website' className='text-sm font-medium items-center gap-2'>
//                         <Globe size={16}/> Company Website</Label>

//                         <Input type='text' id='website' placeholder='Enter company website' className='h-11' value={website} onChange={(e)=>setWebsite(e.target.value)}/>

                       
//                     </div>

//                      <div className='space-y-2'>
//                        <Label htmlFor='logo' className='text-sm font-medium items-center gap-2'>
//                         <Briefcase size={16}/> Company Logo</Label>

//                         <Input type='file' id='logo' accept='image/*' className='h-11 cursor-pointer'  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setLogo(e.target.files?.[0]||null)}/>

                       
//                     </div>
//                 </div>
//                 <DialogFooter >
//                     <Button disabled={btnLoading} onClick={addCompanyHandler} className='w-full h-11'>{btnLoading ?"Adding Company...":"Add Company"}</Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>

//     </div>
//   )
// }

// export default Company



import { job_service, useAppData } from '@/context/AppContext';
import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '@/components/loading';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Briefcase, Building2, Eye, FileText, Globe, Link as LinkIcon, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Company as CompanyType } from '@/type';
import Link from 'next/link';

import { DialogContent, DialogTitle, DialogTrigger, Dialog, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function Company() {
    const { loading } = useAppData();
    const addRef = useRef<HTMLButtonElement | null>(null);

    const openDialog = () => {
        addRef.current?.click();
    };

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [logo, setLogo] = useState<File | null>(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [companies, setCompanies] = useState<CompanyType[]>([]);
    const [companyLoading, setCompanyLoading] = useState(true);

    const clearData = () => {
        setName("");
        setDescription("");
        setWebsite("");
        setLogo(null);
    };

    const token = Cookies.get("token");

    async function fetchCompanies() {
        try {
            const { data } = await axios.get(`${job_service}/api/job/company/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCompanies(data);
        } catch (error: any) {
            console.error(error);
        } finally {
            setCompanyLoading(false);
        }
    }

    async function addCompanyHandler() {
        if (!name || !description || !website || !logo) {
            return alert("Please Provide all details");
        }
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("website", website);
        formData.append("logo", logo);

        try {
            setBtnLoading(true);
            const { data } = await axios.post(`${job_service}/api/job/company/new`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success(data.message || "Company added successfully");
            clearData();
            fetchCompanies();
        } catch (error: any) {
            console.error(error);
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong"
            );
        } finally {
            setBtnLoading(false);
        }
    }

    async function deleteCompany(id: string) {
        if (confirm("Are you sure you want to delete this company?")) {
            try {
                setBtnLoading(true);
                const { data } = await axios.delete(`${job_service}/api/company/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success(data.message || "Company deleted successfully");
                fetchCompanies();
            } catch (error: any) {
                toast.error(error?.response?.data?.message || "Failed to delete company");
            } finally {
                setBtnLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchCompanies();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className='max-w-7xl mx-auto px-4 py-6'>
            <Card className='shadow-lg border-2 overflow-hidden'>
                <div className='bg-blue-500 p-6 border-b text-white'>
                    <div className='flex items-center justify-between flex-wrap gap-4'>
                        <div className='flex items-center gap-4'>
                            <div className='h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0'>
                                <Building2 size={20} className='text-blue-600' />
                            </div>
                            <div>
                                <CardTitle className='text-2xl text-white'>
                                    My Companies
                                </CardTitle>
                                <CardDescription className='text-sm mt-1 text-blue-100'>
                                    Manage your registered companies and their details ({companies.length}/3)
                                </CardDescription>
                            </div>
                        </div>

                        {companies.length < 3 && (
                            <Button onClick={openDialog} className='gap-2 bg-white text-blue-600 hover:bg-blue-50'>
                                <Plus size={18} />
                                Add Company
                            </Button>
                        )}
                    </div>
                </div>

                <div className='p-6'>
                    {companyLoading ? (
                        <Loading />
                    ) : (
                        <div>
                            {companies.length > 0 ? (
                                <div className='grid gap-4'>
                                    {companies.map((c) => (
                                        <div key={c.company_id} className='flex items-center gap-4 p-4 rounded-lg border-2 hover:border-blue-500 transition-all bg-background'>
                                            <div className='h-16 w-16 rounded-full border-2 overflow-hidden shrink-0 bg-background'>
                                                <img src={c.logo} alt={c.name} className='w-full h-full object-cover' />
                                            </div>
                                            
                                            {/* Company Info */}
                                            <div className='flex-1 min-w-0'>
                                                <h3 className='text-lg font-semibold truncate mb-1'>
                                                    {c.name}
                                                </h3>
                                                <p className='text-sm opacity-70 line-clamp-2 mb-2'>
                                                    {c.description}
                                                </p>
                                                <a href={c.website} target='_blank' rel='noopener noreferrer' className='text-xs text-blue-500 hover:underline flex items-center gap-1 w-fit'>
                                                    <Globe size={14} />
                                                    {c.website}
                                                </a>
                                            </div>

                                            <div className='flex items-center gap-2 shrink-0'>
                                                <Link href={`/company/${c.company_id}`}>
                                                    <Button variant="outline" size="icon" className='h-9 w-9'>
                                                        <Eye size={16} />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="icon" className='h-9 w-9' onClick={() => deleteCompany(c.company_id)}>
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='text-center py-12'>
                                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4'>
                                        <Building2 size={32} className='opacity-40' />
                                    </div>
                                    <CardDescription className='text-base mb-1 font-medium'>
                                        No Companies registered yet
                                    </CardDescription>
                                    <p className='text-sm opacity-60'>Add your first company to get started</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Card>

            {/* Add company dialog */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='hidden' ref={addRef}></Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[550px]'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl flex items-center gap-2'>
                            <Building2 className='text-blue-600' />
                            Add Company
                        </DialogTitle>
                    </DialogHeader>

                    <div className='space-y-5 py-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='name' className='text-sm font-medium flex items-center gap-2'>
                                <Briefcase size={16} /> Company Name
                            </Label>
                            <Input type='text' id='name' placeholder='Enter company name' className='h-11' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='description' className='text-sm font-medium flex items-center gap-2'>
                                <FileText size={16} /> Company Description
                            </Label>
                            <Input type='text' id='description' placeholder='Enter company description' className='h-11' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='website' className='text-sm font-medium flex items-center gap-2'>
                                <Globe size={16} /> Company Website
                            </Label>
                            <Input type='text' id='website' placeholder='Enter company website' className='h-11' value={website} onChange={(e) => setWebsite(e.target.value)} />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='logo' className='text-sm font-medium flex items-center gap-2'>
                                <LinkIcon size={16} /> Company Logo
                            </Label>
                            <Input type='file' id='logo' accept='image/*' className='h-11 cursor-pointer pt-2' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogo(e.target.files?.[0] || null)} />
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <Button disabled={btnLoading} onClick={addCompanyHandler} className='w-full h-11'>
                            {btnLoading ? "Adding Company..." : "Add Company"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Company;