import React, { useState } from "react";
import ProjectCard from "../../components/projectCard/ProjectCard";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const projects = [
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Project 1",
      desc: "Duis aute irure dolor in velit esse cillum dolore.",
      link: "https://github.com",
      category: "_ui-animations",
    },
  ];
  const categories = [
    { name: "Html", icon: "html5-line" },
    { name: "Css", icon: "css3-line" },
    { name: "Js", icon: "javascript-line" },
    { name: "Tailwind", icon: "tailwind-css-line" },
    { name: "React Js", icon: "reactjs-line" },
  ];
  return (
    <div className="flex items-start h-full max-sm:flex-col">
      <div className="flex flex-col max-sm:w-full sm:min-w-[301px] sm:border-r-[1px] border-[#1E2D3D] h-full">
        <div className="max-sm:py-[5px] flex items-center gap-[12px] p-[12px] py-[10px] sm:border-b-[1px] border-[#1E2D3D] cursor-pointer group max-sm:bg-[#1E2D3D]">
          <i className="ri-arrow-down-s-fill text-[18px] text-[#FFF] group-hover:text-[#607B96] transition-all"></i>
          <span className="text-[#FFF] text-[14px] group-hover:text-[#607B96] transition-all">
            projects
          </span>
        </div>
        <div className="flex flex-col gap-[8px] p-[12px] py-[10px]">
          {categories?.map((category) => {
            return (
              <div
                onClick={() => {
                  selectedCategory?.includes(category?.name)
                    ? setSelectedCategory(
                        selectedCategory?.filter(
                          (item) => item !== category?.name
                        )
                      )
                    : setSelectedCategory([
                        ...selectedCategory,
                        category?.name,
                      ]);
                }}
                className="flex items-center gap-[24px] group cursor-pointer"
              >
                <i
                  class={`text-[22px] ri-checkbox-${
                    selectedCategory?.includes(category?.name)
                      ? "fill"
                      : "blank-line"
                  }`}
                ></i>
                <div className="flex items-center gap-[10px]">
                  <i class={`ri-${category?.icon} text-[20px]`}></i>
                  <span className="group-hover:text-[#FFF] transition-all text-[#607B96]">
                    {category?.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="w-full max-sm:hidden border-b-[1px] border-[#1E2D3D]">
          <div className="flex w-fit p-[12px] border-r-[1px] border-[#1E2D3D]">
            <span className="text-[#607B96] text-[16px]">React; Vue</span>
          </div>
        </div>
        <div className="w-full px-[24px] overflow-y-auto max-h-[73dvh] py-[32px] sm:px-[100px] sm:py-[100px] grid grid-cols-4 gap-[40px] flex-wrap h-full max-[1300px]:border-r-0">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
