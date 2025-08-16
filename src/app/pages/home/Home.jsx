import React from "react";
import { Config } from "../../constants/Index";
import SnakeGame from "../../components/snakeGame/SnakeGame";

const Home = () => {
  return (
    <div className="flex items-center h-full justify-between gap-[80px] px-[6vw] overflow-hidden">
      <div className="flex flex-col gap-[80px] relative ">
        <div className="max-sm:z-[1] flex flex-col gap-[2px]">
          <span className="text-[18px] text-[#E5E9F0]">Hi all. I am</span>
          <h2 className="flex  items-center gap-[8px] text-[48px] sm:text-[62px] text-[#E5E9F0]">
            {/* <img src="./profile80px.png" className="rounded-[6px] w-[52px]" alt="" /> */}
            Ubaidullah Omer
          </h2>
          <span className="text-[#4D5BCE] max-sm:text-[24px] text-[32px]">
            {`> Full Stack Developer`}
          </span>
        </div>
        <div className="max-sm:z-[1] flex flex-col gap-[8px]">
          <span className="text-[#607B96]">
            // complete the game to continue
          </span>
          <span className="text-[#FFF]">
            <span className="text-[#4D5BCE]">const </span>
            <a
              href={Config.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#43D9AD] cursor-pointer transition-transform duration-5000 transform hover:scale-110 hover:text-[#36C29D] hover:underline hover:decoration-wavy"
            >
              Linkedin{" "}
            </a>
            ={" "}
            <span className="text-[#E99287]">
              <a
                className="cursor-pointer"
                href={Config.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                “{Config.linkedinUrl}”
              </a>
            </span>
          </span>
        </div>
        <div className="sm:hidden blobAnimeGreen h-[500px] absolute top-0 left-0 w-[500px] bg-[#43D9AD] opacity-20 blur-[174px]"></div>
        <div className="sm:hidden blobAnimePurple absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#4D5BCE] opacity-20 blur-[174px]"></div>
      </div>
      <SnakeGame />
    </div>
  );
};

export default Home;
