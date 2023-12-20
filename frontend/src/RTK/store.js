import { configureStore } from "@reduxjs/toolkit";
// different between importing {} and not using {}
import { apiSlice } from "./slices/apiSlice";
// we imported somehting doesn't exist from cartSlice how
import cartSliceReducer from './slices/cartSlice.js'

const store = configureStore({
  reducer: {
    // this line need to be rechecked when adding another reudcer
    [apiSlice.reducerPath] : apiSlice.reducer,
    // first is the name of the state
    cart : cartSliceReducer,

  },
  middleware: (getDefaultMiddlewaer) => getDefaultMiddlewaer().concat(apiSlice.middleware),
  devTools: true,
});
export default store;