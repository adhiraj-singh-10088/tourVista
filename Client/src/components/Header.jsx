import './Header.css'
import ThemeToggle from "./ThemeToggle";
import useTheme from "../hooks/useTheme";
import logo from '../assets/TourVistaLogo.png';

function Header() {
  const [isLightMode, setIsLightMode] = useTheme(false);

  return (
    <header className="header-container">
      <div className="header-content">
        <img src={logo} alt="TourVista Logo" className="header-logo" />
        <nav className="header-nav">
          <a href="/">Home</a>
          <a href="/tours">Tours</a>
        </nav>
        <div className="header-actions">
          <button className="header-signup-btn">Sign Up</button>
          <ThemeToggle isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
        </div>
      </div>
    </header>
  );
}

export default Header;