import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getProperties = async () => {
  const token = localStorage.getItem("access");

  const response = await axios.get(`${API_URL}/properties/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};