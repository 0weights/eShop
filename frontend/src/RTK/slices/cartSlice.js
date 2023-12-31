
// slice bunch of recuders and ACTIONS that is related to each other
import { createSlice } from "@reduxjs/toolkit";
import addToCartPriceCalculations from '../utilities/cartUtility'

// JSON vs json
// 'key' : value vs key : value
// to search why we choose cart is that cuase the reducer name is cart which is the state
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :
  {cartItems : [], count : 0};

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
      // why we use return the funtion not returning anything OK why even returuing
      return addToCartPriceCalculations(state);
    }, 
    removeFromCart : (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id != itemId);
      return addToCartPriceCalculations(state);
    }
  }
})


export const {addToCart, removeFromCart} = cartSlice.actions;

// export reducer to inject it into hte store
export default cartSlice.reducer