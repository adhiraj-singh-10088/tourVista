import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TouristCard from "./TouristCard";
import TouristModal from "./TouristModal";
import "./CardGrid.css";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function CardGrid({ status, results, tours }) {
  const [selectedTour, setSelectedTour] = useState(null);
  // Initialize columns state from localStorage to persist layout across refreshes.
  // This prevents the grid from resetting to default before the ResizeObserver runs.
  const [columns, setColumns] = useState(() => {
    const saved = parseInt(localStorage.getItem("gridColumns"), 10);
    return isNaN(saved) ? 0 : saved;
  });
  const gridRef = useRef(null);

  useEffect(() => {
    // Only run logic if data is successfully loaded
    if (status !== "success") return;

    const updateColumns = () => {
      if (gridRef.current) {
        // Get the computed grid style to count the number of columns
        const gridStyle = window.getComputedStyle(gridRef.current);
        const gridTemplate = gridStyle.getPropertyValue("grid-template-columns");
        if (gridTemplate && gridTemplate !== "none") {
          const cols = gridTemplate.split(" ").length;
          // Update state and localStorage only if the column count changes
          setColumns((prev) => {
            if (prev !== cols) {
              localStorage.setItem("gridColumns", cols);
              return cols;
            }
            return prev;
          });
        }
      }
    };

    // Initial calculation
    updateColumns();

    // Use ResizeObserver to detect changes in the grid container's size
    // This is more robust than window.resize for responsive layouts
    const observer = new ResizeObserver(updateColumns);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, [status]);

  if (status !== "success") {
    return <p className="error">Failed to load tours.</p>;
  }

  // Calculate how many cards to show so that the last row is always full.
  // If we have columns (e.g., 3) and 10 tours, we show 9 (3 * 3).
  // If tours.length < columns, we show all available tours to avoid hiding everything.
  const visibleCount =
    columns > 0 && tours.length >= columns
      ? Math.floor(tours.length / columns) * columns
      : tours.length;
  // Slice the tours array to show only the calculated number of cards
  const visibleTours = tours.slice(0, visibleCount);

  return (
    <div className="card-grid-wrapper">
      <p className="results">Total tours: {results}</p>

      <div className="card-grid" ref={gridRef}>
        {visibleTours.map((tour) => (
          <motion.div
            key={tour.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <TouristCard
              tour={tour}
              isDimmed={selectedTour && selectedTour.id !== tour.id}
              onSelect={() => setSelectedTour(tour)}
            />
          </motion.div>
        ))}
      </div>

      {selectedTour && (
        <TouristModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </div>
  );
}

export default CardGrid;
