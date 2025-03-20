import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import "./header.css";

function Header() {
  const { isLogged, employee, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Main Header */}
      <header className="site-header sticky-header">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="light" sticky="top">
          <Container>
            <Navbar.Brand className="me-auto">
              <img
                onClick={() => navigate("/")}
                src="https://orbistrading-ethiopia.com/images/orlogo_2.png"
                alt="Logo"
                className="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNavDropdown" className="border-0">
              <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="navbarNavDropdown" className="justify-content-center">
              <Nav className="text-center link">
                <Link to="/" className="nav-link text-danger fw-bold">Home</Link>
                
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Link} className="text-danger fw-bold">About Us</Dropdown.Toggle>
                  <Dropdown.Menu className="bg-light">
                    <Dropdown.Item onClick={() => navigate("/about")}>About Orbis</Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/our-strategy")}>Our Strategy</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Link} className="text-danger fw-bold">Services</Dropdown.Toggle>
                  <Dropdown.Menu className="bg-light">
                    <Dropdown.Item onClick={() => navigate("/schedule")}>Online Booking</Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/car-washing")}>Car Washing</Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/car-painting")}>Car Painting</Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/maintenance")}>Maintenance</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
                <Link to="/contact" className="nav-link text-danger fw-bold">Contact Us</Link>
              </Nav>
            </Navbar.Collapse>
            <div className="ms-auto">
              {isLogged ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-avatar" className="text-danger">
                    <FaUserCircle size={30} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="custom-dropdown bg-light">
                    <Dropdown.Item onClick={() => navigate("/edit-profile")} className="align-items-center text-danger">
                      <FaEdit className="me-2" /> Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="align-items-center text-danger">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button onClick={() => navigate("/login")} className="btn btn-danger text-white fw-bold border-0">
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
