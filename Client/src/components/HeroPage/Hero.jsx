import React from 'react'
import img from '../../assets/abe/banner1.jpg'
import './hero.css'
function Hero() {
	return (
		<div className="hero-container">
      <image autoPlay muted loop className="hero-video">
        <img src={img} alt="hero" />
      </image>
      <div className="hero-content">
        <div className="container">
          <div className="row justify-content-center align-items-center text-center">
            <div className="col-lg-8">
              <h1 className="slide-title">
                Professional Car <br /> Service Provider
              </h1>
              <div className="btn-wrapper">
                <a href="/service" className="btn btn-primary">
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
	)
}

export default Hero