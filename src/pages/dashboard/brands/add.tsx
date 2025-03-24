import React from "react";
import dynamic from "next/dynamic";

const AddBrandContent = dynamic(
  () => import("@/components/Brand/AddBrandContent")
);

const AllBrands = () => {
  return <AddBrandContent />;
};

export default AllBrands;
