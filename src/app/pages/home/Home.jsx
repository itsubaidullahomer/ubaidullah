import React from "react";
import { Config } from "../../constants/Index";

const Home = () => {
  console.log("home");
  return (
    <div className="flex items-center h-full justify-between gap-[80px] px-[6vw] overflow-hidden">
      <div className="flex flex-col gap-[80px] relative ">
        <div className="max-sm:z-[1] flex flex-col gap-[2px]">
          <span className="text-[18px] text-[#E5E9F0]">Hi all. I am</span>
          <h2 className="text-[48px] sm:text-[62px] text-[#E5E9F0]">
            Ubaidullah Omer
          </h2>
          <span className="text-[#4D5BCE] max-sm:text-[24px] text-[32px]">
            {`> Front-end developer`}
          </span>
        </div>
        <div className="max-sm:z-[1] flex flex-col gap-[8px]">
          <span className="text-[#607B96]">
            // complete the game to continue
          </span>
          <span className="text-[#607B96]">
            // you can also see it on my Github page
          </span>
          <span className="text-[#FFF]">
            <span className="text-[#4D5BCE]">const </span>
            <a
              href={Config.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#43D9AD] cursor-pointer transition-transform duration-5000 transform hover:scale-110 hover:text-[#36C29D] hover:underline hover:decoration-wavy"
            >
              githubLink
            </a>
            = <span className="text-[#E99287]">“{Config.githubUrl}”</span>
          </span>
        </div>
        <div className="sm:hidden blobAnimeGreen h-[500px] absolute top-0 left-0 w-[500px] bg-[#43D9AD] opacity-20 blur-[174px]"></div>
        <div className="sm:hidden blobAnimePurple absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#4D5BCE] opacity-20 blur-[174px]"></div>
      </div>
      <div className="relative max-lg:hidden">
        <div className="relative flex items-center justify-center overflow-hidden flex-col gap-[18px] max-h-[75dvh]">
          <div className="absolute inset-0 z-[2]"></div>
          <img
            src="/images/codeSnippet.png"
            className="select-none z-[1] opacity-10"
            alt=""
          />
          <img
            src="/images/codeSnippet.png"
            className="select-none z-[1] opacity-40"
            alt=""
          />
          <img
            src="/images/codeSnippet.png"
            className="select-none z-[1]"
            alt=""
          />
          <img
            src="/images/codeSnippet.png"
            className="select-none z-[1] opacity-40"
            alt=""
          />
          <img
            src="/images/codeSnippet.png"
            className="select-none z-[1] opacity-10"
            alt=""
          />
        </div>
        <div className="blobAnimeGreen h-[500px] absolute top-0 left-0 w-[500px] bg-[#43D9AD] opacity-40 blur-[174px]"></div>
        <div className="blobAnimePurple absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#4D5BCE] opacity-40 blur-[174px]"></div>
      </div>
    </div>
  );
};

export default Home;
