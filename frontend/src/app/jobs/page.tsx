// 'use client';

// import { Job } from '@/type';
// import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { job_service } from '@/context/AppContext';
// import { Button } from '@/components/ui/button';
// import { Briefcase, Filter, MapPin, Search, X } from 'lucide-react';
// import Loading from '@/components/loading';
// import JobCard from '@/components/job-card';
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';

// const locations: string[] = [
//   "Delhi",
//   "Mumbai",
//   "Bangalore",
//   "Hyderabad",
//   "Chennai",
//   "Pune",
//   "Kolkata",
//   "Ahmedabad",
//   "Remote"
// ];

// function JobPage() {
//   const [loading, setLoading] = useState(true);
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [title, setTitle] = useState('');
//   const [location, setLocation] = useState('');

//   const token = Cookies.get('token');

//   const fetchJobs = async () => {
//     setLoading(true);

//     try {
//       const { data } = await axios.get(
//         `${job_service}/api/job/all?title=${title}&location=${location}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setJobs(data.jobs || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const hasActiveFilters = Boolean(title || location);

//   return (
//     <div className="min-h-screen bg-secondary/30">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="mb-8">
//           <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                 Explore <span className="text-red-500">Opportunities</span>
//               </h1>

//               <p className="text-base opacity-70">
//                 {jobs.length} Jobs Found
//               </p>
//             </div>

//             <Button className="gap-2 h-11">
//               <Filter size={18} />
//               Filters

//               {hasActiveFilters && (
//                 <span className="ml-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs">
//                   Active
//                 </span>
//               )}
//             </Button>
//           </div>

//           {hasActiveFilters && (
//             <div className="flex items-center gap-2 flex-wrap mb-6">
//               <span className="text-sm opacity-70">
//                 Active Filters:
//               </span>

//               {title && (
//                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-sm">
//                   <Search size={14} />
//                   {title}

//                   <button
//                     onClick={() => setTitle('')}
//                     className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               )}

//               {location && (
//                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-sm">
//                   <MapPin size={14} />
//                   {location}

//                   <button
//                     onClick={() => setLocation('')}
//                     className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {loading ? (
//             <Loading />
//           ) : jobs.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               {jobs.map((job) => (
//                 <JobCard key={job.job_id} job={job} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
//                 <Briefcase size={40} className="opacity-40" />
//               </div>

//               <h3 className="text-xl font-semibold mb-2">
//                 No Jobs Found
//               </h3>
//             </div>
//           )}
//         </div>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button ref={ref} className='hidden'>

//             </Button>
//           </DialogTrigger>

//           <DialogContent className='sm:max-w-[500px]'>
//             <DialogHeader>
//             <DialogTitle>
//               <Filter className='text-blue-600'/>
//               Filter Jobs
//             </DialogTitle>
//             </DialogHeader>
               
//                 <div className='space-y-5 py-4'>
                    
//                     <div className='space-y-2'>
//                        <Label htmlFor='name' className='text-sm font-medium items-center gap-2'>
//                         <Briefcase size={16}/> Company Name</Label>

//                         <Input type='text' id='name' placeholder='Enter company name' className='h-11' value={name} onChange={(e)=>setName(e.target.value)}/>

                       
//                     </div>

//                      <div className='space-y-2'>
//                        <Label htmlFor='description' className='text-sm font-medium items-center gap-2'>
//                         <Search  size={16}/> Search by job title</Label>

//                         <Input type='text' id='title' placeholder='Enter job title' className='h-11' value={title} onChange={(e)=>setTitle(e.target.value)}/>

                       
//                     </div>

//                      <div className='space-y-2'>
//                        <Label htmlFor='location' className='text-sm font-medium items-center gap-2'>
//                         <MapPin size={16}/> Location</Label>

//                        <select id='localtion'
//                         value={location}
//                         onChange={(e)=>setLocation(e.target.value)}
//                         className='w-full h-11 px-3 border-2 border-gray-300 rounded-md bg-transparent focus:outline-none focus-ring2'
//                         >
//                           <option value="">All Locations</option>
//                           {locations.map((e)=>(
//                             <option key={e} value={e}>{e}</option>
//                           ))}
//                         </select>

                       
//                     </div>

                    
//                 </div>

//                 <DialogFooter className='gap-2'>
//                   <Button variant={'outline'} onLoad={clearFilter} className='flex-1'>
//                     Clear Filters

//                   </Button>
//                 </DialogFooter>
//           </DialogContent>

//         </Dialog>
//       </div>
//     </div>
//   );
// }

// export default JobPage;


'use client';

import { Job } from '@/type';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { job_service } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  Filter,
  MapPin,
  Search,
  X,
} from 'lucide-react';
import Loading from '@/components/loading';
import JobCard from '@/components/job-card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const locations: string[] = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Remote',
];

function JobsPage() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const [open, setOpen] = useState(false);

  const token = Cookies.get('token');

  const fetchJobs = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `${job_service}/api/job/all?name=${name}&title=${title}&location=${location}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);

      setJobs(data || []); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const clearFilter = () => {
    setName('');
    setTitle('');
    setLocation('');
  };

  const applyFilters = async () => {
    await fetchJobs();
    setOpen(false);
  };
  

  const hasActiveFilters = Boolean(
    name || title || location
  );

  

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Explore{' '}
                <span className="text-red-500">
                  Opportunities
                </span>
              </h1>

              <p className="text-base opacity-70">
                {jobs.length} Jobs Found
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 h-11">
                  <Filter size={18} />
                  Filters

                  {hasActiveFilters && (
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs">
                      Active
                    </span>
                  )}
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Filter
                      size={18}
                      className="text-blue-600"
                    />
                    Filter Jobs
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-5 py-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="company"
                      className="flex items-center gap-2"
                    >
                      <Briefcase size={16} />
                      Company Name
                    </Label>

                    <Input
                      id="company"
                      type="text"
                      placeholder="Enter company name"
                      className="h-11"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      className="flex items-center gap-2"
                    >
                      <Search size={16} />
                      Job Title
                    </Label>

                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter job title"
                      className="h-11"
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="location"
                      className="flex items-center gap-2"
                    >
                      <MapPin size={16} />
                      Location
                    </Label>

                    <select
                      id="location"
                      value={location}
                      onChange={(e) =>
                        setLocation(e.target.value)
                      }
                      className="w-full h-11 px-3 border rounded-md bg-transparent focus:outline-none"
                    >
                      <option value="">
                        All Locations
                      </option>

                      {locations.map((loc) => (
                        <option
                          key={loc}
                          value={loc}
                        >
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={clearFilter}
                    className="flex-1"
                  >
                    Clear Filters
                  </Button>

                  <Button
                    onClick={applyFilters}
                    className="flex-1"
                  >
                    Apply Filters
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap mb-6">
              <span className="text-sm opacity-70">
                Active Filters:
              </span>

              {name && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-sm">
                  <Briefcase size={14} />
                  {name}

                  <button
                    onClick={() => setName('')}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {title && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-sm">
                  <Search size={14} />
                  {title}

                  <button
                    onClick={() => setTitle('')}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {location && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-sm">
                  <MapPin size={14} />
                  {location}

                  <button
                    onClick={() => setLocation('')}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

          {loading ? (
            <Loading />
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {jobs.map((job) => (
                <JobCard
                  key={job.job_id}
                  job={job}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <Briefcase
                  size={40}
                  className="opacity-40"
                />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                No Jobs Found
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobsPage;