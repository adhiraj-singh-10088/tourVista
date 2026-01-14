import ResponsiveImage from "./ResponsiveImage.jsx";
import Title from "./Title.jsx";
import TourVista3 from "../../assets/TourVista3.png";
import TourVistaBG from '../../assets/TourVistaBG.png'
import "./HomePage.css";

function HomePage() {
  return (
<div style={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden" }}>
  <ResponsiveImage
    lowSrc={TourVista3}
    highSrc={TourVistaBG}
    alt="Hero image"
    priority={true}
  />
  <Title />
</div>

  );
}

export default HomePage;