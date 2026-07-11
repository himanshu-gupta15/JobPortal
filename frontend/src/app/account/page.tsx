'use client';

import Loading from '@/components/loading';
import { useAppData } from '@/context/AppContext';
import React, { useEffect } from 'react';
import Info from './(component)/info';
import Skills from './(component)/skills';
import Company from './(component)/company';
import { useRouter } from 'next/navigation';
import AppliedJobs from './(component)/appliedJobs';

function AccountPage() {
  const { isAuth, user, loading,applications } = useAppData();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuth) {
      router.push('/login');
    }
  }, [isAuth, loading, router]);

  if (loading) return <Loading />;

  if (!user) return null;

  return (
    <div className="w-[90%] md:w-[60%] m-auto">
      <Info user={user} isYourAccount={true} />

      {user.role === 'jobseeker' && (
        <Skills user={user} isYourAccount={true} />
      )}

     {user.role==='jobseeker' && <AppliedJobs applications={applications}/>}

      {user.role === 'recruiter' && (
        <Company />
      )}
    </div>
  );
}

export default AccountPage;