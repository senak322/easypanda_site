import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order, OrderResponse, CreateOrderRequest } from "../types/types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, CreateOrderRequest>({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
      }),
    }),
    getOrderStatus: builder.query<Order, string>({
      query: (orderId) => `orders/${orderId}`,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderStatusQuery } = apiSlice;