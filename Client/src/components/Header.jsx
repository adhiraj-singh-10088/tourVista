import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";

import ThemeToggle from "./ThemeToggle";
import useTheme from "../hooks/useTheme";
import DropDownMenu from "../pages/tours/DropDownMenu";
import SearchBar from "../pages/tours/SearchBar";

import logo from "../assets/TourVistaLogo.png";
import "./Header.css";

function Header({ isHomePage }) {
  const location = useLocation(); 
  const path = location.pathname; 

  const [searchParams, setSearchParams] = useSearchParams();
  
  const filters = Object.fromEntries(searchParams);

  const setSearchQuery = (query) => {
    const newFilters = { ...filters };
    
    if (query) {
      newFilters.search = query;
    } else {
      delete newFilters.search;
    }
    setSearchParams(newFilters);
  };

  const [isLightMode, setIsLightMode] = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(
        currentScrollY <= lastScrollY.current || currentScrollY <= 80,
      );
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClassName = clsx("header-container", {
    "header-show": isVisible,
    "header-hide": !isVisible,
    "header-transparent": isHomePage,
    "header-home": isHomePage,
  });

  const showThemeToggle = path === "/tours" || path === "/login";

  return (
    <header className={headerClassName}>
      <div className="header-content">
        <nav className="header-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx("nav-link", { "active-link": isActive })
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tours"
            className={({ isActive }) =>
              clsx("nav-link", { "active-link": isActive })
            }
          >
            Tours
          </NavLink>
        </nav>

        {path === "/tours" ? (
          <>
              <SearchBar
                searchQuery={filters.search || ""}
                setSearchQuery={setSearchQuery}
              />
            <DropDownMenu
              filters={filters}
              setFilters={setSearchParams}
            />
          </>
        ) : (
          <div className="header-logo-container">
            <img src={logo} alt="TourVista Logo" className="header-logo" />
          </div>
        )}

        <div className="header-actions">
          <Link to="/login" className="header-signup-btn">
            Sign In / Up
          </Link>
          {showThemeToggle && (
            <ThemeToggle
              isLightMode={isLightMode}
              setIsLightMode={setIsLightMode}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
