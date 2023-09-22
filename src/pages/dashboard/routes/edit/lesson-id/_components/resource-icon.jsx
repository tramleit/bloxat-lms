import React from "react";

const ResourceIcon = ({ icon, color, label }) => {
  return (
    <div className="flex flex-row items-center py-0.5">
      <div
        className={`flex justify-center items-center content-center h-[27px] w-[27px]  rounded-md mr-2 ${color}`}
      >
        {icon}
        {/* <span className="text-white font-medium text-[10px]">PDF</span> */}
      </div>
      <span>{label}</span>
    </div>
  );
};

export default ResourceIcon;
