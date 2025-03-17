// import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import "./header.css";
function Header() {
  const { isLogged, employee, logout } = useAuth();
  const navigate = useNavigate();

  //handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <>
      <div className="top-bar bg-primary text-white py-2">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="left-column d-flex align-items-center">
            <div className="text me-4">
              Schedule Appointment: <strong>1800 456 7890</strong>
            </div>
            <div className="office-hour me-4">
              Monday - Saturday 7:00AM - 6:00PM
            </div>
          </div>
          <div className="right-column d-flex align-items-center">
            <div className="phone-number me-4">
              <strong>
                {isLogged
                  ? employee?.employee_first_name
                    ? `Welcome, ${employee?.employee_first_name} `
                    : `Welcome, ${employee?.customer_email}`
                  : "Welcome"}
              </strong>
            </div>
          </div>
        </div>
      </div>
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
            {!isLogged && (
              <>
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
              </>
            )}

            <div className="ms-auto">
              {isLogged ? (
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
                    <Dropdown.Item onClick={handleLogout} className="align-items-center text-danger">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown >
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  className="btn btn-danger text-white fw-bold border-0"
                >
                  Login
                </Button>
              )}
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
