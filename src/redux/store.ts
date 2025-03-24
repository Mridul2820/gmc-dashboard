import { configureStore } from "@reduxjs/toolkit";

import additionalSlice from "./slices/additionalSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      additional: additionalSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
