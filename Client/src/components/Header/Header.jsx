import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import "./header.css"

function Header() {
  const { isLogged, employee, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="site-header shadow-md sticky top-0 w-full z-50">
      <Navbar collapseOnSelect expand="lg" className="py-2">
        <Container>
          <Navbar.Brand className="me-auto">
            <img
              onClick={() => navigate("/")}
              src="https://orbistrading-ethiopia.com/images/orlogo_2.png"
              alt="Logo"
              className="h-12 cursor-pointer"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNavDropdown" className="border-0">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarNavDropdown" className="justify-center">
            <Nav className="text-center text-lg font-semibold">
              <Link to="/" className="nav-link text-red-600 font-bold">Home</Link>
              
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} className="text-red-600 font-bold">About Us</Dropdown.Toggle>
                <Dropdown.Menu className="bg-gray-100">
                  <Dropdown.Item onClick={() => navigate("/about")}>About Orbis</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/our-strategy")}>Our Strategy</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} className="text-red-600 font-bold">Services</Dropdown.Toggle>
                <Dropdown.Menu className="bg-gray-100">
                <Dropdown.Item onClick={() => navigate("/service")}>Quality Service</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/schedule")}>Online Booking</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/maintenance")}>Body Painting and Maintenance</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/HtoH")}>House to House request </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
              <Link to="/contact" className="nav-link text-red-600 font-bold">Contact Us</Link>
            </Nav>
          </Navbar.Collapse>
          <div className="ml-auto ">
            {isLogged ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="dropdown-avatar" className="text-red-600 ">
                  <FaUserCircle size={30} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-gray-100">
                  <Dropdown.Item onClick={() => navigate("/edit-profile")} className="flex items-center text-red-600">
                    <FaEdit className="mr-2" /> Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="flex items-center text-red-600 ">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button onClick={() => navigate("/login")} className="!bg-red-600 text-white font-bold border-0 px-4 py-2 rounded">
                Login
              </Button>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
