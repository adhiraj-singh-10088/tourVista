import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import ResponsiveImage from "./ResponsiveImage.jsx";
import Title from "./Title.jsx";
import Mountain from "./Mountain.jsx";
import FeaturedTours from "./FeaturedTours.jsx";
import InfoOverlay from "./InfoOverlay.jsx";
import ScrollIndicator from "./ScrollIndicator.jsx";
import SideNavigation from "./SideNavigation.jsx";


import TourVista3 from "../../assets/TourVista3.png";
import TourVistaBG from "../../assets/TourVistaBG.png";
import DesertTourVista from '../../assets/DesertTourVista.png';
import LeavesIMG from '../../assets/LeavesIMG.png';

import "./HomePage.css";

function HomePage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { amount: 0.6 });

  const infoRef = useRef(null);
  const isInfoInView = useInView(infoRef, { amount: 0.6 });

  const thirdSectionRef = useRef(null);
  const isThirdSectionInView = useInView(thirdSectionRef, { amount: 0.6 });

  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { ref: heroRef, label: "Home" },
    { ref: infoRef, label: "Desert Adventures" },
    { ref: thirdSectionRef, label: "Featured Tours" },
  ];

  useEffect(() => {
    if (isHeroInView) setActiveSection(0);
    else if (isInfoInView) setActiveSection(1);
    else if (isThirdSectionInView) setActiveSection(2);
  }, [isHeroInView, isInfoInView, isThirdSectionInView]);

  const handleNavigate = (index) => {
    sections[index].ref.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div className="scroll-container">
      <SideNavigation
        activeSection={activeSection}
        sections={sections}
        onNavigate={handleNavigate}
      />

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
            <ScrollIndicator />
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
