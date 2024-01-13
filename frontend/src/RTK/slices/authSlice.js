import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
} 

const authSlice = createSlice({
  name : 'auth',
  initialState, 
  reducers : {
    setCrediantels: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    }, 
    logOut : (state) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
    }
  }
})

export const {setCrediantels, logOut} = authSlice.actions;
export default authSlice.reducer
