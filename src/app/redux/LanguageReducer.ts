import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface LoaderState {
  selectedLanguage: string;
}

const getInitialLanguage = (): string => {
  const storedLanguage = localStorage.getItem("selectedLanguage");
  return storedLanguage || "en";
};

const initialState: LoaderState = {
  selectedLanguage: getInitialLanguage(),
};

export const slice = createSlice({
  name: "LanguageReducer",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
      localStorage.setItem("selectedLanguage", action.payload);
    },
  },
});

export const { setLanguage } = slice.actions;

export const selectLanguage = (state: RootState) =>
  state.LanguageReducer.selectedLanguage;

export default slice.reducer;
