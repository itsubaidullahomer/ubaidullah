import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface SnackBarState {
  message: string | null;
  error: boolean;
}
const initialState: SnackBarState = {
  message: null,
  error: false,
};
export const slice = createSlice({
  name: "SnackBarReducer",
  initialState,
  reducers: {
    setSnackBarMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
    setErrorTrue: (state) => {
      state.error = true;
    },
    hideSnackBarMessage: (state) => {
      state.message = null;
      state.error = false;
    },
  },
});
export const { setSnackBarMessage, hideSnackBarMessage, setErrorTrue } =
  slice.actions;
export const snackBarMessageSelector = (state: RootState) =>
  state.SnackBarReducer.message;
export const errorSelector = (state: RootState) => state.SnackBarReducer.error;
export default slice.reducer;
