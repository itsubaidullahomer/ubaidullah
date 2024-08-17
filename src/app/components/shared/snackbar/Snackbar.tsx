import React from "react";
import { useSnackBarManager } from "../../../hooks/useSnackBarManager";

const SnackBar = () => {
  const {  fnHideSnackBar, isError, isShowSnackBar } = useSnackBarManager();
  const style = {
    snackBar: `flex items-center justify-center fixed top-[30px] p-[12px] px-[20px] ${
      isShowSnackBar ? "right-[30px]" : "right-[-30px]"
    } ${
      isError ? "bg-[#c53030]" : "bg-[#4A6DA7]"
    } text-[#FFF] shadow-md gap-[16px] rounded-[10px] z-[9999]
    transition-transform duration-300 ease-in-out`,
  };
  return (
    <div
      className={`${style.snackBar} ${
        isShowSnackBar
          ? "transform translate-x-0"
          : "transform translate-x-full"
      }`}
      style={{ zIndex: 9999 }}
    >
      <i
        onClick={() => {
          fnHideSnackBar();
        }}
        className={`${
          isError ? " ri-error-warning-fill " : " ri-check-double-line "
        } icon cursor__p  `}
      ></i>
      <span className="poppins__14 !text-[#FFF] capitalize">
        {isShowSnackBar}
      </span>
    </div>
  );
};

export default SnackBar;
