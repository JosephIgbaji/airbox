import { BOOKINGS } from "./constants";
import apiSlice from "./api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Last update route
    addBooking: builder.mutation({
      query: (data) => ({
        url: BOOKINGS,
        method: "POST",
        body: data,
      }),
      providesTags: ["Booking"],
    }),
    updateBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BOOKINGS}/${id}`,
        method: "PUT",
        body: data,
      }),
      providesTags: ["Booking"],
    }),

    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `${BOOKINGS}/${id}`,
        method: "DELETE",
      }),
      providesTags: ["Booking"],
    }),
    getAllBooking: builder.query({
      query: () => ({
        url: BOOKINGS,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetAllBookingQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
  useAddBookingMutation,
} = userApiSlice;
