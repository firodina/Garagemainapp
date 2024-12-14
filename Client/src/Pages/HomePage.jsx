import React from "react";
import Footer from "../components/Footer/Footer";
import About from "../components/AboutUs/About";
import Hero from "../components/HeroPage/Hero";
import WhyUS from "../components/WhyUs/WhyUS";

function HomePage() {
  return (
    <div>
      <Hero />
			<About />
			<WhyUS />
      <Footer />
    </div>
  );
}

export default HomePage;
