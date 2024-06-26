import React from "react";
import Login from "../pages/login/index";
import Register from "../pages/register";
import Home from "../pages/home";
import LandingPage from "../pages/landingpage";
import Project from "../pages/project";
import ProtectedRoute from "./ProtectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Routering = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default Routering;
