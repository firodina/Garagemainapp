import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Location() {
  // Orbis Trading And Technical Center Share Company location (latitude, longitude)
  const companyLocation = {
    lat: 9.03,  // Replace with the actual latitude of the company
    lng: 38.74, // Replace with the actual longitude of the company
  };

  const mapRef = useRef(null);  // Ref to store the map instance

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only if it's not already initialized
      const map = L.map("map").setView([companyLocation.lat, companyLocation.lng], 13);

      // Add the tile layer for the map
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add a marker for the company location
      L.marker([companyLocation.lat, companyLocation.lng]).addTo(map)
        .bindPopup("Orbis Trading And Technical Center Share Company")
        .openPopup();

      // Store map instance in ref
      mapRef.current = map;
    }
  }, []); // Empty dependency array ensures the effect runs once

  return (
    <section className="bg-gray-100 py-16 px-6">
      <Container>
        <h1 className="text-3xl font-bold text-blue-600 text-center uppercase">Our Locations</h1>

        <Row className="justify-center items-center mt-8">
           {/* Map */}
           <Col md={12} className="text-center mt-8 md:mt-0">
            <div id="map" className="w-full h-96 rounded-lg shadow-lg transition-all transform duration-700 ease-in-out"></div>
          </Col>
          {/* Text and Location vertically */}
          <Col md={12} className="d-flex flex-column justify-center ">
            <div className="space-y-8">
              <div className="flex items-center bg-gray-20 p-6 rounded-lg ">
                <FaMapMarkerAlt size={20} className="text-red-600 mr-4" />
                <div className="location-text">
                  <h4 className="text-lg font-semibold text-gray-800">Orbis Trading And Technical Center</h4>
                  <p className="text-gray-600 text-sm">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>
          </Col>

         
        </Row>

      </Container>
    </section>
  );
}

export default Location;
