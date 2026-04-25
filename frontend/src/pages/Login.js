import React, { useState } from 'react';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.access) {
        // 🔐 guardar token
        localStorage.setItem("access", data.access);

        // 👉 redirigir al home
        window.location.href = "/";
      } else {
        alert("Credenciales incorrectas");
      }
    });
  };

 return (
  <div style={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f2f2f2'
  }}>

    <div style={{
      width: 320,
      padding: 30,
      background: 'white',
      borderRadius: 12,
      boxShadow: '0 5px 20px rgba(0,0,0,0.15)'
    }}>

      <h2 style={{ textAlign: 'center' }}>Login</h2>

      <input
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 10
        }}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 15
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: 10,
          background: '#333',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Ingresar
      </button>

    </div>

  </div>
)
};