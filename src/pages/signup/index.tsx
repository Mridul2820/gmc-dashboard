import React from "react";
import dynamic from "next/dynamic";

const SignUpContent = dynamic(() => import("@/components/Auth/SignUpContent"));

const LoginPage = () => {
  return <SignUpContent />;
};

export default LoginPage;
