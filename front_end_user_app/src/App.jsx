// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";
import Header from "./components/Header.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/addUser" Component={AddEditUser} />
          <Route path="/editUser/:id" Component={AddEditUser} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
