import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useState } from "react"; // Import useState
import { Navigate } from "react-router-dom";
import PatientDetails from "./pages/patientDetails/PatientDetails";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  // <Route path="*" element={<Navigate to="/" />} />
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/product/:id" element={<Single />} />
          <Route path="/products" element={<List />} />
          <Route path="/patientDetails/:id" element={<PatientDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
