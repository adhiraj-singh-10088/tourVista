import { useEffect, useState } from "react"; 
import { useSearchParams } from "react-router-dom";
import CardGrid from "./CardGrid"; 
import useTours from "../../hooks/useTours"; 
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

  const { status, results, tours } = useTours(perRow); 

  const [searchParams] = useSearchParams();

  const filteredTours = (tours || []).filter((tour) => {
    const search = searchParams.get("search");
    if (search && !tour.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    const difficulty = searchParams.get("difficulty");
    if (difficulty && tour.difficulty !== difficulty) {
      return false;
    }

    const priceGte = searchParams.get("price[gte]");
    if (priceGte && tour.price < Number(priceGte)) {
      return false;
    }

    const ratingsGte = searchParams.get("ratingsAverage[gte]");
    if (ratingsGte && tour.ratingsAverage < Number(ratingsGte)) {
      return false;
    }

    return true;
  });

  const sort = searchParams.get("sort");
  if (sort === "price") filteredTours.sort((a, b) => a.price - b.price);
  if (sort === "-price") filteredTours.sort((a, b) => b.price - a.price);

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
