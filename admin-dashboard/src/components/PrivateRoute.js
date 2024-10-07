import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  // Kiểm tra nếu admin đã đăng nhập
  const isAdmin = localStorage.getItem("isAdmin");

  return isAdmin ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
