import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    verifyCode: builder.mutation({
      query: (payload) => ({
        url: "/auth/verify-code",
        method: "POST",
        body: payload,
      }),
    }),
    resendCode: builder.mutation({
  query: (data) => ({
    url: "/auth/resend-code",
    method: "POST",
    body: data,
  }),
}),

    login: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/change-password",
          method: "PATCH",
          body: payload,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/user/me', 
        method: 'PUT',
        body: data,
      }),
    }),
    getUserByEmail: builder.query({
      query: (email: string) => ({
        url: `/user/email/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyCodeMutation,
  useResendCodeMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useGetUserByEmailQuery
} = authApi;
