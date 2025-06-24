// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://camp-store-server.vercel.app/api' }),
//   endpoints: () => ({}),
// baseUrl: "http://localhost:5000/api",
// })
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/Auth/authSlice";

const BaseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api",
  baseUrl: "https://halal-zone-server.onrender.com/api",
  credentials: "include",
  //send access token(AT) for curd oparetion
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const CustomBaseQueryWitheRefreashToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await BaseQuery(args, api, extraOptions);
  // if access token expire, send refresh token(RT) from cookies
  if (result.error?.status === 401) {
    // const res = await fetch("http://localhost:5000/api/auth/refresh-token", {
      const res = await fetch("https://halal-zone-server.onrender.com/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      // after provide valid RT, it send valid AT
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await BaseQuery(args, api, extraOptions);
    } else {
      // if AT token is invalid, meaning RT validity over this time we logout user
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: CustomBaseQueryWitheRefreashToken,
  endpoints: () => ({}),
});
