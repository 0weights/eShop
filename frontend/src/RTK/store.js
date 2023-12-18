import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    // this line need to be rechecked when adding another reudcer
    [apiSlice.reducerPath] : apiSlice.reducer,
  },
  middleware: (getDefaultMiddlewaer) => getDefaultMiddlewaer().concat(apiSlice.middleware),
  devTools: true,
});
export default store;