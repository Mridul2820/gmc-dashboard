import React, { useState } from "react";
import axios from "axios";
import { object, string } from "yup";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createBrandApi } from "@/api/brandApis";
import SidebarLayout from "@/components/Layout/SidebarLayout";
import Loading from "@/components/ui/loading";
import { gmcAuthToken } from "@/constant";

const AddBrandContent = () => {
  const router = useRouter();
  const token = Cookies.get(gmcAuthToken);
  const [loading, setLoading] = useState(false);
  const validationSchema = object({
    name: string().required("Name cannot be empty!"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.post(createBrandApi, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success === true) {
          toast.success("Brand Added Successfully");
          setLoading(false);
          router.push("/dashboard/brands");
        }
      } catch (error: any) {
        setLoading(false);
        toast.error(
          error.response.data.error || error.response.data.errors[0].message
        );
      }
    },
  });

  return (
    <SidebarLayout>
      <form onSubmit={formik.handleSubmit}>
        <div className="p-4 space-y-4">
          <h2 className="text-2xl font-semibold">Add Brand</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Enter brand name"
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="error-message">{formik.errors.name}</p>
              ) : null}
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <Loading /> : "Add Brand"}
          </Button>
        </div>
      </form>
    </SidebarLayout>
  );
};

export default AddBrandContent;
