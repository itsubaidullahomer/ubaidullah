import React, { useState } from "react";
import ProjectModal from "../../pages/projects/ProjectModal";
function ProjectCard({ project, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
const {src, title, desc, link} = project;

  return (
    <>
      <div className="w-full flex flex-col gap-[14px]">
        <span>
          <span className="font-[800] text-[#5565E8]">Project {index}</span> //{" "}
          {title}
        </span>
        <div className="flex flex-col border-[1px] bg-[#011221] border-[#1E2D3D] rounded-[14px] overflow-hidden hover:border-[#5565E8]/50 transition-all group">
          <div className="relative overflow-hidden">
            <img 
              className="w-full h-[160px] object-cover group-hover:scale-105 transition-transform duration-300" 
              src={src} 
              alt={title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#011221] via-transparent to-transparent opacity-60"></div>
          </div>
          <div className="flex flex-col gap-[20px] p-[14px]">
            <p className="text-[16px] sm:text-[18px] text-[#607B96] line-clamp-2">
              {desc}
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 px-[14px] py-[10px] rounded-[8px] bg-[#5565E8] hover:bg-[#6575F0] text-white text-[14px] font-medium transition-all flex items-center justify-center gap-2"
              >
                <i className="ri-information-line"></i>
                view-details
              </button>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="px-[14px] py-[10px] rounded-[8px] bg-[#1C2B3A] hover:bg-[#263B4A] border border-[#1E2D3D] text-[#607B96] hover:text-white text-[14px] transition-all flex items-center gap-2"
              >
                <i className="ri-external-link-line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ProjectModal 
        project={project} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}

export default ProjectCard;