import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :
  null;

const authSlice = createSlice({
  name : 'auth',
  initialState, 
  reducers : {
    setCrediantels: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    }, 
  }
})

export const {setCrediantels} = authSlice.actions;
export default authSlice.reducer
