// import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
// import logo from "../../assets/img/banner/10003";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import "./header.css";
function Header() {
  const navigate = useNavigate();

  return (
    <>
      {/* Main Header */}
      <header className="site-header sticky-header">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="light"
          sticky="top"
        >
          <Container>
            <Navbar.Brand className="me-auto">
              <img
                onClick={() => navigate("/")}
                src="https://orbistrading-ethiopia.com/images/orlogo_2.png"
                alt="Logo"
                className="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="navbarNavDropdown"
              className="border-0"
            >
              <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>

            <Navbar.Collapse
              id="navbarNavDropdown"
              className="justify-content-center"
            >
              <Nav className="text-center">
                <Link to="/" className="nav-link text-danger fw-bold">
                  Home
                </Link>
                <Link to="/about" className="nav-link text-danger fw-bold">
                  About Us
                </Link>
                <Link to="/services" className="nav-link text-danger fw-bold">
                  Service
                </Link>
                <Link to="/contact" className="nav-link text-danger fw-bold">
                  Contact Us
                </Link>
              </Nav>
            </Navbar.Collapse>

            <div className="ms-auto">
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-avatar"
                  className="text-danger"
                >
                  <FaUserCircle size={30} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="custom-dropdown bg-light">
                  <Dropdown.Item
                    onClick={() => navigate("/edit-profile")}
                    className="align-items-center text-danger"
                  >
                    <FaEdit className="me-2" /> Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="align-items-center text-danger">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown >

              <Button className="bttnn" >Login</Button>
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
