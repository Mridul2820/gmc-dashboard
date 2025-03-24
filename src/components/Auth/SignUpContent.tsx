import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { object, string } from "yup";
import { validEmailRegex } from "@/constant";
import { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import axios from "axios";
import { signUpAPi } from "@/api/authApis";
import toast from "react-hot-toast";

export default function SignUpContent() {
  const [loading, setLoading] = useState(false);
  const validationSchema = object({
    firstName: string().required("Firstname cannot be empty!"),
    lastName: string().required("Lastname cannot be empty!"),
    phoneNumber: string().required("Phone number cannot be empty!"),
    email: string()
      .matches(validEmailRegex, "Invalid email address")
      .required("Email cannot be empty!"),
    password: string().required("Password cannot be empty!"),
  });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.post(signUpAPi, values);
        if (res.status === 200) {
          toast.success("Signup Success");
          setLoading(false);
          router.push("/dashboard");
        }
      } catch (error) {
        setLoading(false);
      }
    },
  });

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-20 dark:bg-transparent text-black">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
              Create an Account
            </h1>
            <p className="text-sm">Welcome! Create an account to get started</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="block text-sm">
                  Firstname
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-sm text-destructive">
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="block text-sm">
                  Lastname
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="block text-sm">
                Phone Number
              </Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-sm text-destructive">
                  {formik.errors.phoneNumber}
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-sm text-destructive">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-title text-sm">
                  Password
                </Label>
              </div>
              <Input
                type="password"
                required
                name="password"
                id="password"
                className="input sz-md variant-mixed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>

            <Button className="w-full">Sign In</Button>
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account ?
            <Button asChild variant="link" className="px-2">
              <Link href="/login">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
