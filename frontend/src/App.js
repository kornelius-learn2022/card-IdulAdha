import "./css/App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Kirim from "./component/kirim";
import ResultCard from "./component/rsltCard";
import CardShow from "./component/after_kirim";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Kirim />} />
        <Route path="/Card" element={<CardShow />} />
        <Route path="/Card/rstCard" element={<ResultCard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
