import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import TouristCard from "./TouristCard";
import TouristModal from "./TouristModal";
import "./CardGrid.css";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function CardGrid({ status, results, tours, onPerRowChange, perRow }) {
  const gridRef = useRef(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const lastReportedPerRow = useRef(perRow);

useEffect(() => {
  if (!gridRef.current || !onPerRowChange) return;

  const grid = gridRef.current;
  let rafId = null;
    let timeoutId = null;

  const updatePerRow = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
          const children = grid.children;
          if (!children.length) return;

          const firstTop = children[0].offsetTop;
          let count = 0;

          for (let el of children) {
            if (el.offsetTop === firstTop) count++;
            else break;
          }

          if (count > 0 && count !== perRow && count !== lastReportedPerRow.current) {
            lastReportedPerRow.current = count;
            onPerRowChange(count);
          }
        });
      }, 100);
  };

  // Initial measurement
  updatePerRow();

  const observer = new ResizeObserver(updatePerRow);
  observer.observe(grid);

  return () => {
    cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    observer.disconnect();
  };
}, [onPerRowChange, perRow]);



  if (status === "error") {
    return <p className="error">Failed to load tours.</p>;
  }

  return (
    <div className="card-grid-wrapper">
      <p className="results">Total tours: {results}</p>

      <div ref={gridRef} className="card-grid">
        {tours.map((tour) => (
          <motion.div
            key={tour.id}
            variants={cardVariants}
            layout="position"
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
