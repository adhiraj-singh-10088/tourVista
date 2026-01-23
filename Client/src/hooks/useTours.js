import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useTours(perRow) {
  const { data, status } = useQuery({
    queryKey: ["tours", perRow],

    queryFn: async () => {
      const res = await axios.get(
        `/api/v1/tours?perRow=${perRow}`
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
