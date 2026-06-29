import React from "react";

export function Skeleton({ className = "", variant = "default", ...props }) {
  const getVariantClasses = () => {
    switch (variant) {
      case "technovista":
        return "animate-pulse bg-gradient-to-r from-[#00FF41]/20 via-[#00FF41]/10 to-[#00FF41]/20 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[#00FF41]/30 before:to-transparent before:translate-x-[-100%] before:animate-[shimmer_2s_infinite] rounded";
      default:
        return "animate-pulse bg-gray-700 rounded";
    }
  };

  return <div className={`${getVariantClasses()} ${className}`} {...props} />;
}
