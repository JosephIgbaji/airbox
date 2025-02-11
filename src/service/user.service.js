import { GETUSER, LOGIN, REGISTER } from "./constants";
import apiSlice from "./api/apiSlice";
import { updateUser } from "../redux/userSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login users route
    loginUser: builder.mutation({
      query: (userData) => ({
        url: LOGIN,
        body: userData,
        method: "POST",
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log(data, "data");
          // const { accessToken, user } = data;
          const accessToken = data.token;
          const user = data.data;
          const refreshToken = data.token;

          console.log(accessToken, "data");

          dispatch(
            updateUser({
              token: accessToken,
              user,
              refreshToken: refreshToken,
            })
          );
        } catch (error) {
          console.log(error);
          return;
        }
      },
      transformResponse: (response) => {
        console.log(response, "rtk");
        return response;
      },
      invalidatesTags: ["User"],
    }),

    // Register users route
    registerUser: builder.mutation({
      query: (userData) => ({
        url: REGISTER,
        body: userData,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // Get user route
    getUser: builder.query({
      query: () => ({
        url: GETUSER,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
} = userApiSlice;
