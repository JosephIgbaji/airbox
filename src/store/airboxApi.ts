import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const airboxApi = createApi({
  reducerPath: "airboxApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getBookings: builder.query<Booking[], void>({
      query: () => "bookings",
    }),
    createBooking: builder.mutation<Booking, Partial<Booking>>({
      query: (booking) => ({
        url: "bookings",
        method: "POST",
        body: booking,
      }),
    }),
    // Add more endpoints as needed
  }),
})

export const { useGetBookingsQuery, useCreateBookingMutation } = airboxApi

interface Booking {
  id: string
  name: string
  email: string
  date: string
  time: string
}

