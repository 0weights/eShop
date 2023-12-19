// here we create a slice not apislice cuase it'main purpose to deal with state
// create api is dealing with async requests
// slice bunch of recuders and ACTIONS that is related to each other
import { createSlice } from "@reduxjs/toolkit";

// where is localStorage comefrom 
// JSON vs json
// 'key' : value vs key : value
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :
  {cartItems : []};

const addDecimals = (num) => {
  return Math.round(num * 100 / 100).toFixed(2);
}

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
      
      state.itemsPrice = addDecimals(state.cartItems.reduce(
          // 0 is the default for the accumelator
          (acc,item) => acc + item.price * item.qty, 0
        )
      )

      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      state.taxPrice = addDecimals(Number( (0.15 * state.itemsPrice).toFixed(2)) );

      state.totalPrice = (
        Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state))
    }
  }
})

export const {addToCart} = cartSlice.actions;

// export reducer to inject it into hte store
export default cartSlice.reducer