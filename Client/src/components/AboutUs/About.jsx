import React from "react";
import "./about.css";
import img1 from "../../assets/img/banner/orbis_new.jpg";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="ltn__about-us-area">
      <div className="container">
        <div className="row">
          {/* Image section */}
          <div className="col-lg-6 align-self-center">
            <div className="about-us-img-wrap single-img-wrapper">
              <img src={img1} alt="About Us" className="single-about-img" />
            </div>
          </div>

          {/* Text content */}
          <div className="col-lg-6 align-self-center">
            <div className="about-us-info-wrap">
              <div className="section-title-area ltn__section-title-2 mb-6">
                <h6 className="section-subtitle ltn__secondary-color uppercase text-sm mb-2">
                  // About Us
                </h6>
                <h1 className="section-title text-4xl font-bold text-gray-800 mb-4">
                  Get Amazing Service From Us<span>.</span>
                </h1>
                <p className="text-gray-600 text-sm mb-4">
                  In 1950, the newly formed company rented an office at Menelik Square.
                  The company was called Orbis Trading & Technical Center.
                </p>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                In 1950, industrial and commercial vehicles, agricultural and industrial machinery were
                hardly in demand. The number of cars in Addis Ababa was just a few thousands and a new
                company dealing with these products seemed an ill-advised business.
              </p>

              <div className="about-call-us flex items-center mt-6">
                <div className="call-us-info">

                  <Link to="/about" className="!text-red-600  font-bold">
                    Read More
                  </Link>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
