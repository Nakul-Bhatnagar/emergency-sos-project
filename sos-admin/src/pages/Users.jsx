import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const res = await api.get("/admin/users");
    setUsers(res.users || []);
  }

  return (
    <>
      <h2>Users</h2>

      <div className="card">
        <table width="100%" border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
