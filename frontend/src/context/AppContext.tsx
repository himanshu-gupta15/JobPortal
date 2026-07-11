// 'use client';

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
// } from 'react';

// import {
//   AppProviderProps,
//   User,
// } from '@/type';

// import Cookies from 'js-cookie';
// import toast, { Toaster } from 'react-hot-toast';
// import axios from 'axios';

// export const utils_service =
//   "http://localhost:5001";

// export const auth_service =
//   "http://localhost:4000";

// export const user_service =
//   "http://localhost:5002";

// export const job_service =
//   "http://localhost:5003";

// interface AppContextType {
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
// }

// const AppContext =
//   createContext<AppContextType | undefined>(
//     undefined
//   );

// export const AppProvider: React.FC<
//   AppProviderProps
// > = ({ children }) => {

//   const [user, setUser] =
//     useState<User | null>(null);

//   const [isAuth, setIsAuth] =
//     useState(false);

//   const [loading, setLoading] =
//     useState(true);

//   const [btnLoading, setBtnLoading] =
//     useState(false);

//   async function fetchUser() {

//   const token = Cookies.get('token');


//   if (!token) {
//     setLoading(false);
//     return;
//   }

//   try {

//     const { data } = await axios.get(
//       `${user_service}/api/user/me`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     setUser(data.user);
   
//     setIsAuth(true);

//   } catch (error) {

//     console.log(error);

//     setUser(null);

//     setIsAuth(false);

//   } finally {

//     setLoading(false);
//   }
// }

// async function updateProfilePic(fromData:any){
//   const token = Cookies.get('token');
//   setLoading(true);
//   try{
//   const {data}=await axios.put(`${user_service}/api/user/udate/pic`,FormData,{
//     headers:{
//       Authorization:`Bearer ${token}`,
//     },
//   })
//   toast.success(data.message)
//   fetchUser();
//   }catch(error:any){
//     toast.error(error.response.data.message)
//   }finally{
//     setLoading(false);
//   }
// }

// async function updateResume(fromData:any){
//   const token = Cookies.get('token');
//   setLoading(true);
//   try{
//   const {data}=await axios.put(`${user_service}/api/user/update/resume`,FormData,{
//     headers:{
//       Authorization:`Bearer ${token}`,
//     },
//   })
//   toast.success(data.message)
//   fetchUser();
//   }catch(error:any){
//     toast.error(error.response.data.message)
//   }finally{
//     setLoading(false);
//   }
// }

// async function updateUser(name:string,phoneNumber:string, bio:string){
//   const token = Cookies.get('token');
//   setLoading(true);
//   try{
//     const {data}=await axios.put(`${user_service}/api/user/update/profile`,{
//       name,phoneNumber,bio
//     },{
//       headers:{
//         Authorization:`Bearer ${token}`,
//       }
//     })

//     toast.success(data.message);
//     fetchUser();

//   }catch(error:any){
//     toast.error(error.response.data.message)
//   }finally{
//     setLoading(false);
//   }
// }


// async function logoutUser(){
//   Cookies.set("token","");
//   setUser(null);
//   setIsAuth(false);
//   toast.success("Logged out successfully");
// }

// useEffect(() => {
//   fetchUser();
// }, []);
 

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         isAuth,
//         loading,
//         btnLoading,
//         setUser,
//         setIsAuth,
//         setLoading,
//         setBtnLoading,
//         logoutUser,
//         updateProfilePic,
//        updateResume,
//        updateUser
//       }}
//     >
//       {children}

//       <Toaster />
//     </AppContext.Provider>
//   );
// };

// export const useAppData =
//   (): AppContextType => {

//     const context =
//       useContext(AppContext);

//     if (!context) {

//       throw new Error(
//         'useAppData must be used within AppProvider'
//       );
//     }

//     return context;
//   }; 


'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import {
  AppProviderProps,
  User,
  AppContextType,
  Application,
} from '@/type';

import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export const utils_service =
  process.env.NEXT_PUBLIC_UTILS_SERVICE!;

export const auth_service =
  process.env.NEXT_PUBLIC_AUTH_SERVICE!;

export const user_service =
  process.env.NEXT_PUBLIC_USER_SERVICE!;

export const job_service =
  process.env.NEXT_PUBLIC_JOB_SERVICE!;

