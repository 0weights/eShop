
// slice bunch of recuders and ACTIONS that is related to each other
import { createSlice } from "@reduxjs/toolkit";
import addToCartPriceCalculations from '../utilities/cartUtility'

// JSON vs json
// 'key' : value vs key : value
// to search why we choose cart is that cuase the reducer name is cart which is the state
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :
  {
    cartItems : [],
    count : 0,
    totalPrice : 0.00,
    addressInfo : {},
    checkOut : {
      steps : {
        "payment"    : true,
        "placeOrder" : true
      },
      payment : "paypal"
    } 
  };

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
      state = addToCartPriceCalculations(state);
    }, 

    addAddressInfo : (state, action) => {
      const addressInfo = action.payload;
      state.addressInfo = addressInfo;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    addPaymentInfo : (state, action) => {
      const paymentInfo = action.payload.payment;
      state.checkOut.payment = paymentInfo;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    updateCheckOutSteps : (state, action) => {
      const {step} = action.payload;
      console.log(state);
      state.checkOut.steps = {...state.checkOut.steps, [step] : false};
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart : (state, action) => {
      const itemId = action.payload;
      // why we have to use !== not != i change it to != and js extension will make yellow underLine
      state.cartItems = state.cartItems.filter((x) => x._id !== itemId);
      return addToCartPriceCalculations(state);
    }
  }
})

export const {addToCart, addAddressInfo, addPaymentInfo, updateCheckOutSteps,  removeFromCart} = cartSlice.actions;

// export reducer to inject it into hte store
export default cartSlice.reducer