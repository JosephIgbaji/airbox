import { GETALLBOOKINGS, ADDBOOKING } from "./constants";
import apiSlice from "./api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Last update route
    addBooking: builder.mutation({
      query: (data) => ({
        url: GETALLBOOKINGS,
        method: "POST",
        body: data,
      }),
      providesTags: ["Booking"],
    }),
    updateBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: `${GETALLBOOKINGS}/${id}`,
        method: "PUT",
        body: data,
      }),
      providesTags: ["Booking"],
    }),

    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `${GETALLBOOKINGS}/${id}`,
        method: "DELETE",
      }),
      providesTags: ["Booking"],
    }),
    getAllBooking: builder.query({
      query: () => ({
        url: ADDBOOKING,
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
