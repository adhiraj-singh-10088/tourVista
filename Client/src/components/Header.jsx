import './Header.css'
import ThemeToggle from "./ThemeToggle";
import useTheme from "../hooks/useTheme";
import logo from '../assets/TourVistaLogo.png';

function Header() {
  const [isLightMode, setIsLightMode] = useTheme(false);

  return (
    <header className="header-container">
      <div className="header-content">
        <nav className="header-nav">
          <a href="/">Home</a>
        </nav>
        <div className="header-logo-container">
          <img src={logo} alt="TourVista Logo" className="header-logo" />
        </div>
        <div className="header-actions">
          <a href="/login">
            <button className="header-signup-btn">
                Sign Up
            </button>
          </a>
          <ThemeToggle isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
        </div>
      </div>
    </header>
  );
}

export default Header;