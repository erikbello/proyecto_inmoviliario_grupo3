import React, { useEffect, useState } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [confirmarID, setConfirmarID] = useState(null);

  // 🔄 cargar usuarios
  const cargarUsuarios = () => {
    fetch('http://127.0.0.1:8000/api/users/')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error:", err));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // ➕ registrar usuario (CORREGIDO: usa "name")
  const registrar = () => {
    if (!nuevoNombre.trim()) return;

    fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nuevoNombre }), 
    })
      .then(() => {
        setNuevoNombre('');
        cargarUsuarios(); //  recargar lista
      })
      .catch(err => console.error("Error al registrar:", err));
  };

  // eliminar usuario
  const eliminar = (id) => {
    fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
      method: 'DELETE'
    })
      .then(() => {
        setConfirmarID(null);
        cargarUsuarios();
      })
      .catch(err => console.error("Error al eliminar:", err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-2xl font-bold text-amber-700 text-center mb-6">
          DEJM Home Group
        </h1>

        {/* INPUT + BOTÓN */}
        <div className="flex gap-2 mb-8">
          <input 
            className="flex-1 border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del usuario..."
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />

          <button 
            onClick={registrar} 
            className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-bold"
          >
            REGISTRAR
          </button>
        </div>

        {/* LISTA */}
        <div className="space-y-3">
          {usuarios.length > 0 ? (
            usuarios.map(u => (
              <div key={u.id} className="border p-4 rounded-lg bg-gray-50 shadow-sm">

                {confirmarID === u.id ? (
                  //  CONFIRMACIÓN
                  <div className="text-center">
                    <p className="text-red-600 font-bold mb-3 uppercase text-xs">
                      ¿Deseas Eliminar a {u.name}?
                    </p>

                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={() => eliminar(u.id)} 
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold text-xs"
                      >
                        CONFIRMAR ELIMINACION
                      </button>

                      <button 
                        onClick={() => setConfirmarID(null)} 
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded font-bold text-xs"
                      >
                        CANCELAR
                      </button>
                    </div>
                  </div>

                ) : (
                  //  VISTA NORMAL
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-extrabold text-gray-800 uppercase text-lg">
                        {u.name} {/*  AQUÍ TAMBIÉN CORREGIDO */}
                      </p>

                      <p className="text-xs text-gray-400 font-bold">
                        ID: {u.id}
                      </p>
                    </div>

                    <button 
                      onClick={() => setConfirmarID(u.id)} 
                      className="text-red-400 hover:text-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}

              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No hay usuarios aún...
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;