'use client';

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { auth_service, useAppData } from '@/context/AppContext';

import axios from 'axios';
import Cookies from 'js-cookie';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';

import toast from 'react-hot-toast';

import {
  ArrowRight,
  Briefcase,
  Lock,
  Mail,
  User,
} from 'lucide-react';

function RegisterPage() {

  const router = useRouter();

  const [name, setName] =
    useState('');

  const [role, setRole] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [phoneNumber, setPhoneNumber] =
    useState('');

  const [bio, setBio] =
    useState('');

  const [resume, setResume] =
    useState<File | null>(null);

  const [btnLoading, setBtnLoading] =
    useState(false);

  const {
    isAuth,
    setUser,
    loading,
    setIsAuth,
  } = useAppData();

  useEffect(() => {

    if (!loading && isAuth) {
      router.push('/');
    }

  }, [isAuth, loading, router]);

  if (loading) {
    return <Loading />;
  }

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    if (btnLoading) return;

    setBtnLoading(true);

    try {

      const formData = new FormData();

      formData.append(
        'role',
        role
      );

      formData.append(
        'name',
        name
      );

      formData.append(
        'email',
        email
      );

      formData.append(
        'password',
        password
      );

      formData.append(
        'phoneNumber',
        phoneNumber
      );

      formData.append(
        'bio',
        bio
      );

      if (
        role === 'jobseeker' &&
        resume
      ) {
        formData.append(
          'resume',
          resume
        );
      }

      const { data } =
        await axios.post(
          `${auth_service}/api/auth/register`,
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data',
            },
          }
        );

      Cookies.set(
        'token',
        data.token,
        {
          expires: 15,
          path: '/',
        }
      );

      setUser(data.user);

      setIsAuth(true);

      toast.success(
        data.message
      );

      router.push('/');

    } catch (error: any) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
        'Registration failed'
      );

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

            Join CareerLaunch

          </h1>

          <p className="text-sm opacity-70">

            Create your account
            to start your career
            journey

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

            {/* Role */}

            <div className='space-y-2'>

              <Label htmlFor="role">
                I want to
              </Label>

              <div className='relative'>

                <Briefcase
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

                <select
                  id="role"
                  value={role}
                  onChange={(e) =>
                    setRole(
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
                >

                  <option value="">
                    Select Role
                  </option>

                  <option value="jobseeker">
                    Find a Job
                  </option>

                  <option value="recruiter">
                    Hire Talent
                  </option>

                </select>

              </div>

            </div>

            {role && (

              <div className='space-y-5 animate-in fade-in duration-300'>

                {/* Name */}

                <div className='space-y-2'>

                  <Label htmlFor="name">
                    Full Name
                  </Label>

                  <div className='relative'>

                    <User
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
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) =>
                        setName(
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

                {/* Email */}

                <div className='space-y-2'>

                  <Label htmlFor="email">
                    Email Address
                  </Label>

                  <div className='relative'>

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
                        setEmail(
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

                {/* Password */}

                <div className='space-y-2'>

                  <Label htmlFor="password">
                    Password
                  </Label>

                  <div className='relative'>

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

                {/* Phone */}

                <div className='space-y-2'>

                  <Label htmlFor="phone">
                    Phone Number
                  </Label>

                  <input
                    id="phone"
                    type="text"
                    placeholder="+91 9876543210"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(
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
                      px-4
                      text-sm
                      outline-none
                      focus:ring-2
                    "
                  />

                </div>

                {/* Resume */}

                {role ===
                  'jobseeker' && (

                  <div className='space-y-5'>

                    <div className='space-y-2'>

                      <Label htmlFor="resume">
                        Resume (PDF)
                      </Label>

                      <input
                        id="resume"
                        type="file"
                        accept="application/pdf"
                        onChange={(
                          e: ChangeEvent<HTMLInputElement>
                        ) => {

                          if (
                            e.target.files &&
                            e.target
                              .files[0]
                          ) {

                            setResume(
                              e.target
                                .files[0]
                            );
                          }
                        }}
                        required
                        className='w-full text-sm'
                      />

                    </div>

                    {/* Bio */}

                    <div className='space-y-2'>

                      <Label htmlFor="bio">
                        Bio
                      </Label>

                      <textarea
                        id="bio"
                        placeholder="Tell us about yourself"
                        value={bio}
                        onChange={(e) =>
                          setBio(
                            e.target.value
                          )
                        }
                        required
                        className="
                          w-full
                          min-h-[100px]
                          rounded-md
                          border
                          bg-transparent
                          px-4
                          py-3
                          text-sm
                          outline-none
                          focus:ring-2
                        "
                      />

                    </div>

                  </div>

                )}

                {/* Submit */}

                <Button
                  type="submit"
                  disabled={btnLoading}
                  className='w-full gap-2'
                >

                  {btnLoading
                    ? 'Please Wait...'
                    : 'Register'}

                  <ArrowRight
                    size={18}
                  />

                </Button>

              </div>

            )}

          </form>

          {/* Footer */}

          <div
            className="
              mt-6
              pt-6
              border-t
            "
          >

            <p className='text-sm text-center'>

              Already have an account?{' '}

              <Link
                href="/login"
                className='text-blue-500 hover:underline'
              >

                Login

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;