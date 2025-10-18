
import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home";
import EditPages from "./Components/Pages/EditPages";


// 💫 Custom CSS for animated borders


function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="editpages" element={<EditPages/>}/>

     </Routes>
      
    </>
  );
}

export default App;
