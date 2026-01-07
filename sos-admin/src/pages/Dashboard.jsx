import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    sos: 0,
    active: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const users = await api.get("/admin/users/count");
    const sos = await api.get("/sos/count");
    const active = await api.get("/sos/active");

    setStats({
      users: users.count || 0,
      sos: sos.count || 0,
      active: active.count || 0
    });
  }

  return (
    <>
      <h2>Dashboard Overview</h2>

      <div className="card-grid">
        <div className="card">Total Users: {stats.users}</div>
        <div className="card">SOS Alerts: {stats.sos}</div>
        <div className="card">Active Alerts: {stats.active}</div>
      </div>
    </>
  );
}
