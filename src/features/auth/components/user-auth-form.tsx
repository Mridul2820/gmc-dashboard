'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { object, string } from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Label } from '@/components/ui/label';
import Loading from '@/components/ui/loading';
import { gmcAuthToken, validEmailRegex } from '@/constant';
import { loginAPi } from '@/api/authApis';
import Link from 'next/link';

export default function UserAuthForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const validationSchema = object({
    email: string()
      .matches(validEmailRegex, 'Invalid email address')
      .required('Email cannot be empty!'),
    password: string()
      .required('Please enter password')
      .min(8, 'Please enter at least 8 characters')
      .matches(/[A-Z]/, 'Please enter at least one uppercase letter')
      .matches(/[a-z]/, 'Please enter at least one lowercase letter')
      .matches(/[0-9]/, 'Please enter at least one number')
      .matches(/^(?!.*\s).+$/, 'Password cannot contain spaces')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.post(loginAPi, values);
        if (res.data.success === true) {
          toast.success('Login Success');
          setLoading(false);
          Cookies.set(gmcAuthToken, res.data.data.token);
          router.push('/dashboard');
        }
      } catch (error: any) {
        setLoading(false);
        toast.error(
          error.response.data.error || error.response.data.errors[0].message
        );
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className='w-full space-y-2'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='email' className='block text-sm'>
            Email
          </Label>
          <Input
            type='email'
            required
            name='email'
            id='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='error-message'>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className='space-y-0.5'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='password' className='text-title text-sm'>
              Password
            </Label>
          </div>
          <Input
            type='password'
            required
            name='password'
            id='password'
            className='input sz-md variant-mixed'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='error-message'>{formik.errors.password}</div>
          ) : null}
        </div>
        <Button className='w-full' type='submit' disabled={loading}>
          {loading ? <Loading /> : 'Sign In'}
        </Button>
      </div>

      <p className='text-accent-foreground text-center text-sm'>
        Don&apos;t have an account ?
        <Button asChild variant='link' className='px-2'>
          <Link href='/signup'>Create account</Link>
        </Button>
      </p>
    </form>
  );
}
