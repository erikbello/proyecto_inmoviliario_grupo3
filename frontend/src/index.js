import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Login from './pages/Login';   

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PropertyDetail from './pages/PropertyDetail';
import CreateProperty from './pages/CreateProperty';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/property/:id" element={<PropertyDetail />} />
      <Route path="/create" element={<CreateProperty />} />
    </Routes>
  </BrowserRouter>
);