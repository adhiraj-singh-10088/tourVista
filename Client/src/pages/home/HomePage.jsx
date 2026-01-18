import { useRef } from "react";
import { useInView } from "framer-motion";
import ResponsiveImage from "./ResponsiveImage.jsx";
import Title from "./Title.jsx";
import Mountain from "./Mountain.jsx";
import Info from "./Info.jsx";

import TourVista3 from "../../assets/TourVista3.png";
import TourVistaBG from "../../assets/TourVistaBG.png";
import CloudsIMG from '../../assets/CloudsIMG.png';
import LeavesIMG from '../../assets/LeavesIMG.png';

import "./HomePage.css";

function HomePage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { amount: 0.01 });

  return (
    <div className="scroll-container">

      {/* HERO SECTION */}
      <section className="page hero-container" ref={heroRef}>
        {isHeroInView && (
          <>
            <ResponsiveImage
              lowSrc={TourVista3}
              highSrc={TourVistaBG}
              alt="Hero image"
              priority={true}
            />
            <Title />
            <Mountain />
          </>
        )}
      </section>

      {/* TRANSITION BRIDGE */}
      <div className="section-bridge">
        <img className="clouds-img" src={CloudsIMG} alt="CloudsIMG" />
      </div>

      {/* INFO SECTION */}
      <section className="page info-section">
        <img src={LeavesIMG} alt="LeavesIMG" className="leaves-img" />
      </section>
    </div>

  );
}

export default HomePage;
