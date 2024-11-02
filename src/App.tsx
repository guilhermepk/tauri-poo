import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import CashRegister from "./pages/CashRegister/CashRegister";
import About from "./pages/About/About";
import PriceCheck from "./pages/PriceCheck/PriceCheck";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cash-register" element={<CashRegister />} />
        <Route path="about" element={<About />} />
        <Route path="price-check" element={<PriceCheck />} />
      </Routes>
    </Router>
  )
}

export default App;
