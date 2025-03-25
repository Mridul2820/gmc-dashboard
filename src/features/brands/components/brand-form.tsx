'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { gmcAuthToken } from '@/constant';
import { Product } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { object, string } from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { createBrandApi } from '@/api/brandApis';
import { useFormik } from 'formik';
import Loading from '@/components/ui/loading';
import { Label } from '@/components/ui/label';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export default function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: Product | null;
  pageTitle: string;
}) {
  const router = useRouter();
  const token = Cookies.get(gmcAuthToken);
  const [loading, setLoading] = useState(false);
  const validationSchema = object({
    name: string().required('Name cannot be empty!')
  });

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.post(createBrandApi, values, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data.success === true) {
          toast.success('Brand Added Successfully');
          setLoading(false);
          router.push('/dashboard/brand');
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
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className='space-y-8'>
          {/* <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={4}
                        maxSize={4 * 1024 * 1024}
                        // disabled={loading}
                        // progresses={progresses}
                        // pass the onUpload function here for direct upload
                        // onUpload={uploadFiles}
                        // disabled={isUploading}
                      /> */}

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder='Enter brand name'
              />
              {formik.touched.name && formik.errors.name ? (
                <p className='error-message'>{formik.errors.name}</p>
              ) : null}
            </div>
          </div>
          <Button type='submit' disabled={loading}>
            {loading ? <Loading /> : 'Add Brand'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
