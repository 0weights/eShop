import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) =>({
        url : `${USERS_URL}/register`,
        method : 'POST', 
        body : data
      })
    }),
    // we change builder.query to builder.mutation why
    auth: builder.mutation({
      query: (data) => ({
        url: USERS_URL+"/auth",
        method : "POST",
        body : data
      })
    }),
    logOut: builder.mutation({
      query: () => ({
        url : USERS_URL+"/logout",
        method : 'POST',
      })
    }),
  })
})

export const {useAuthMutation, useLogOutMutation, useRegisterMutation} = usersApiSlice;