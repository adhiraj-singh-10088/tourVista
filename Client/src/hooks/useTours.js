import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useTours(perRow, searchParams) {
  const { data, status } = useQuery({
    queryKey: ["tours", perRow, searchParams.toString()],

    queryFn: async () => {
      const paramsForBackend = new URLSearchParams(searchParams);
      paramsForBackend.delete("search");
      const queryString = paramsForBackend.toString();
      const res = await axios.get(
        `/api/v1/tours?perRow=${perRow}&${queryString}`
      );

      return res.data;
    },
  });

  return {
    status,

    results: data?.results || 0,

    tours: data?.data?.tours || [],
  };
}
