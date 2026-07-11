'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth_service, job_service, useAppData } from '@/context/AppContext';

function ForgotPage() {
  const [email, setEmail] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);

  const { isAuth } = useAppData();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push('/');
    }
  }, [isAuth, router]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const { data } = await axios.post(
        `${auth_service}/api/auth/forgot`,
        { email }
      );

      toast.success(data.message);
      setEmail('');
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || 'Something went wrong'
      );
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="mt-20 md:mt-5 z-0">
      <div className="md:w-1/3 border border-gray-400 rounded-lg p-8 flex flex-col w-full relative shadow-md m-auto">
        <h2 className="mb-4">
          <span className="text-3xl font-semibold">
            Forgot Password
          </span>
        </h2>

        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 mt-3"
        >
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={btnLoading}
            className="w-full"
          >
            {btnLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>

        <Link
          href="/login"
          className="text-blue-500 hover:underline mt-4 text-center"
        >
          Go to Login page
        </Link>
      </div>
    </div>
  );
}

export default ForgotPage;