import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stores from "./pages/Stores";
// import AdminDashboard from "./pages/AdminDashboard";
// import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/signup" element={<Signup />} /> 
         <Route path="/stores" element={<Stores />} /> 
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        {/* <Route path="/store-owner" element={<StoreOwnerDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
