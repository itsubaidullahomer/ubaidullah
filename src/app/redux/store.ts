import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { adminDzfood } from "./storeApis";
import LoaderReducer from "./LoaderReducer";
import LanguageReducer from "./LanguageReducer";
import SnackBarReducer from "./SnackBarReducer";

const appReducer = combineReducers({
  LoaderReducer,
  LanguageReducer,
  SnackBarReducer,
  [adminDzfood.reducerPath]: adminDzfood.reducer,
});

type AppReducer = ReturnType<typeof appReducer>;

const rootReducer = (state: AppReducer | undefined, action: any) => {
  if (action.type === "logout") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(adminDzfood.middleware),
});

setupListeners(store.dispatch);
