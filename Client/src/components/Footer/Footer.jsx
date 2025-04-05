import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"; // Import the social media icons

import "./footer.css";

function Footer() {
  return (
    <footer className="bg-gray-300 text-black py-12 px-6">
      <div className="container mx-auto flex flex-wrap justify-between items-start">
        
        {/* Time Schedule Section */}
        <div className="w-full md:w-1/3 p-6">
          <h6 className="text-black-400 uppercase text-lg mb-3">Time Schedule</h6>
          <h4 className="text-xl font-semibold mb-6">Our Working Hours</h4>
          <ul className="schedule-list space-y-3">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
              <li key={index} className="flex justify-between text-sm">
                {day} <span>{day === "Sunday" ? "Official Holiday" : "07:00AM - 12:00PM"}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Section */}
        <div className="w-full md:w-1/3 p-6">
          <h4 className="text-xl font-semibold text-black-400 mb-6">Our Services</h4>
          <div className="flex flex-wrap justify-between">
            <ul className="service-list space-y-9 text-sm w-1/2 mb-9">
              {[
                "Engine Diagnostics",
                "Vehicles Damaged",
                "Air Conditioning Evac",
                "Anti Lock Brake Service",
                "Computer Diagnostics",
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href="service.html"
                    className="hover:text-blue-400 transition duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="service-list space-y-9 text-sm w-1/2 mb-4">
              {[
                "Performance Upgrades",
                "Car Wash & Cleaning",
                "Choose your Repairs",
                "Free Consultancy",
                "Emergency Time",
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href="service.html"
                    className="hover:text-red-400 transition duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Button to Scroll to Appointment Scheduling */}
        <div className="w-full md:w-auto flex justify-center items-center mt-8 md:mt-0 lg:mt-70">
          <a
            href="#appointment"
            className="py-3 px-6 bg-red-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 no-underline hover:no-underline"
            style={{ textDecoration: "none" }}
          >
            Schedule an Appointment
          </a>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-5 pt-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <img
              src="https://orbistrading-ethiopia.com/images/orlogo_2.png"
              alt="Logo"
              className="w-44"
            />
            <div>
              <h6 className="text-sm">Copyright & Design By</h6>
              <h6 className="text-lg font-bold">Orbis Trading & Tech.Center S.C</h6>
            </div>
          </div>
          
          {/* Footer Social Icons */}
          <div className="social-icons flex space-x-6 text-2xl mt-4 md:mt-0">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-400 transition duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-400 transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-500 transition duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-400 transition duration-300"
            >
              <FaYoutube />
            </a>
          </div>

          {/* Footer Links */}
          <ul className="footer-links flex space-x-6 text-sm mt-4 md:mt-0">
            {["Terms & Conditions", "Claim", "Privacy & Policy"].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="footer-link hover:text-blue-400 transition duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
