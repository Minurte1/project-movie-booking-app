// src/admin-view/RouterAdmin.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import MovieManager from "../pages/MovieManager";
import PrivateRoute from "../components/PrivateRoute";
import Navbar from "../components/Navbar"; // Import Navbar

const AdminLayout = () => (
  <div style={{ display: "flex" }}>
    <Navbar />
    <div style={{ flex: 1, padding: "20px" }}>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/users" element={<PrivateRoute element={<Users />} />} />
        <Route
          path="/movies"
          element={<PrivateRoute element={<MovieManager />} />}
        />
      </Routes>
    </div>
  </div>
);

const RouterAdmin = () => <AdminLayout />; // Sử dụng AdminLayout

export default RouterAdmin;
