import { useRef } from "react";
import { useInView } from "framer-motion";
import ResponsiveImage from "./ResponsiveImage.jsx";
import Title from "./Title.jsx";
import Mountain from "./Mountain.jsx";
import FeaturedTours from "./FeaturedTours.jsx";
import InfoOverlay from "./InfoOverlay.jsx";


import TourVista3 from "../../assets/TourVista3.png";
import TourVistaBG from "../../assets/TourVistaBG.png";
import DesertTourVista from '../../assets/DesertTourVista.png';
import LeavesIMG from '../../assets/LeavesIMG.png';

import "./HomePage.css";

function HomePage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { amount: 0.01 });

  const infoRef = useRef(null);
  const isInfoInView = useInView(infoRef, { amount: 0.01 });

  const thirdSectionRef = useRef(null);
  const isThirdSectionInView = useInView(thirdSectionRef, { amount: 0.01 });


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


      <section className="page info-section" ref={infoRef}>
        {isInfoInView && (
          <>
            <img
              src={DesertTourVista}
              alt="Desert Tour Vista"
              className="desert-tour-img"
              loading="lazy"
            />
            <InfoOverlay />
          </>
        )}
      </section>

      <section className="page third-section" ref={thirdSectionRef}>
        {isThirdSectionInView && (
          <>
            <FeaturedTours />
            <img
              src={LeavesIMG}
              alt="LeavesIMG"
              className="leaves-img"
              loading="lazy"
            />
          </>
        )}
      </section>

    </div>



  );
}

export default HomePage;
