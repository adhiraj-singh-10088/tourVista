import ResponsiveImage from "./ResponsiveImage.jsx";
import TourVista3 from "../../assets/TourVista3.png";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="hero-container">
      <ResponsiveImage
        src={TourVista3}
        alt="Hero section"
        fit="cover"
        priority={true}
      />
    </div>
  );
}

export default HomePage;