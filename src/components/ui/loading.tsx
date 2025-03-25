import React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Loading = ({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <LoaderCircle
      className={cn("animate-spin text-white", className)}
      size={size}
    />
  );
};

export default Loading;
