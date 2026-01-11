import { useState } from "react";
import CardGrid from "../components/CardGrid";
import useTours from "../hooks/useTours";
import "./HomePage.css";

function HomePage() {
  const [perRow, setPerRow] = useState(() => {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 900) return 3;
    if (width >= 600) return 2;
    return 1;
  });
  const { status, results, tours } = useTours(perRow);

  return (
    <div className={status === "loading" ? "dark-background" : ""} style={{ minHeight: "100vh", overflowY: "scroll" }}>
      {status === "loading" ? (
        <p className="loading">Loading tours…</p>
      ) : (
        <CardGrid
          status={status}
          results={results}
          tours={tours}
          onPerRowChange={setPerRow}
          perRow={perRow}
        />
      )}
    </div>
  );
}

export default HomePage;
