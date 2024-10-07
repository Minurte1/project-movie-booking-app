import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // URL của API

export const getUsers = () => {
  return axios.get(API_URL);
};

export const getUserById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
