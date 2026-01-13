import { useEffect, useState } from "react"; 
import CardGrid from "../components/CardGrid"; 
import useTours from "../hooks/useTours"; 
import './HomePage.css' 

function HomePage() { 
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

return ( 
  <div className={status === "loading" ? "dark-background" : ""}>
     {status === "loading" ? (
       <p className="loading">Loading tours…</p> 
      ) : ( 
      <CardGrid
       status={status}
        results={results}
         tours={tours}
         /> 
    )} 
    </div>
     ); 
    } 

 export default HomePage;
