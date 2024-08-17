import React, { useState } from "react";
import { Config } from "../../constants/Index";
import CodeSnippet from "../../components/codeSnippet/CodeSnippet";
const About = () => {
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    contacts: true,
  });
  const [selectedContent, setSelectedContent] = useState(
    Config.personalInfo?.[0]?.options?.[0]?.data
  );
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const selectContent = (content) => {
    setSelectedContent(content);
  };
  const renderSidebarItem = (item, depth = 0) => {
    if (item.options) {
      return (
        <div key={item.label} className="flex flex-col gap-[8px]">
          <div
            className="flex items-center gap-[12px] group cursor-pointer"
            onClick={() => toggleSection(item.label)}
          >
            <i
              className={`ri-arrow-${
                expandedSections[item.label] ? "down" : "right"
              }-s-line text-[18px] text-[#607B96]`}
            ></i>
            <div className="flex items-center gap-[8px]">
              <i
                className={`ri-folder-3-fill text-[20px] text-[#${
                  item.label === "bio"
                    ? "E99287"
                    : item.label === "interests"
                    ? "43D9AD"
                    : "3A49A4"
                }]`}
              ></i>
              <span className="group-hover:text-[#FFF] transition-all">
                {item.label}
              </span>
            </div>
          </div>
          {expandedSections[item.label] && (
            <div className="ml-[30px]">
              {item.options.map((option) =>
                renderSidebarItem(option, depth + 1)
              )}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          key={item.label}
          className="flex items-center gap-[8px] group cursor-pointer"
          onClick={() => selectContent(item.data)}
        >
          <i
            className={`ri-${
              depth === 0 ? "file-text" : "school"
            }-fill text-[18px]`}
          ></i>
          <span className="group-hover:text-[#FFF] transition-all">
            {item.label}
          </span>
        </div>
      );
    }
  };
  return (
    <div className="flex items-start h-full">
      <div className="flex flex-col min-w-[301px] border-r-[1px] border-[#1E2D3D] h-full">
        <div
          className="flex items-center gap-[12px] p-[12px] py-[10px] border-b-[1px] border-[#1E2D3D] cursor-pointer group"
          onClick={() => toggleSection("personalInfo")}
        >
          <i
            className={`ri-arrow-${
              expandedSections.personalInfo ? "down" : "right"
            }-s-fill text-[18px] text-[#FFF] group-hover:text-[#607B96] transition-all`}
          ></i>
          <span className="text-[#FFF] text-[14px] group-hover:text-[#607B96] transition-all">
            personal-info
          </span>
        </div>
        {expandedSections.personalInfo && (
          <div className="flex flex-col gap-[8px] p-[12px] border-b-[1px] border-[#1E2D3D] py-[10px]">
            {Config.personalInfo.map(renderSidebarItem)}
          </div>
        )}
        <div
          className="flex items-center gap-[12px] p-[12px] py-[10px] border-b-[1px] border-[#1E2D3D] cursor-pointer group"
          onClick={() => toggleSection("contacts")}
        >
          <i
            className={`ri-arrow-${
              expandedSections.contacts ? "down" : "right"
            }-s-fill text-[18px] text-[#FFF] group-hover:text-[#607B96] transition-all`}
          ></i>
          <span className="text-[#FFF] text-[14px] group-hover:text-[#607B96] transition-all">
            contacts
          </span>
        </div>
        {expandedSections.contacts && (
          <div className="flex flex-col gap-[8px] p-[12px] py-[10px]">
            {Config.contactData.options.map((contact) => (
              <div
                key={contact.label}
                className="flex items-center gap-[8px] group cursor-pointer"
              >
                <i
                  className={`ri-${
                    contact.label.includes("@") ? "mail" : "phone"
                  }-fill text-[20px] text-[#607B96]`}
                ></i>
                <span className="group-hover:text-[#FFF] transition-all text-[#607B96]">
                  {contact.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col w-full border-r-[1px] border-[#1E2D3D] h-full">
        <div className="border-b-[1px] w-full border-[#1E2D3D]">
          <div className="flex items-center gap-[24px] p-[10px] px-[14px] border-r-[1px] w-fit border-[#1E2D3D]">
            <span className="text-[#607B96] text-[16px]">personal-info</span>
            <i className="ri-close-line text-[18px] text-[#607B96] transition-all hover:text-[#FFF] cursor-pointer"></i>
          </div>
        </div>
        <div className="flex items-start pt-[18px]">
          {selectedContent ? (
            <>
              <div className="px-[36px] w-1/2">
                <pre className="whitespace-pre-wrap">
                  {selectedContent.message}
                </pre>
              </div>
              <div className="w-1/2 px-[36px]">
                <CodeSnippet codeSnippet={selectedContent.codeSnippet} />
              </div>
            </>
          ) : (
            <div className="px-[36px]">
              Select an item from the sidebar to view content.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
