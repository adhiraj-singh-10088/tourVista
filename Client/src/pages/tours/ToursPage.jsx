import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardGrid from "@components/common/CardGrid";
import useTours from "@hooks/useTours";
import './ToursPage.css'

function ToursPage() {
  const [perRow, setPerRow] = useState(1);

  useEffect(() => {
    let timeoutId;
    const calculatePerRow = () => {
      const cardMinWidth = 400;
      const gap = 32;
      const horizontalPadding = 48;
      const availableWidth = document.documentElement.clientWidth - horizontalPadding;
      const cardsThatFit = Math.floor((availableWidth + gap) / (cardMinWidth + gap));
      setPerRow(Math.max(1, cardsThatFit));
    };

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculatePerRow, 200);
    };

    calculatePerRow();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const [searchParams] = useSearchParams();

  const { status, results, tours } = useTours(perRow, searchParams);

  const filteredTours = (tours || []).filter((tour) => {
    const search = searchParams.get("search");
    if (search && !tour.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    return true; // Keep the tour if it matches the name search
  }); // <--- This closes the filter function properly!

  // Now we return the HTML (JSX) for the page
  return (
    <div className={status === "loading" ? "dark-background" : ""}>
      {status === "loading" ? (
        <p className="loading">Loading tours…</p>
      ) : (
        <CardGrid
          status={status}
          results={filteredTours.length}
          tours={filteredTours}
          perRow={perRow}
        />
      )}
    </div>
  );
}

export default ToursPage;
