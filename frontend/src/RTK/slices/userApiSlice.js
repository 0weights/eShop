import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // we change builder.query to builder.mutation why
    auth: builder.mutation({
      query: (data) => ({
        url: USERS_URL+"/auth",
        method : "POST",
        body : data
      })
    }),
  })
})

export const {useAuthMutation} = usersApiSlice;