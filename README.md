# 🏠 Proyecto Inmobiliario - ADSO 2026

## 🚀 Tecnologías

- Backend: Django + Django REST Framework
- Frontend: React
- Base de datos: PostgreSQL / SQLite
- Autenticación: JWT

---

## ⚙️ INSTALACIÓN

### 🔧 Backend

cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Servidor:
http://127.0.0.1:8000/

---

### 🎨 Frontend

cd frontend
npm install
npm start

App:
http://localhost:3000/

---

## 🔐 LOGIN

/api/token/

---

## 🌿 GIT FLOW

- main → producción  
- develop → integración  
- backend → backend  
- frontend → frontend  
- feature/* → tareas  

---

## 👥 EQUIPO

- Backend 1 → Auth  
- Backend 2 → Properties  
- Frontend 1 → Login  
- Frontend 2 → UI  

---

## 🎯 OBJETIVO

Sistema inmobiliario con login y CRUD de propiedades conectado a frontend