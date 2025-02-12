import { GETMETRICS } from "./constants";
import apiSlice from "./api/apiSlice";

export const metricApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Metric Route
    getAllMetric: builder.query({
      query: () => ({
        url: GETMETRICS,
        method: "GET",
      }),
      providesTags: ["Metric"],
    }),
  }),
});

export const { useGetAllMetricQuery } = metricApiSlice;
