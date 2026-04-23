const API_URL = "http://127.0.0.1:8000/api/users/";

export const getUsers = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

// 👉 NUEVO: crear usuario
export const createUser = async (name) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return res.json();
};