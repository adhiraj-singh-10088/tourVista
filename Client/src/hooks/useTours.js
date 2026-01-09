import { useEffect, useState } from "react";
import axios from "axios";

export default function useTours() {
  const [status, setStatus] = useState("loading");
  const [results, setResults] = useState(0);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    let mounted = true;

    // FIX: The data fetching was refactored to use the `axios` library instead of the browser's native `fetch` API.
    // WHY: `axios` simplifies the code by automatically parsing JSON responses and provides better default error handling.
    // Unlike `fetch`, `axios` treats HTTP error statuses (like 404 or 500) as errors, which helps catch backend problems more easily in the `catch` block.
    async function loadTours() {
      try {
        const res = await axios.get("/api/v1/tours");
        if (!mounted) return;
        setStatus(res.data.status || "success");
        setResults(res.data.results || (res.data.data && res.data.data.tours ? res.data.data.tours.length : 0));
        setTours((res.data.data && res.data.data.tours) || []);
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
  }, []);

  return { status, results, tours };
}
