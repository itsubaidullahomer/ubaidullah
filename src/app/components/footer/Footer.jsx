import React from "react";
import { Config } from "../../constants/Index";

function Footer() {
  return (
    <div className="flex items-center justify-between w-full border-t-[1px] border-[#1E2D3D]">
      <div className="flex items-center max-sm:w-full max-sm:justify-between">
        <span className="px-[22px] py-[17px]">find me in:</span>
        <div className="flex items-center">
          <i className="transition-all cursor-pointer hover:text-[#FFF] text-[24px] px-[16px] py-[10px] border-r-[1px] border-[#1E2D3D] ri-instagram-fill"></i>
          <i className="transition-all cursor-pointer hover:text-[#FFF] text-[24px] px-[16px] py-[10px] border-r-[1px] sm:border-r-[1px] border-[#1E2D3D] ri-linkedin-fill"></i>
          <i className="transition-all cursor-pointer hover:text-[#FFF] text-[24px] px-[16px] py-[10px] ri-github-fill sm:hidden"></i>
        </div>
      </div>
      <div className="flex items-center gap px-[16px] py-[10px] border-x-[1px] border-[#1E2D3D] gap-[20px] group cursor-pointer max-sm:hidden">
        <span className="transition-all group-hover:text-[#FFF]">
          {Config.githubUserName}
        </span>
        <i className="transition-all group-hover:text-[#FFF] text-[24px] ri-github-fill"></i>
      </div>
    </div>
  );
}

export default Footer;
