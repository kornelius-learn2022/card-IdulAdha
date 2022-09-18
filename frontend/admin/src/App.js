import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./component/login";
import Admin from "./component/admin";
import CardUser from "./component/cardUsers";
import EditCardUsers from "./component/editCardUsers";
import EditShow from "./component/Edit";
import "./css/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/edit" element={<EditShow />} />
        <Route path="/CardUsers" element={<CardUser />} />
        <Route path="/editCardUsers" element={<EditCardUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
