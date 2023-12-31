import { configureStore } from "@reduxjs/toolkit";
// different between importing {} and not using {}
import { apiSlice } from "./slices/apiSlice";
// we imported somehting doesn't exist from cartSlice how
import cartSliceReducer from './slices/cartSlice.js'
import authSliceReducer from "./slices/authSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath] : apiSlice.reducer,
    cart : cartSliceReducer,
    auth : authSliceReducer
  },
  middleware: (getDefaultMiddlewaer) => getDefaultMiddlewaer().concat(apiSlice.middleware),
  devTools: true,
});
export default store;