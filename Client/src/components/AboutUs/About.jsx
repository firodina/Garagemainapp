import React from "react";
import { useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import "./about.css";
import img1 from "../../assets/img/effect/1(1).jpg";
import img2 from "../../assets/img/effect/2.jpg";
import img3 from "../../assets/img/effect/3.jpg";
import img4 from "../../assets/img/effect/4.jpg";
import img5 from "../../assets/img/effect/5.jpg";
import img6 from "../../assets/img/effect/6.jpg";
import img7 from "../../assets/img/icons/7.png";
import { Link } from "react-router-dom";

function About() {
  // onst[(offsetY, setOffsetY)] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Check if count is less than 42
    if (count < 12) {
      // Set a timeout to increment the count every 100 milliseconds
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 100);

      // Clean up the timer
      return () => clearTimeout(timer);
    }
  }, [count]);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="ltn__about-us-area pt-80 pb-85">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="about-us-img-wrap about-img-left">
              <Parallax bgColor={""} strength={300} className="">
                <ul
                  className="afex__parallax-effect-wrap ltn__parallax-effect-active "
                  style={{
                    transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    pointerEvents: "none",
                  }}
                >
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.00"
                  ></li>
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.10"
                  >
                    <div className="ltn__effect-img ltn__effect-img-top-left">
                      <img src={img1} alt="#" />
                    </div>
                  </li>
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.30"
                  >
                    <div className="ltn__effect-img ltn__effect-img-top-right">
                      <img src={img2} alt="#" />
                    </div>
                  </li>
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.50"
                  >
                    <div className="ltn__effect-img ltn__effect-img-center-left">
                      <img src={img3} alt="#" />
                    </div>
                  </li>
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.20"
                  >
                    <div className="ltn__effect-img ltn__effect-img-center-right">
                      <img src={img4} alt="#" />
                    </div>
                  </li>
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.20"
                  >
                    <div class="ltn__effect-img ltn__effect-img-bottom-left">
                      <img src={img5} alt="#" />
                    </div>
                  </li>
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.20"
                  >
                    <div class="ltn__effect-img ltn__effect-img-bottom-right">
                      <img src={img6} alt="#" />
                    </div>
                  </li>
                  <li
                    className="layer layer-big wave-container"
                    data-depth="0.50"
                  >
                    <div className="wave">
                      <div className="about-us-img-info square">
                        <div className="about-us-img-info-inner">
                          <h1>
                            <span className="counter">{count}</span>
                            <span>+</span>
                          </h1>
                          <h6>
                            <span>Years</span> Of Experience
                          </h6>
                          <span className="dots-bottom"></span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </Parallax>
            </div>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="about-us-info-wrap">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  // About Us
                </h6>
                <h1 className="section-title">
                  Get Amazing Service From Us<span>.</span>
                </h1>
                <p>
                  At Auto Care Garage, we pride ourselves on delivering top-quality
                  automotive services. Our team of skilled technicians is
                  dedicated to keeping your vehicle running smoothly and
                  efficiently.
                </p>
              </div>

              <p>
                From routine maintenance like oil changes and tire rotations to
                more complex repairs such as engine diagnostics and brake
                replacements, we have the expertise to handle it all. Our
                state-of-the-art facility is equipped with the latest tools and
                technology to ensure your vehicle receives the best care
                possible. Whether you're in need of a quick tune-up or a
                full-scale repair, you can trust us to provide exceptional
                service and customer care. We strive to make your experience as
                convenient as possible, offering flexible scheduling and
                transparent pricing. Let Auto Care Garage be your go-to destination
                for all your automotive needs.
              </p>
              <hr />
              <div className="about-call-us">
                <div className="call-us-icon">
                  <img src={img7} alt="Icon Image" />
                </div>
                <div className="call-us-info">
                  <p>
                    Call us 24/7. We can answer for{" "}
                    <Link
                      to="/contact"
                      className="ltn__secondary-color text-decoration"
                    >
                      <strong>all your questions</strong>
                    </Link>
                    .
                  </p>
                  <h2>
                    <Link to="tel:+123456789">507-452-1254</Link>{" "}
                    <small> or </small>{" "}
                    <Link to="tel:+123456789">508-452-1253</Link>
                  </h2>
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