import React, { useState, useEffect } from "react";
import "./hero.css";

// Import images
import image1 from "../../assets/img/banner/10002.jpg";
import image2 from "../../assets/abe/4c79f534-14ed-468e-855c-d77fd556af30 (1).jpg";
import image3 from "../../assets/img/banner/10006.jpg";

const Hero = () => {
  const images = [image1, image2, image3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < images.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="hero-container relative w-full overflow-hidden">
      <div className="hero-slider w-full h-full flex justify-center items-center">
        {/* Left Arrow for Previous Slide */}
        <button
          className="arrow prev absolute top-1/2 left-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 text-2xl z-10 transition-all duration-300 hover:bg-red-700 hover:scale-110"
          onClick={prevSlide}
        >
          &#8249;
        </button>

        {/* Current Slide */}
        <div className="slide w-full h-full relative overflow-hidden">
          <div
            className="slider-track flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index}`}
                className="slide-image w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>


        {/* Right Arrow for Next Slide */}
        <button
          className="arrow next absolute top-1/2 right-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 text-2xl z-10 transition-all duration-300 hover:bg-red-700 hover:scale-110"
          onClick={nextSlide}
        >
          &#8250;
        </button>
      </div>

      {/* Content Overlay */}
      <div className="hero-content flex justify-center items-center h-[10%] text-white text-left">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-lg-8">
              <h1 className="slide-title text-4xl font-medium">
                Professional Car <br /> Service Provider
              </h1>
              <div className="btn-wrapper flex gap-4 justify-center mt-8">
                <a
                  href="/service"
                  className="btn btn-primary py-2 px-5 font-medium uppercase !bg-red-600 text-white rounded-none"
                >
                  OUR SERVICES
                </a>
                <a
                  href="/about"
                  className="btn btn-secondary py-2 px-5 font-medium uppercase border-2 text-red-600 rounded-none"
                >
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