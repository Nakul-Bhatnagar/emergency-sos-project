import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function SosLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    const res = await api.get("/sos/history");
    setLogs(res.events || []);
  }

  return (
    <>
      <h2>SOS Logs</h2>

      <div className="card">
        <table width="100%" border="1" cellPadding="10">
          <thead>
            <tr>
              <th>User</th>
              <th>Time</th>
              <th>Location</th>
            </tr>
          </thead>

          <tbody>
            {logs.map(l => (
              <tr key={l._id}>
                <td>{l.user?.name || "Unknown"}</td>
                <td>{new Date(l.timestamp).toLocaleString()}</td>
                <td>
                  {l.address || `${l.lat}, ${l.lng}` || "No location"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
