import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [properties, setProperties] = useState([]);
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  // =========================
  // CARGAR PROPIEDADES
  // =========================
  const loadProperties = () => {
    fetch('http://127.0.0.1:8000/api/properties/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setProperties(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error("Error:", err));
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* HEADER */}
      <div style={{
        background: 'white',
        padding: 20,
        borderBottom: '1px solid #eee'
      }}>
        <h2 style={{ margin: 0 }}>Dashboard Inmobiliaria Pro</h2>
      </div>

      {/* GRID */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: 20
      }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20
        }}>

          {properties.map(p => (
            <div
              key={p.id}
              onClick={() => navigate(`/property/${p.id}`)}
              style={{
                background: 'white',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                cursor: 'pointer'
              }}
            >

              {/* IMAGE */}
              <div style={{ height: 200 }}>

                {p.image ? (
                  <img
                    src={`http://127.0.0.1:8000${p.image}`}
                    alt={p.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: '#ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    Sin imagen
                  </div>
                )}

              </div>

              {/* INFO */}
              <div style={{ padding: 15 }}>

                <h3 style={{ margin: 0 }}>
                  {p.title}
                </h3>

                <p style={{ color: '#777', margin: 0 }}>
                  {p.city || "Sin ciudad"}
                </p>

                <p style={{
                  fontWeight: 'bold',
                  marginTop: 10
                }}>
                  ${p.price}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Home;