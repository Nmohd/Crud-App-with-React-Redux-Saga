import axios from "axios";

export const loadUsersApi = async () =>
  await axios.get("http://localhost:3000/users?_limit=10");

// create User

export const createUserApi = async (user) =>
  await axios.post(`http://localhost:3000/users `, user);

// Delete User

export const deleteUserApi = async (userId) =>
  await axios.delete(`http://localhost:3000/users/${userId} `);

// Update user
export const updateUserApi = async (userId, userInfo) =>
  await axios.put(`http://localhost:3000/users/${userId} `, userInfo);
