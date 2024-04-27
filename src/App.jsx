import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./stylesheets/app.css";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Sign-up";

function App() {
  const [token, setToken] = useState();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/home" /> : <Navigate to="login" />}
          />
          <Route
            path="/home"
            element={token ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={token ? <Navigate to="/home" /> : <SignUp />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
