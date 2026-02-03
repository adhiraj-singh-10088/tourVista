import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ToursPage from "./pages/tours/ToursPage";
import LoginPage from "./pages/login/LoginPage";
import Header from "@components/layout/Header";
import "./App.css";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header isHomePage={isHomePage} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
