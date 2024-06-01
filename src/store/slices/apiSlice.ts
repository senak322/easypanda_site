import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Order } from "../types/types";
// debugger
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "orders",
        method: "POST",
        body: formData,
      }),
    }),
    // getOrderStatus: builder.query<Order, string>({
    //   query: (hash) => `orders/${hash}`,
    // }),
    getOrder: builder.query({
      query: (hash) => `orders/${hash}`,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderQuery } = apiSlice;