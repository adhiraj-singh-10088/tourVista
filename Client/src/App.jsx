import { useEffect, useState } from "react";
import CardGrid from "./components/CardGrid";
import toursResponse from "./data/toursResponse";
import "./App.css";

function App() {
  const { status, results, data } = toursResponse;
  const tours = data.tours[0].data.tours;

  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("light-mode", isLightMode);
  }, [isLightMode]);

  return (
    <>
      <button className="mode-toggle" onClick={() => setIsLightMode(p => !p)}>
        {isLightMode ? "🌙 Dark" : "☀️ Light"}
      </button>

      <CardGrid status={status} results={results} tours={tours} />
    </>
  );
}

export default App;
