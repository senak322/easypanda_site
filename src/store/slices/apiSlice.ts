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
    getOrder: builder.query({
      query: (hash) => `orders/${hash}`,
    }),
    closeOrder: builder.mutation({
      query: (hash) => ({
        url: `orders/${hash}/close`,
        method: "PATCH",
      }),
    }),
    acceptOrder: builder.mutation<any, { hash: string; formData: FormData }>({
      query: ({hash, formData}) => ({
        url: `orders/${hash}/accept`,
        method: "PATCH",
        body: formData,
      }),
    }),
    getWaitingOrders: builder.query({
      query: () => ({
        url: "orders/waitingApprove",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useCloseOrderMutation,
  useAcceptOrderMutation,
  useGetWaitingOrdersQuery
} = apiSlice;
