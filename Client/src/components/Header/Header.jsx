import { useAuth } from "../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEdit,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useRef } from "react";

function Header() {
  const { isLogged, isCustomerLogged, logout } = useAuth();
  const navigate = useNavigate();

  // --- state ---
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    about: false,
    services: false,
    user: false,
    aboutMobile: false,
    servicesMobile: false,
  });

  // --- helpers ---
  const closeDesktop = () =>
    setDropdownOpen((p) => ({
      ...p,
      about: false,
      services: false,
      user: false,
    }));

  const openDesktop = (key) =>
    setDropdownOpen((p) => ({ ...p, [key]: true }));

  const toggleDropdown = (key) =>
    setDropdownOpen((p) => ({ ...p, [key]: !p[key] }));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /* ---------- JSX ---------- */
  return (
    <header className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <img
            onClick={() => navigate("/")}
            src="https://orbistrading-ethiopia.com/images/orlogo_2.png"
            alt="Logo"
            className="h-12 cursor-pointer"
          />

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#E10600] focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-[#E10600] font-bold hover:text-[#E10600]/80"
            >
              Home
            </Link>

            {/* About Us */}
            <div
              className="relative"
              onMouseEnter={() => openDesktop("about")}
              onMouseLeave={closeDesktop}
            >
              <button className="text-[#E10600] font-bold hover:text-[#E10600]/80 flex items-center">
                About Us <FaChevronDown className="ml-1" size={12} />
              </button>
              {dropdownOpen.about && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 !no-underline"
                  >
                    About Orbis
                  </Link>
                  <Link
                    to="/our-strategy"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 !no-underline"
                  >
                    Our Strategy
                  </Link>
                </div>
              )}
            </div>

            {/* Services */}
            <div
              className="relative"
              onMouseEnter={() => openDesktop("services")}
              onMouseLeave={closeDesktop}
            >
              <button className="text-[#E10600] font-bold hover:text-[#E10600]/80 flex items-center">
                Services <FaChevronDown className="ml-1" size={12} />
              </button>
              {dropdownOpen.services && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/service"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 !no-underline"
                  >
                    Quality Service
                  </Link>
                  <Link
                    to="/schedule"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 !no-underline"
                  >
                    Online Booking
                  </Link>
                  <Link
                    to="/maintenance"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 !no-underline"
                  >
                    Body Painting and Maintenance
                  </Link>
                  <Link
                    to="/HtoH"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 !no-underline"
                  >
                    House to House request
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className="text-[#E10600] font-bold hover:text-[#E10600]/80"
            >
              Contact Us
            </Link>
          </nav>

          {/* Auth (desktop) */}
          <div className="hidden lg:block">
            {isLogged || isCustomerLogged ? (
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("user")}
                  className="text-[#E10600] focus:outline-none"
                >
                  <FaUserCircle size={30} />
                </button>
                {dropdownOpen.user && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={() => {
                        navigate("/edit-profile");
                        closeDesktop();
                      }}
                      className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      <FaEdit className="mr-2" /> Edit Profile
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-[#E10600] text-white font-bold px-4 py-2 rounded hover:bg-[#C10500]"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-[#E10600] font-bold hover:text-[#E10600]/80"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {/* About (mobile) */}
              <div>
                <button
                  onClick={() => toggleDropdown("aboutMobile")}
                  className="text-[#E10600] font-bold hover:text-[#E10600]/80 flex items-center"
                >
                  About Us <FaChevronDown className="ml-1" size={12} />
                </button>
                {dropdownOpen.aboutMobile && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/about"
                      className="block text-gray-800 hover:text-[#E10600]"
                      onClick={() => setIsOpen(false)}
                    >
                      About Orbis
                    </Link>
                    <Link
                      to="/our-strategy"
                      className="block text-gray-800 hover:text-[#E10600]"
                      onClick={() => setIsOpen(false)}
                    >
                      Our Strategy
                    </Link>
                  </div>
                )}
              </div>

              {/* Services (mobile) */}
              <div>
                <button
                  onClick={() => toggleDropdown("servicesMobile")}
                  className="text-[#E10600] font-bold hover:text-[#E10600]/80 flex items-center"
                >
                  Services <FaChevronDown className="ml-1" size={12} />
                </button>
                {dropdownOpen.servicesMobile && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/service"
                      className="block text-gray-800 hover:text-[#E10600]"
                      onClick={() => setIsOpen(false)}
                    >
                      Quality Service
                    </Link>
                    <Link
                      to="/schedule"
                      className="block text-gray-800 hover:text-[#E10600]"
                      onClick={() => setIsOpen(false)}
                    >
                      Online Booking
                    </Link>
                    <Link
                      to="/maintenance"
                      className="block text-gray-800 hover:text-[#E10600]"
                      onClick={() => setIsOpen(false)}
                    >
                      Body Painting and Maintenance
                    </Link>
                    <Link
                      to="/HtoH"
                      className="block text-gray-800 hover:text-[#E10600]"
                      onClick={() => setIsOpen(false)}
                    >
                      House to House request
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="text-[#E10600] font-bold hover:text-[#E10600]/80"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>

              {/* Auth (mobile) */}
              <div className="pt-4">
                {isLogged || isCustomerLogged ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        navigate("/edit-profile");
                        setIsOpen(false);
                      }}
                      className="flex items-center text-gray-800 hover:text-[#E10600] w-full"
                    >
                      <FaEdit className="mr-2" /> Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-gray-800 hover:text-[#E10600] w-full"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsOpen(false);
                    }}
                    className="bg-[#E10600] text-white font-bold px-4 py-2 rounded hover:bg-[#C10500] w-full"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
