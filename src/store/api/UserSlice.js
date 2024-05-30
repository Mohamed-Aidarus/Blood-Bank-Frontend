import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api/user";

export const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // Fetch All Users
    fetchUsers: builder.query({
      query: () => {
        return {
          url: "/",
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),

    // // Fetch Single User
    // fetchUserByEmail: builder.query({
    //   query: (email) => ({
    //     url: `/login/${email}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Users"],
    // }),

    // Add User
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),

    // Add Multiple Users
    addUsers: builder.mutation({
      query: (newUsers) => ({
        url: "/CreateUsers",
        method: "POST",
        body: newUsers,
      }),
      invalidatesTags: ["Users"],
    }),

    // Update User
    updateUser: builder.mutation({
      query: ({ userId, updatedUser }) => ({
        url: `/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),

    // Delete User
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // User Login
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Users"],
    }),

    // Forgot Password
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgotPassword",
        method: "POST",
        body: email,
      }),
    }),
    // Reset Password
    // Reset Password
    // Reset Password
    resetPassword: builder.mutation({
      query: ({ email , password, passwordConfirm }) => ({
        url: "/resetPassword",
        method: "POST",
        body: { email, password, passwordConfirm },
      }),
    }),
  }),
});

export const {
  useResetPasswordMutation,
  useFetchUsersQuery,
  //   useFetchUserByEmailQuery,
  useAddUserMutation,
  useAddUsersMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
} = userSlice;
console.log(userSlice);
export default userSlice.reducer;
