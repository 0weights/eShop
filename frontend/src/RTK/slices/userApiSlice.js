import { USERS_URl } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // we change builder.query to builder.mutation why
    authUser: builder.mutation({
      query: (data) => ({
        url: USERS_URl+"/auth",
        method : "POST",
        body : data
      })
    }),
  })
})

export const {useauthUserQuery} = usersApiSlice;