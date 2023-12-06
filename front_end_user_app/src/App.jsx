// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/addUser" Component={AddEditUser} />
          <Route path="/editUser/:id" Component={AddEditUser} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
