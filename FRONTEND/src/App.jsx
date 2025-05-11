import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import OperateurDashboard from "./pages/OperateurDashboard";
import ResponsableDashboard from "./pages/ResponsableDashboard";
import TechnicienDashboard from "./pages/TechnicienDashboard";
import MagasinierDashboard from "./pages/MagasinierDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/operateur-dashboard" element={<OperateurDashboard />} />
        <Route path="/responsable-dashboard" element={<ResponsableDashboard />} />
        <Route path="/technicien-dashboard" element={<TechnicienDashboard />} />
        <Route path="/magasinier-dashboard" element={<MagasinierDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />{" "}
      </Routes>
    </Router>
    </>
  );
}

export default App;
