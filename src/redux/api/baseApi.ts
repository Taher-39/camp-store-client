import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://camp-store-server.vercel.app/api' }),
  endpoints: () => ({}),
})
