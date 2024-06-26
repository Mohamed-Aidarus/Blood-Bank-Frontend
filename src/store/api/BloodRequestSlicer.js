import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api/bloodRequest";

export const bloodRequestSlice = createApi({
  reducerPath: "bloodRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["BloodRequests"],
  endpoints: (builder) => ({
    // Fetch All Blood Requests
    fetchBloodRequests: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["BloodRequests"],
    }),

    // Create Blood Request
    createBloodRequest: builder.mutation({
      query: (newBloodRequest) => ({
        url: "/",
        method: "POST",
        body: newBloodRequest,
      }),
      invalidatesTags: ["BloodRequests"],
    }),

    // Delete Blood Request
    deleteBloodRequest: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BloodRequests"],
    }),
  }),
});

export const {
  useFetchBloodRequestsQuery,
  useCreateBloodRequestMutation,
  useDeleteBloodRequestMutation,
} = bloodRequestSlice;
export default bloodRequestSlice.reducer;
