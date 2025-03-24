import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { object, string } from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gmcAuthToken, validEmailRegex, validPasswordRegex } from "@/constant";
import { loginAPi } from "@/api/authApis";
import Loading from "../ui/loading";

export default function LoginContent() {
  const [loading, setLoading] = useState(false);
  const validationSchema = object({
    email: string()
      .matches(validEmailRegex, "Invalid email address")
      .required("Email cannot be empty!"),
    password: string()
      .required("Please enter password")
      .min(8, "Please enter at least 8 characters")
      .matches(/[A-Z]/, "Please enter at least one uppercase letter")
      .matches(/[a-z]/, "Please enter at least one lowercase letter")
      .matches(/[0-9]/, "Please enter at least one number")
      .matches(/^(?!.*\s).+$/, "Password cannot contain spaces"),
  });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.post(loginAPi, values);
        if (res.data.success === true) {
          toast.success("Login Success");
          setLoading(false);
          Cookies.set(gmcAuthToken, res.data.data.token);
          router.push("/dashboard");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Invalid email or password");
      }
    },
  });

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent text-black">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md"
      >
        <div className="p-8 pb-6">
          <div>
            <h1 className="mb-1 mt-4 text-xl font-semibold">Sign In to</h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>
          <hr className="my-4 border-dashed" />
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
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
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <Loading /> : "Sign In"}
            </Button>
          </div>
        </div>
        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Don&apos;t have an account ?
            <Button asChild variant="link" className="px-2">
              <Link href="/signup">Create account</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
