import React from "react";
import Footer from "../components/Footer/Footer";
import About from "../components/AboutUs/About";
import Hero from "../components/HeroPage/Hero";
import WhyUS from "../components/WhyUs/WhyUS";
import Service from "../components/ServicePage/Service";
import Location from "../components/Location/Location";

function HomePage() {
  return (
    <div>
      <Hero />
			<About />
			<WhyUS />
      <Service />
      <Location />
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;
