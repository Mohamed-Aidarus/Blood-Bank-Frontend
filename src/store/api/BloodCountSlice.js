import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api/bloodcount";

export const bloodCountSlice = createApi({
  reducerPath: "bloodCountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["BloodCounts"],
  endpoints: (builder) => ({
    // Fetch Blood Count
    fetchBloodCount: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["BloodCounts"],
    }),
  }),
});

export const {
  useFetchBloodCountQuery,
} = bloodCountSlice;
export default bloodCountSlice.reducer;
