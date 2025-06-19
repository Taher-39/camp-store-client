import { baseApi } from "@/redux/api/baseApi";
import { IReview } from "@/types";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE Review
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: '/reviews',
        method: 'POST',
        body: reviewData,
      })
    }),

    // GET Reviews by Product ID
    getProductReviews: builder.query<{ data: IReview[] }, string>({
      query: (productId) => ({
        url: `/reviews/product/${productId}`,
        method: 'GET',
      })
    }),

    // GET User's Reviews
    getUserReviews: builder.query<{ data: IReview[] }, void>({
      query: () => ({
        url: '/reviews/me',
        method: 'GET',
      })
    }),

    // GET All Reviews (Admin)
    getAllReviews: builder.query<{ data: IReview[] }, void>({
      query: () => ({
        url: '/reviews',
        method: 'GET',
      })
    }),

    // UPDATE Review
    updateReview: builder.mutation({
      query: ({ reviewId, updatedReview }) => ({
        url: `/reviews/${reviewId}`,
        method: 'PATCH',
        body: updatedReview,
      })
    }),

    // DELETE Review
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: 'DELETE',
      })
    }),

    // Upload Review Images
    uploadReviewImages: builder.mutation({
      query: (files) => {
        const formData = new FormData();
        files.forEach((file: File) => {
          formData.append('files', file);
        });
        return {
          url: '/upload/review-images',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetProductReviewsQuery,
  useGetUserReviewsQuery,
  useGetAllReviewsQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useUploadReviewImagesMutation,
} = reviewApi;

export default reviewApi;