import ResponsiveImage from "./ResponsiveImage.jsx";
import Title from "./Title.jsx";
import Mountain from './Mountain.jsx'
import Info from './Info.jsx'
import TourVista3 from "../../assets/TourVista3.png";
import TourVistaBG from '../../assets/TourVistaBG.png'
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div className="hero-container">
        <ResponsiveImage
          lowSrc={TourVista3}
          highSrc={TourVistaBG}
          alt="Hero image"
          priority={true}
        />
        <Title />
        <Mountain />
      </div>
      <Info />
    </>

  );
}

export default HomePage;