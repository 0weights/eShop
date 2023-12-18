import { PRODUCTS_URl } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URl,
      }),
        keepUnusedDataFor: 5,
    }),
    getProduct : builder.query({
      query: (id) => ({
          url : `${PRODUCTS_URl}/${id}`
        }),
        keepUnusedDataFor: 5,
    })
  })
})

export const {useGetProductsQuery, useGetProductQuery} = productsApiSlice;