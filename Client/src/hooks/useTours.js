import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// This hook fetches tours data from the backend
// It depends on `perRow`, which comes from the frontend layout

export default function useTours(perRow) {
  // useQuery is a React Query hook that handles:
  // - fetching data
  // - loading state
  // - error state
  // - caching
  // - refetching when dependencies change
  const { data, status } = useQuery({
    // queryKey uniquely identifies this request in React Query's cache
    // Including `perRow` means:
    // if perRow changes → this is considered a NEW request
    queryKey: ["tours", perRow],

    // queryFn is the function React Query calls to fetch data
    // We pass `perRow` so the backend knows how many tours to send
    queryFn: async () => {
      // Make a GET request to the backend API
      // perRow is sent as a query parameter
      const res = await axios.get(
        `/api/v1/tours?perRow=${perRow}`
      );

      // Return ONLY the data portion of the response
      // React Query stores this as `data`
      return res.data;
    },
  });

  // Return a clean, frontend-friendly object
  return {
    // status tells the UI whether data is:
    // "loading", "success", or "error"
    status,

    // results is the total number of tours returned
    // Optional chaining prevents crashes if data is undefined
    results: data?.results || 0,

    // tours is the actual array of tour objects
    // Defaults to empty array while loading
    tours: data?.data?.tours || [],
  };
}
