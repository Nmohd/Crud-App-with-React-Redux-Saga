import { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { searchUserStart } from "../redux/actions";
// import {   } from "../redux/actions";

const Header = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [userId, setSearchId] = useState(0);
  const dispatch = useDispatch();

  console.log(userId);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchUserStart(userId));
    console.log("inside", userId);
    // setSearchId(0);
  };

  return (
    <>
      <MDBNavbar expand="lg" light bgColor="primary">
        <MDBContainer fluid>
          <MDBNavbarBrand className="text-white">
            <span style={{ marginRight: "10px" }}>
              <MDBIcon fas icon="user" />
            </span>{" "}
            User book
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="text-white"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link">
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink>
                  <NavLink className="text-white" to="/addUser">
                    Add User
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
              {/* <MDBNavbarItem>
                <MDBNavbarLink>
                  <NavLink className="text-white" to="/about">
                    About
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem> */}
            </MDBNavbarNav>
            <form
              className=".d-flex.input-group.w-auto"
              onSubmit={handleSubmit}
            >
              <input
                type="number"
                className="form-control"
                placeholder="Search ID...."
                value={userId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <MDBBtn>Search by ID</MDBBtn>
            </form>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
