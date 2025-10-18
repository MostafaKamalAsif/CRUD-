import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home";
import EditPages from "./Components/Pages/EditPages";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editpages/:id" element={<EditPages />} />
      </Routes>
    </>
  );
}

export default App;
