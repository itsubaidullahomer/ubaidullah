import React, { useState } from "react";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { categories, projects } from "../../constants/projects";

const Projects = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(true);



  const filterProjects = projects.filter((project) => {
    if (selectedCategories.length === 0) {
      return true;
    }
    return project.category.some((cat) => selectedCategories.includes(cat));
  });

  const toggleCategory = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((cat) => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div className="flex items-start h-full max-sm:flex-col">
      <div className="flex flex-col max-sm:w-full sm:min-w-[301px] sm:border-r-[1px] border-[#1E2D3D] h-full">
        <div
          onClick={() => setShowCategories(!showCategories)}
          className="max-sm:py-[5px] flex items-center gap-[12px] p-[12px] py-[10px] sm:border-b-[1px] border-[#1E2D3D] cursor-pointer group max-sm:bg-[#1E2D3D]"
        >
          <i
            className={`ri-arrow-down-s-fill text-[18px] text-[#FFF] group-hover:text-[#607B96] transition-all ${
              showCategories ? "rotate-180" : ""
            } `}
          ></i>
          <span className="text-[#FFF] text-[14px] group-hover:text-[#607B96] transition-all">
            projects
          </span>
        </div>
        <div
          className={`flex flex-col gap-[8px] p-[12px] py-[10px] ${
            showCategories ? "" : "hidden"
          }`}
        >
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => toggleCategory(category.name)}
              className="flex items-center gap-[24px] group cursor-pointer"
            >
              <i
                className={`ri-checkbox-${
                  selectedCategories.includes(category.name)
                    ? "fill"
                    : "blank-line"
                } text-[22px]`}
              ></i>
              <div className="flex items-center gap-[10px]">
                <i className={`ri-${category.icon} text-[20px]`}></i>
                <span className="group-hover:text-[#FFF] transition-all text-[#607B96]">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="w-full max-sm:hidden border-b-[1px] border-[#1E2D3D]">
          <div className="flex w-fit p-[12px] border-r-[1px] border-[#1E2D3D]">
            <span className="text-[#607B96] text-[16px]">
              {selectedCategories.length > 0
                ? selectedCategories.join("; ")
                : "All projects;"}
            </span>
          </div>
        </div>
        <div className="w-full px-[24px] overflow-y-auto max-h-[73dvh] py-[32px] sm:px-[40px] sm:py-[40px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px] flex-wrap h-full max-[1300px]:border-r-0">
          {filterProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;