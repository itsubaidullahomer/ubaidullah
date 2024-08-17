import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
const CodeSnippet = ({ codeSnippet }) => {
  return (
    <div className="flex flex-col gap-[12px] w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[10px]">
          <img
            src="./profile80px.png"
            className="w-[36px] h-[36px] rounded-full object-cover"
            alt=""
          />
          <div className="flex flex-col gap-[2px]">
            <span className="text-[#5565E8] font-[600] text-[14px]">
              {codeSnippet.userName}
            </span>
            <span className="text-[12px]">Created {codeSnippet.created}</span>
          </div>
        </div>
        <div className="flex items-center gap-[18px]">
          <div className="flex items-end gap-[4px]">
            <i className="ri-chat-smile-3-fill text-[#607B96] text-[16px]"></i>
            <span className="text-[14px]">details</span>
          </div>
          <div className="flex items-end gap-[4px]">
            <i className="ri-star-fill text-[#607B96] text-[16px]"></i>
            <span className="text-[14px]">{codeSnippet.star} stars</span>
          </div>
        </div>
      </div>
      {/* <span className="overflow-hidden">
        <CopyBlock
          text={codeSnippet.code}
          language={codeSnippet.language}
          theme={dracula}
          showLineNumbers
        />
      </span> */}
          <SyntaxHighlighter language="javascript" style={solarizedlight}>
            {codeSnippet.code}
          </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
