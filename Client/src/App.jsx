import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ToursPage from "./pages/tours/ToursPage";
import LoginPage from "./pages/login/LoginPage";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="content-container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
