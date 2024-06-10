import React from "react";
import Login from "../pages/login/index"
import Register from "../pages/register";
import ProtectedRoute from "./ProtectedRoutes"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const Routering = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Landing page</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cadastro" element={<Register/>} />
        <Route path="/home" element={
          <ProtectedRoute>
            <h1>Bem vindo!!!!!!!!</h1>
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  )
}

export default Routering