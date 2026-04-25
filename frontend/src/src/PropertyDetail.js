import React, { useEffect, useState } from 'react';

function PropertyDetail({ id }) {

  const [property, setProperty] = useState(null);

  const token = localStorage.getItem("access");

  // =========================
  // LOAD SINGLE PROPERTY
  // =========================

  const loadProperty = () => {
    fetch(`http://127.0.0.1:8000/api/properties/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setProperty(data));
  };

  useEffect(() => {
    loadProperty();
  }, [id]);

  if (!property) {
    return <p>Cargando propiedad...</p>;
  }

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh' }}>

      {/* IMAGE HERO */}
      <div style={{
        height: 400,
        overflow: 'hidden'
      }}>

        {property.image && (
          <img
            src={`http://127.0.0.1:8000${property.image}`}
            alt={property.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        )}

      </div>

      {/* CONTENT */}
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: 20
      }}>

        {/* TITLE */}
        <h1 style={{ marginBottom: 5 }}>
          {property.title}
        </h1>

        {/* CITY */}
        <p style={{ color: '#777', marginTop: 0 }}>
          {property.city}
        </p>

        {/* PRICE */}
        <h2 style={{ color: '#222' }}>
          ${property.price}
        </h2>

        {/* DESCRIPTION */}
        <p style={{ color: '#555', lineHeight: 1.6 }}>
          {property.description}
        </p>

        {/* INFO BOX */}
        <div style={{
          marginTop: 20,
          padding: 15,
          background: 'white',
          borderRadius: 12,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>

          <p><strong>Propietario:</strong> {property.owner}</p>
          <p><strong>Fecha publicación:</strong> {property.created_at}</p>

        </div>

        {/* ACTION BUTTONS */}
        <div style={{ marginTop: 20 }}>

          <button style={{
            padding: 12,
            border: 'none',
            borderRadius: 10,
            background: '#ff385c',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginRight: 10
          }}>
            Reservar
          </button>

          <button style={{
            padding: 12,
            border: '1px solid #ddd',
            borderRadius: 10,
            background: 'white'
          }}>
            Contactar agente
          </button>

        </div>

      </div>
    </div>
  );
}

export default PropertyDetail;