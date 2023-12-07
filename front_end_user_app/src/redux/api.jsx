import axios from "axios";

export const loadUsersApi = async () =>
  await axios.get("https://user-app-usw1.onrender.com/api/users");
// await axios.get("http://localhost:5000/api/users");

// create User

export const createUserApi = async (user) =>
  // await axios.post(`http://localhost:9000/users `, user);
  // console.log(user)
  await axios.post("https://user-app-usw1.onrender.com/api/users", user);

// Delete User

export const deleteUserApi = async (userId) =>
  // await axios.delete(`http://localhost:9000/users/${userId} `);
  await axios.delete(`https://user-app-usw1.onrender.com/api/users/${userId} `);

// Update user
export const updateUserApi = async (userId, userInfo) =>
  await axios.put(
    `https://user-app-usw1.onrender.com/api/users/${userId} `,
    userInfo
  );

// Search User

export const searchUserApi = async (userId) =>
  // await axios.get(`http://localhost:5000/api/users/${userId}`);
  await axios.get(`https://user-app-usw1.onrender.com/api/users/${userId} `);