export const payment_service =
  process.env.NEXT_PUBLIC_PAYMENT_SERVICE!;
 
const AppContext = createContext<AppContextType | undefined>(
  undefined
);

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const [isAuth, setIsAuth] = useState(false);

  const [loading, setLoading] = useState(true);

  const [btnLoading, setBtnLoading] = useState(false);

  const fetchUser = async () => {
    const token = Cookies.get('token');

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(
        `${user_service}/api/user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      console.log(error);

      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  const updateProfilePic = async (
    formData: FormData
  ): Promise<void> => {
    const token = Cookies.get('token');

    try {
      setBtnLoading(true);
      

      const { data } = await axios.put(
        `${user_service}/api/user/update/pic`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      await fetchUser();
    } catch(error:any){
  console.log("ERROR:", error);
  console.log("RESPONSE:", error?.response?.data);
}finally {
      setBtnLoading(false);
    }
  };

  const updateResume = async (
    formData: FormData
  ): Promise<void> => {
    const token = Cookies.get('token');

    try {
      setBtnLoading(true);

      const { data } = await axios.put(
        `${user_service}/api/user/update/resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      await fetchUser();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          'Failed to update resume'
      );
    } finally {
      setBtnLoading(false);
    }
  };

  const updateUser = async (
    name: string,
    phoneNumber: string,
    bio: string
  ): Promise<void> => {
    const token = Cookies.get('token');

    try {
      setBtnLoading(true);

      const { data } = await axios.put(
        `${user_service}/api/user/update/profile`,
        {
          name,
          phoneNumber,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      await fetchUser();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          'Failed to update profile'
      );
    } finally {
      setBtnLoading(false);
    }
  };

  const logoutUser = async (): Promise<void> => {
    Cookies.remove('token');

    setUser(null);
    setIsAuth(false);

    toast.success('Logged out successfully');
  };

  async function addSkill(skill:string,setSkill:React.Dispatch<React.SetStateAction<string | "">>){
    setBtnLoading(true); 
     const token = Cookies.get('token');
    try{

      const {data}=await axios.post(
        `${user_service}/api/user/skill/add`,{skillName:skill},{
          headers:{
            Authorization:`Bearer ${token}`, 
          },
        }
      );
      toast.success(data.message);
      setSkill("");
      fetchUser()
      fetchApplications();

    }catch(error:any){
      toast.error(error.response.data.message)
    }finally{
      setBtnLoading(false)
    }
  }


   async function removeSkill(skill:string){
    
     const token = Cookies.get('token');
    try{

      const {data}=await axios.put(
        `${user_service}/api/user/skill/delete`,{skillName:skill},{
          headers:{
            Authorization:`Bearer ${token}`, 
          },
        }
      );
      toast.success(data.message);
      
      fetchUser()

    }catch(error:any){
      toast.error(error.response.data.message)
    }
  }

  async function applyJob(job_id:number){
    setBtnLoading(true);
    try{
      const {data}=await axios.post(`${user_service}/api/user/apply/job`,{job_id},{
        headers:{
          Authorization:`Bearer ${Cookies.get("token")}`,
        }
      });
      toast.success(data.message);
      fetchApplications();
    }catch(error:any){
      toast.error(error.response.data.message)
    }finally{
      setBtnLoading(false);
    }
  }

  const [applications,setApplications]=useState<Application[]>([]);

  async function fetchApplications(){
    const token = Cookies.get("token");
    
    if (!token) {
      return;
    }
    
    try{
       const {data}=await axios.get(`${user_service}/api/user/application/all`,{
        headers:{
          Authorization:`Bearer ${token}`,
        }
       });

       setApplications(data);
    }catch(error:any){
      console.error("Failed to fetch applications:", error);
      setApplications([]);
    }
  }

  useEffect(() => {
    const initializeApp = async () => {
      await fetchUser();
      await fetchApplications();
    };
    
    initializeApp();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuth,
        loading,
        btnLoading,
        setUser,
        setIsAuth,
        setLoading,
        setBtnLoading,
        logoutUser,
        updateProfilePic,
        updateResume,
        updateUser,
        addSkill,
        removeSkill,
        applications,
        applyJob,
        fetchApplications,
        fetchUser,
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useAppData must be used within AppProvider'
    );
  }

  return context;
};