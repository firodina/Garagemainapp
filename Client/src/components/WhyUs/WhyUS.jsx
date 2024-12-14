import React from 'react'
import { Link } from "react-router-dom";
import "./whyus.css";
import imgOther1 from '../../assets/ServicesImg/ServiceImg6.png';


function WhyUS() {
	return (
		<div className="ltn__why-choose-us-area section-bg-1 pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="why-choose-us-info-wrap">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  // Why Choose Us
                </h6>
                <h1 className="section-title">
                  Safety Is Our First Priority<span>.</span>
                </h1>
                <p>
                  We take pride in ensuring that your vehicle is always safe and
                  road-ready. From regular check-ups to specialized services, we
                  have you covered.
                </p>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-6">
                  <div className="why-choose-us-feature-item">
                    <div className="why-choose-us-feature-icon">
                      <i className="icon-car-parts-1"></i>
                    </div>
                    <div className="why-choose-us-feature-brief">
                      <h3>
                        <Link to="/service">Get Service Anytime</Link>
                      </h3>
                      <p>
                        Our team is ready to assist you 24/7 with all your
                        automotive needs, whether it's an emergency or scheduled
                        maintenance.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-6">
                  <div className="why-choose-us-feature-item">
                    <div className="why-choose-us-feature-icon">
                      <i className="icon-automobile"></i>
                    </div>
                    <div className="why-choose-us-feature-brief">
                      <h3>
                        <Link to="/service">Expert Repair Services</Link>
                      </h3>
                      <p>
                        Our expert technicians can handle even the most complex
                        repairs, ensuring your vehicle is back on the road in no
                        time with top-notch performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="why-choose-us-img-wrap">
              <div className="why-choose-us-img-1 text-left">
                <img src={imgOther1} alt="Image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	)
}

export default WhyUS