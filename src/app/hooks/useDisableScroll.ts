import { useEffect } from "react";

const useDisableScroll = (condition: boolean) => {
    useEffect(() => {
        if (condition) {
            document.body.classList.add("stop-scrolling");
        } else {
            document.body.classList.remove("stop-scrolling");
        }
        return () => {
            document.body.classList.remove("stop-scrolling");
        };
    }, [condition]);
};

export default useDisableScroll;
