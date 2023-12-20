
// slice bunch of recuders and ACTIONS that is related to each other
import { createSlice } from "@reduxjs/toolkit";
import addToCartPriceCalculations from '../utilities/cartUtility'

// JSON vs json
// 'key' : value vs key : value
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :
  {cartItems : []};



// check if the card has data in the local storage
const cartSlice = createSlice({
  name : 'cart',
  initialState, 
  reducers : {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if(existItem){
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
      }
      else {
        state.cartItems = [...state.cartItems, item];
      }
      
      state = addToCartPriceCalculations(state);

    }
  }
})

export const {addToCart} = cartSlice.actions;
// export const {addToCartActionCreator} = cartSlice.actions;

// export reducer to inject it into hte store
export default cartSlice.reducer