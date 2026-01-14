import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ToursPage from "./pages/tours/ToursPage";
import LoginPage from "./pages/login/LoginPage";
import Header from "./components/Header";
import "./App.css";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div
      className={
        isHomePage ? "content-container-home" : "content-container"
      }
    >
      <Header isHomePage={isHomePage} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
