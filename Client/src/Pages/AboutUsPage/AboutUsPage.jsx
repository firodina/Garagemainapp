import React from "react";
import img9 from "../../assets/img/banner/10006.jpg";
import imgT4 from "../../assets/img/banner/10001.jpg";
import "./AboutUsPage.css";

function AboutUsPage() {
  return (
    <>
      {/* <HeaderPage /> */}
      <div
        className="ltn__breadcrumb-area ltn__breadcrumb-area-2 ltn__breadcrumb-color-white"
        style={{
          backgroundImage: `url(${img9})`,
          backgroundSize: "cover", // Ensures the image covers the area
          backgroundPosition: "center", // Centers the image
          width: "100%", // Makes sure the div takes the full width
          height: "400px", // Sets a fixed height for the breadcrumb area
        }}
      >
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-wrap justify-between items-center">
            <div className="section-title-area ltn__section-title-2">
              <h6 className="section-subtitle text-gray-700 uppercase !text-lg mb-6">
                // Welcome to our company
              </h6>
              <h1 className="section-title text-white text-5xl font-semibold">
                WHO WE ARE
              </h1>
            </div>
            
          </div>
        </div>
      </div>

      <div className="ltn__about-us-area pt-10 pb-32">
        <div className="container mx-auto px-6 md:px-16">

          {/* Flex Row - About Us (Text & Image) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">

            {/* Left Section - About Us Text */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="section-title-area ltn__section-title-2 mb-8">
                <h1 className="text-4xl font-semibold mb-4 text-red-800">ORBIS</h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Orbis Trading & Technical Center, a European-based company, stands as a leader in global
                  distribution and retail in the premium and luxury automotive sectors. We are proud to be
                  the exclusive dealer of Mercedes and Renault vehicles.
                </p>
              </div>
            </div>

            {/* Right Section - About Us Image */}
            <div className="w-full md:w-1/2 flex justify-end">
              <div className="afex__about-us-wrap">
                <img
                  src={imgT4}
                  alt="About Us Image"
                  className="w-[476px] h-[331px] rounded-lg shadow-xl object-cover"
                />
              </div>
            </div>

          </div>

          {/* Horizontal Line Divider */}
          <hr className="my-12 border-t-2 border-gray-300" />

          {/* Vision & Strategy Section */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">

            {/* Left - Vision */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-semibold text-red-800 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our vision is to become the most trusted name in automotive distribution and retail,
                leading in service quality and the export market. We aim to achieve this through a
                strategic approach executed by a skilled team with extensive trading and manufacturing experience.
              </p>
            </div>

            {/* Right - Strategy */}
            <div className="w-full md:w-1/2">
              <h4 className="text-2xl font-semibold text-red-800 mb-4">Our Strategy</h4>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">➕</span> Lead in Customer Experience
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">➕</span> Become the OEM's Partner of Choice
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">➕</span> Deliver full potential on all revenue streams
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">➕</span> Leverage our global scale
                </li>
                <li className="flex items-center">
                  <span className="text-red-600 mr-2">➕</span> Invest to accelerate growth
                </li>
              </ul>

              {/* Strategy Button */}
              <div className="mt-6">
                <a
                  href="https://moencoethiopia.com/our-strategy/"
                  className="inline-flex items-center text-red-600 font-semibold hover:text-red-800 transition"
                >
                  <span className="mr-2">🔗</span> Our Strategy
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 md:px-16">

          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-red-800">Our History</h2>
            <h3 className="text-xl text-gray-600 mt-2">Years of Innovation and Growth</h3>
          </div>

          {/* History Content - Two Column Layout */}
          <div className="flex flex-col md:flex-row gap-12">

            {/* Left Section */}
            <div className="w-full md:w-1/2">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                ORBIS started as a small, passionate automotive dealer in Europe,
                 driven by a vision to deliver quality vehicles and exceptional service.
                  Over the years, the company grew into one of the top global leaders in 
                  automotive retail and distribution, with a specific focus on luxury brands
                   like Mercedes and Renault.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With a deep commitment to customer satisfaction, ORBIS was able to expand its
                 reach internationally, becoming the exclusive dealer of several high-end car brands. 
                 Through hard work, dedication, and partnerships with industry leaders, ORBIS made a name
                  for itself as a trusted name in the automotive sector.
              </p>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Over the years, ORBIS's success has been attributed to its innovative approach to 
                business, outstanding customer service, and commitment to offering top-tier vehicles. 
                ORBIS is now recognized as a symbol of excellence in the automotive industry, constantly
                 evolving to meet the ever-changing needs of customers worldwide.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, ORBIS continues to lead the automotive market, leveraging its decades of experience, 
                global presence, and strategic partnerships to shape the future of the automotive industry.
              </p>

              {/* Latest News Button */}
              <div className="mt-6">
                <a href="https://orbis.com/news-events/" className="text-white bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-semibold inline-flex items-center">
                  <span>Latest News</span>
                  <i className="fa fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>





    </>
  );
}

export default AboutUsPage;
