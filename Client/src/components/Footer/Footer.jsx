import React from "react";
import logo from "../../assets/img/logo/logo.png";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer2 ltn__footer-area ltn__footer-2 ltn__footer-color-1 mt-100 pt-100">
      <div className="footer-top-area section-bg-2">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-md-5">
              <div className="footer-widget ltn__footer-timeline-widget ltn__footer-timeline-widget-1 bg-image bg-overlay-theme-black-90">
                <h6 className="ltn__secondary-color text-uppercase">
                  {" "}
                  // time shedule{" "}
                </h6>
                <h4 className="footer-title">Meet In Timeline.</h4>
                <ul>
                  <li>
                    Monday <span>07:00AM - 12:00PM</span>
                  </li>
                  <li>
                    Tuesday <span>07:00AM - 12:00PM</span>
                  </li>
                  <li>
                    Wednesday <span>07:00AM - 12:00PM</span>
                  </li>
                  <li>
                    Thursday <span>07:00AM - 12:00PM</span>
                  </li>
                  <li>
                    Friday <span>07:00AM - 12:00PM</span>
                  </li>
                  <li>
                    Saturday <span>07:00AM - 12:00PM</span>
                  </li>
                  <li>
                    Sunday <span>Official Holiday</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-5 col-md-7">
              <div className="footer-widget footer-menu-widget footer-menu-widget-2-column clearfix">
                <h4 className="footer-title">Services.</h4>
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="service.html">Engine Diagnostics</a>
                    </li>
                    <li>
                      <a href="service.html">Vehicles Damaged</a>
                    </li>
                    <li>
                      <a href="service.html">Air Conditioning Evac</a>
                    </li>
                    <li>
                      <a href="service.html">Anti Lock Brake Service</a>
                    </li>
                    <li>
                      <a href="service.html">Computer Diagnostics</a>
                    </li>
                    <li>
                      <a href="service.html">Performance Upgrades</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="service.html">Car Wash & Cleaning</a>
                    </li>
                    <li>
                      <a href="service.html">Choose your Repairs</a>
                    </li>
                    <li>
                      <a href="service.html">Free Consultancy</a>
                    </li>
                    <li>
                      <a href="service.html">Emergency Time</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="footer-widget footer-blog-widget">
                <h4 className="footer-title">News Feeds.</h4>
                <div className="ltn__footer-blog-item">
                  <div className="ltn__blog-meta">
                    <ul>
                      <li className="ltn__blog-date">
                        <i className="far fa-envelope"></i> June 24, 2020
                      </li>
                    </ul>
                  </div>
                  <h4 className="ltn__blog-title">
                    <a href="blog-details.html">
                      The branch of biology that deals with the normal.
                    </a>
                  </h4>
                </div>
                {/* Repeat for other blog items */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__copyright-area ltn__copyright-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="site-logo-wrap">
                <div className="site-logo">
                  <a href="index.html">
                    <img src={logo} alt="Logo" />
                  </a>
                </div>
                <div className="get-support ltn__copyright-design clearfix">
                  <div className="get-support-info">
                    <h6>Copyright & Design By</h6>
                    <h4>
                      <span className="current-year">
                        Evangadi Jan, 2024 Group Two
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 align-self-center">
              <div className="ltn__copyright-menu text-right">
                <ul>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="#">Claim</a>
                  </li>
                  <li>
                    <a href="#">Privacy & Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
