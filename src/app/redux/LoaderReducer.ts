import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface LoaderState {
  isLoading: boolean;
}
const initialState: LoaderState = {
  isLoading: false,
};
export const slice = createSlice({
  name: "LoaderReducer",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetLoaderReducer: (state) => {
      state.isLoading = false;
    },
  },
});
export const { showLoader, hideLoader, setIsLoading, resetLoaderReducer } =
  slice.actions;
export const selectedIsLoading = (state: RootState) =>
  state.LoaderReducer.isLoading;
export default slice.reducer;
