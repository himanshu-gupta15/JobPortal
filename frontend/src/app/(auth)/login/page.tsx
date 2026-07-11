
'use client';

import React, { FormEvent, useEffect, useState } from 'react';

import axios from 'axios';

import Cookies from 'js-cookie';

import toast from 'react-hot-toast';

import Link from 'next/link';

import { useRouter } from 'next/navigation';
import Loading from '@/components/loading';

import {
  ArrowRight,
  Lock,
  Mail,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  auth_service,
  useAppData,
} from '@/context/AppContext';

const LoginPage = () => {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [btnLoading, setBtnLoading] =
    useState(false);

  const {
    isAuth,
    loading,
    setUser,
    setIsAuth,
    fetchApplications
  } = useAppData();

  const router = useRouter();
  

  useEffect(() => {

    if (isAuth) {
      router.push('/');
    }


  }, [isAuth, router]);

   if(loading) return <Loading/>

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    if (btnLoading) return;

    setBtnLoading(true);

    try {

      const { data } = await axios.post(
        `${auth_service}/api/auth/login`,
        {
          email,
          password,
        }
      );

      Cookies.set(
        'token',
        data.token,
        {
          expires: 7,
        }
      );

      setIsAuth(true);

      toast.success(data.message);
      setUser(data.userObject);
      fetchApplications();

      router.push('/');

    } catch (error) {

      if (axios.isAxiosError(error)) {

        toast.error(
          error.response?.data?.message ||
          'Login failed'
        );

      } else {

        toast.error(
          'Something went wrong'
        );
      }

      setIsAuth(false);

    } finally {

      setBtnLoading(false);
    }
  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        py-12
      "
    >

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold mb-2">

            Welcome back to CareerLaunch

          </h1>

          <p className="text-sm opacity-70">

            Sign in to continue your journey

          </p>

        </div>

        <div
          className="
            border
            rounded-2xl
            p-8
            shadow-lg
            backdrop-blur-sm
          "
        >

          <form
            onSubmit={submitHandler}
            className="space-y-5"
          >

            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="
                  text-sm
                  font-medium
                "
              >

                Email Address

              </label>

              <div className="relative mt-1">

                <Mail
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    text-gray-500
                  "
                />

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="
                    w-full
                    h-11
                    rounded-md
                    border
                    bg-transparent
                    px-10
                    text-sm
                    outline-none
                    focus:ring-2
                  "
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="
                  text-sm
                  font-medium
                "
              >

                Password

              </label>

              <div className="relative mt-1">

                <Lock
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    text-gray-500
                  "
                />

                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                  className="
                    w-full
                    h-11
                    rounded-md
                    border
                    bg-transparent
                    px-10
                    text-sm
                    outline-none
                    focus:ring-2
                  "
                />

              </div>

            </div>

            {/* Forgot Password */}

            <div
              className="
                flex
                items-center
                justify-end
              "
            >

              <Link
                href="/forgot"
                className="
                  text-sm
                  text-blue-500
                  hover:underline
                "
              >

                Forgot Password?

              </Link>

            </div>

            {/* Submit */}

            <Button
              type="submit"
              disabled={btnLoading}
              className="
                w-full
                gap-2
              "
            >

              {btnLoading
                ? 'Signing In...'
                : 'Sign In'}

              <ArrowRight size={18} />

            </Button>

          </form>

          {/* Footer */}

          <div
            className="
              mt-6
              pt-6
              border-t
            "
          >

            <p className="text-sm text-center">

              Don&apos;t have an account?{' '}

              <Link
                href="/register"
                className="
                  text-blue-500
                  hover:underline
                "
              >

                Create a new account

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;

