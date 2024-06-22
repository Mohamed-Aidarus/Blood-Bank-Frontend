import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000/api/donate';

export const donationSlice = createApi({
  reducerPath: 'donationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Donations'],
  endpoints: (builder) => ({
    // Fetch All Donations
    fetchDonations: builder.query({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['Donations'],
    }),

    // Create Donation
    createDonation: builder.mutation({
      query: (newDonation) => ({
        url: '/',
        method: 'POST',
        body: newDonation,
      }),
      invalidatesTags: ['Donations'],
    }),

    // Delete Donation
    deleteDonation: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Donations'],
    }),
  }),
});

export const {
  useFetchDonationsQuery,
  useCreateDonationMutation,
  useDeleteDonationMutation,
} = donationSlice;
export default donationSlice.reducer;
