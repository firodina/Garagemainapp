import React, { useState, useEffect } from "react";
import "./hero.css";

const Hero = () => {
  // Array of banner images
  const images = [
    "../../assets/img/banner/10002.jpg",
    "../../assets/img/banner/10001.jpg",
    "../../assets/img/banner/10006.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide to the next image only once after 3 seconds on first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change to the next slide after 3 seconds

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []); // Empty dependency array ensures this runs only once

  // Manual navigation handlers
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="hero-container">
      <div className="hero-slider">
        {/* Left Arrow for Previous Slide */}
        <button className="arrow prev" onClick={prevSlide}>
          &#8249; {/* Unicode for left arrow */}
        </button>

        {/* Current Slide */}
        <div className="slide">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="slide-image"
          />
        </div>

        {/* Right Arrow for Next Slide */}
        <button className="arrow next" onClick={nextSlide}>
          &#8250; {/* Unicode for right arrow */}
        </button>
      </div>

      {/* Content Overlay */}
      <div className="hero-content">
        <div className="container">
          <div className="row justify-content-center  text-center">
            <div className="col-lg-8">
              <h6 className="slide-sub-title">
                // Any kind of car you will get //
              </h6>
              <h1 className="slide-title">
                Professional Car <br /> Service Provider
              </h1>
              <div className="btn-wrapper">
                <a href="/service" className="btn btn-danger">
                  OUR SERVICES
                </a>
                <a href="/about" className="btn btn-secondary">
                  LEARN MORE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
