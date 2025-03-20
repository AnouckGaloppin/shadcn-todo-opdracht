import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category } from "@/types/categoryType";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mousy-cerulean-silica.glitch.me",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
    }),
  }),
});

export default categoriesApi;
export const { useGetCategoriesQuery } = categoriesApi;
