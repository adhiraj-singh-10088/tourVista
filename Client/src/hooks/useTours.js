import { useEffect, useState } from "react";
import axios from "axios";

export default function useTours(perRow) {
  const [status, setStatus] = useState("loading");
  const [results, setResults] = useState(0);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (!perRow) return;

    async function loadTours() {
      try {
        setStatus("loading");

        const res = await axios.get("/api/v1/tours", {
          params: { perRow },
        });

        if (!mounted) return;

        setStatus(res.data.status || "success");
        setResults(
          res.data.results ??
            (res.data.data?.tours?.length ?? 0)
        );
        setTours(res.data.data?.tours || []);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
        if (!mounted) return;
        setStatus("error");
      }
    }

    loadTours();

    return () => {
      mounted = false;
    };
  }, [perRow]);

  return { status, results, tours };
}
