import { useEffect, useState } from "react";
import { getUsers, createUser } from "../services/api";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    getUsers().then(data => setUsers(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    await createUser(name);
    setName("");
    loadUsers(); // refresca lista
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Usuarios</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Guardar</button>
      </form>

      <hr />

      {/* LISTA */}
      {users.map(user => (
        <div key={user.id}>
          {user.name} - ID: {user.id}
        </div>
      ))}
    </div>
  );
}

export default UserPage;