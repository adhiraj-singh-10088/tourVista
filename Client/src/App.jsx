import { useEffect, useState } from "react";
import CardGrid from "./components/CardGrid";
import "./App.css";

function App() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [status, setStatus] = useState("loading");
  const [results, setResults] = useState(0);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    document.body.classList.toggle("light-mode", isLightMode);
  }, [isLightMode]);

  useEffect(() => {
    async function loadTours() {
      try {
        const res = await fetch("/api/v1/tours");
        const json = await res.json();
        setStatus(json.status || (res.ok ? "success" : "error"));
        setResults(json.results || (json.data && json.data.tours ? json.data.tours.length : 0));
        setTours((json.data && json.data.tours) || []);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
        setStatus("error");
      }
    }

    loadTours();
  }, []);

  return (
    <>
      <button className="mode-toggle" onClick={() => setIsLightMode((p) => !p)}>
        {isLightMode ? "🌙 Dark" : "☀️ Light"}
      </button>

      {status === "loading" ? (
        <p className="loading">Loading tours…</p>
      ) : (
        <CardGrid status={status} results={results} tours={tours} />
      )}
    </>
  );
}

export default App;
