import React from "react";
import { useSnackBarManager } from "./useSnackBarManager";
function useHandleResponse() {
  const { fnShowSnackBar } = useSnackBarManager();
  const handleResponse = (response: any, redirectPath?: string) => {
    if (response.success) {
      fnShowSnackBar({ message: response.message || "Done successfully" });
    } else {
      fnShowSnackBar({
        message: response.message || "Something went wrong!",
        error: true,
      });
    }
  };
  return { handleResponse };
}

export default useHandleResponse;
