import React from "react";

function ProjectCard({ src, title, desc, link, category, index }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="w-full flex flex-col gap-[14px] "
    >
      <span>
        <span className="font-[800] text-[#5565E8]">Project {index}</span> //
        {title}
      </span>
      <div className="flex flex-col border-[1px] bg-[#011221] border-[#1E2D3D] rounded-[14px] overflow-hidden">
        <img className="w-full h-[160px] object-cover" src={src} alt="" />
        <div className="flex flex-col gap-[20px] p-[14px]">
          <p className="text-[16px] sm:text-[18px] text-[#607B96]">{desc}</p>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="px-[14px] py-[10px] rounded-[8px] bg-[#1C2B3A] text-[#FFF] w-fit text-[14px]"
          >
            view-project
          </a>
        </div>
      </div>
    </a>
  );
}

export default ProjectCard;
