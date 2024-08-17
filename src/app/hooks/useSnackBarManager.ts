import { useDispatch, useSelector } from "react-redux";
import {
  errorSelector,
  hideSnackBarMessage,
  setErrorTrue,
  setSnackBarMessage,
  snackBarMessageSelector,
} from "../redux/SnackBarReducer";

interface ShowSnackBarParams {
  message: string;
  error?: any;
}

export function useSnackBarManager() {
  const dispatch = useDispatch();
  const isShowSnackBar = useSelector(snackBarMessageSelector);
  const isError = useSelector(errorSelector);

  const fnShowSnackBar = ({ message, error }: ShowSnackBarParams) => {
    if (error) {
      dispatch(setErrorTrue());
    }
    if (message) {
      dispatch(setSnackBarMessage(message));
    }
    setTimeout(() => {
      dispatch(hideSnackBarMessage());
    }, 3000);
  };

  const fnHideSnackBar = () => {
    dispatch(hideSnackBarMessage());
  };

  return {
    isError,
    isShowSnackBar,
    fnShowSnackBar,
    fnHideSnackBar,
  };
}
