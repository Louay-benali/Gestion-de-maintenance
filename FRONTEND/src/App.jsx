import { useState } from "react";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/SideBar";
import OperateurDashboard from "./components/OperateurDashboard";

function App() {
  return (
    <div className="w-64">
      <Sidebar />
    </div>
  )
}

export default App;
