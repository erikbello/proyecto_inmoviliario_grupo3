import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = () => {

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

          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);

          navigate("/");
        }

      });
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f5f5'
    }}>

      <div style={{
        padding: 30,
        background: 'white',
        borderRadius: 10,
        width: 300
      }}>

        <h2>Login Inmobiliaria</h2>

        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />

        <button
          onClick={login}
          style={{
            width: '100%',
            padding: 10,
            background: '#ff385c',
            color: 'white',
            border: 'none'
          }}
        >
          Entrar
        </button>

      </div>

    </div>
  );
}

export default Login;