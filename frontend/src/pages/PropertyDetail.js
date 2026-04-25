import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PropertyDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/properties/${id}/`)
      .then(res => res.json())
      .then(data => setProperty(data));
  }, [id]);

  if (!property) {
    return <h3 style={{ padding: 20 }}>Cargando...</h3>;
  }

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh' }}>

      {/* HEADER */}
      <div style={{
        padding: 20,
        background: 'white',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <h2>Detalle propiedad</h2>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: 8,
            border: 'none',
            background: 'black',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Volver
        </button>
      </div>

      {/* CONTENT */}
      <div style={{
        maxWidth: 900,
        margin: '20px auto',
        background: 'white',
        borderRadius: 15,
        overflow: 'hidden'
      }}>

        {/* IMAGE */}
        <img
          src={`http://127.0.0.1:8000${property.image}`}
          alt={property.title}
          style={{
            width: '100%',
            height: 400,
            objectFit: 'cover'
          }}
        />

        {/* INFO */}
        <div style={{ padding: 20 }}>

          <h2>{property.title}</h2>

          <p style={{ color: '#777' }}>
            {property.city}
          </p>

          <h3 style={{ marginTop: 10 }}>
            ${property.price}
          </h3>

          <p style={{ marginTop: 20 }}>
            {property.description}
          </p>

        </div>

      </div>

    </div>
  );
}