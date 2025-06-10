import { baseApi } from "@/redux/api/baseApi";
import { ICoupon } from "@/types";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE (Create a New Coupon) 
    createCoupon: builder.mutation({
      query: (newCoupon) => {
        return {
          url: "/coupons",
          method: "POST",
          body: newCoupon,
        };
      },
    }),

    // READ (Get All Coupons)
    getCoupons: builder.query<{ data: ICoupon[] }, void>({
      // void means no arguments
      query: () => ({
        url: "/coupons",
        method: "GET",
      }),
    }),

    // READ (Get a Specific Coupon) - Assuming you need this
    getCoupon: builder.query<ICoupon, string>({
      // string is the coupon ID
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "GET",
      }),
    }),

    // UPDATE
    updateCoupon: builder.mutation({
      query: ({ id, updatedCoupon }) => {
        return {
          url: `/coupons/${id}`,
          method: "PATCH",
          body: updatedCoupon,
        };
      },
    }),

    // DELETE
    deleteCoupon: builder.mutation({
      query: (id) => {
        return {
          url: `/coupons/${id}`,
          method: "DELETE",
        };
      },
    }),
    validateCoupon: builder.query({
      query: (code) => ({
        url: `/coupons/validate/${code}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetCouponsQuery,
  useGetCouponQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useValidateCouponQuery,
  useLazyValidateCouponQuery
} = couponApi;

export default couponApi;