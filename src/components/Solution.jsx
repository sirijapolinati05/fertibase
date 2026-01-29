import React from "react";
import { Navigate } from "react-router-dom";

// Redirect old Solution route to new Product page
export default function Solution() {
  return <Navigate to="/product" replace />;
}
