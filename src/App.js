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


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  const handleLogin = () => {
    // Your login logic here
    // After successful login, setLoggedIn(true);
    setLoggedIn(true);
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {!isLoggedIn ? (
              <Route index element={<Login />} />
            ) : (
              <>
                <Route index element={<Home />} />
                <Route path="users">
                  <Route index element={<List />} />
                  <Route path=":userId" element={<Single />} />
                  <Route
                    path="new"
                    element={<New inputs={userInputs} title="Add New User" />}
                  />
                </Route>
                <Route path="products">
                  <Route index element={<List />} />
                  <Route path=":productId" element={<Single />} />
                  <Route
                    path="new"
                    element={
                      <New inputs={productInputs} title="Add New Product" />
                    }
                  />
                </Route>
              </>
            )}
            <Route path="login" element={<Login onLogin={handleLogin} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
