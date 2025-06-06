import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (newProduct) => {
        console.log("newProduct from rtk => ", newProduct);
        return {
          url: "/products",
          method: "POST",
          body: newProduct,
        };
      },
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getBestSellingProducts: builder.query({
      query: () => ({
        url: "/products/best-selling-products",
        method: "GET",
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, updatedProduct }) => {
        return {
          url: `/products/${id}`,
          method: "PUT",
          body: updatedProduct,
        };
      },
    }),
    updateSalesAndStock: builder.mutation({
      query: (products) => ({
        url: '/products/update-sales-and-stock',
        method: 'POST',
        body: { products },
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useGetBestSellingProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateSalesAndStockMutation,
  useDeleteProductMutation,
} = productApi;

export default productApi;
