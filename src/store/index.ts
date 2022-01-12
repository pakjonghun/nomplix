import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
});

export type TypeDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
