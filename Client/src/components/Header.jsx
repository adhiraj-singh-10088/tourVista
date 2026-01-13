import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import ThemeToggle from "./ThemeToggle";
import useTheme from "../hooks/useTheme";
import logo from "../assets/TourVistaLogo.png";

function Header() {
  const [isLightMode, setIsLightMode] = useTheme(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down
        setIsVisible(false);
      } else {
        // scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`header-container ${isVisible ? "header-show" : "header-hide"}`}
    >
      <div className="header-content">
        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }>
            Home
          </NavLink>

          <NavLink to="/tours" className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }>
            Tours
          </NavLink>
        </nav>

        <div className="header-logo-container">
          <img src={logo} alt="TourVista Logo" className="header-logo" />
        </div>

        <div className="header-actions">
          <Link to="/login" className="header-signup-btn">
            Sign In / Up
          </Link>
          <ThemeToggle
            isLightMode={isLightMode}
            setIsLightMode={setIsLightMode}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
