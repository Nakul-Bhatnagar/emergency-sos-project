import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import SosLogs from "./pages/SosLogs";

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />

        <div className="main">
          <Navbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/logs" element={<SosLogs />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
