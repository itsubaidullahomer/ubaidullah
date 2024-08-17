import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage, setLanguage } from "../redux/LanguageReducer";

function useHandleLanguage() {
  const selectedLanguage = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const handleLanguage = (value: string) => {
    dispatch(setLanguage(value));
  };
  return { selectedLanguage, handleLanguage };
}

export default useHandleLanguage;
