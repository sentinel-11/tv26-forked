import React from "react";
import { useNavigate } from "react-router-dom";
import { Notebook } from "lucide-react";

export const PromoDiv = (props) => {
  const navigate = useNavigate();

  return (
    <div
      className="shadow-2xl backdrop-blur-sm flex justify-center bg-black/20 rounded-lg mb-1 cursor-pointer z-[99999] relative"
      onClick={() => navigate("/technovista/updates")}
    >
      <div className="bg-black/40 mr-[3px] flex align-middle rounded-l-lg px-1 py-1 border border-[#00FF41]/50">
        <div className="my-auto">
          <Notebook size={20} color="white" />
        </div>
      </div>
      <div className="bg-black/40 border border-[#00FF41]/50 rounded-r-lg px-2 py-1 w-full">
        <span className="flex items-center justify-center">
          <p className="text-white text-xs">View </p>
        </span>
        <h1 className="text-white text-sm leading-5 text-right">
          {props.name || "Updates"}
        </h1>
      </div>
    </div>
  );
};
