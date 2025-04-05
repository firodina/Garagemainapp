import React, { useEffect, useState } from "react";
import img1 from "../../assets/img/banner/10006.jpg";
// import img2 from "../../assets/img/banner/MOENCO_HEAD_OFFICE-3662-1536x1024.jpg";
import img4 from "../../assets/img/banner/MOENCO_HEAD_OFFICE-3502-1536x1024.jpg";
import img6 from "../../assets/img/banner/MOENCO-ADAMA-4971-1536x1024.jpg";
import img3 from "../../assets/img/banner/moenco-last-shoots-4830-1536x1024.jpg";
import { Link } from "react-router-dom"


function ServicePage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/news");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <div
        className="ltn__breadcrumb-area ltn__breadcrumb-area-2 ltn__breadcrumb-color-white"
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          backgroundAttachment: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "400px",
          zIndex: "-1",

        }}
      >
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-wrap justify-between items-center">
            <div className="section-title-area ltn__section-title-2">
              <h6 className="section-subtitle text-gray-700 uppercase !text-lg mb-6">
                      // Welcome to our company
              </h6>
              <h1 className="section-title text-white text-5xl font-semibold">
                WHAT WE DO
              </h1>
              <span className="inline-block">
                <Link
                  to="/schedule"
                  className="inline-flex items-center px-6 py-3 border-0 bg-red-600 !text-white font-semibold rounded-full hover:bg-red-700 transition duration-300 !no-underline"
                >
                  Service Booking
                  <i className="fa fa-arrow-right ml-2"></i>
                </Link>

              </span>

            </div>

          </div>
        </div>
      </div>
      <section class="bg-red-500 py-12 px-4 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          <div>
            <h1 class="text-white text-3xl font-light mb-4">Bring Your Vichicle to ORBIS</h1>
            <h4 class="text-white text-sm font-light space-y-2">
              <p>Protect your precious vehicle and maximize durability by letting the experts at ORBIS take care of it.</p>
              <p>Bring your Vichicle to ORBIS where the people who know your vehicle best and where your vehicle can be diagnosed and fixed right the first time using the latest diagnostic equipment.</p>
            </h4>
          </div>


          <div class="space-y-6">

            <div class="flex items-start space-x-4">
              <div class="text-white">
                <i class="fa fa-cog fa-2x"></i>
              </div>
              <div>
                <h3 class="text-white text-lg font-light">Quality</h3>
                <p class="text-white">
                  We offer precise diagnosis, reliable quality service with the exclusive use of Genuine Parts for trouble free performance at a low running cost.
                </p>
              </div>
            </div>


            <div class="flex items-start space-x-4">
              <div class="text-white">
                <i class="fa fa-th-list fa-2x"></i>
              </div>
              <div>
                <h3 class="text-white text-lg font-light">Experience</h3>
                <p class="text-white">
                  We are in the industry for more than 50 years. Our customer journey continues to improve through Kaizen exceeding customers expectation.
                </p>
              </div>
            </div>


            <div class="flex items-start space-x-4">
              <div class="text-white">
                <i class="fa fa-certificate fa-2x"></i>
              </div>
              <div>
                <h3 class="text-white text-lg font-light">Convenience</h3>
                <p class="text-white">
                  Our purpose built facility in Addis Ababa and Four regional states, together with our three authorized service dealers enable us to render excelling customer experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* //section two */}
      <section class=" py-16 px-4 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">


          <div>
            <h2 class="text-3xl !text-red-600 font-semibold mb-4">Express Service</h2>
            <div class="text-gray-700 text-sm space-y-4">
              <p>
                Express vehicle service is tailored to your vehicle based on mileage and/or service interval. All Motorola vehicles with mileage less than 100,000 km are eligible for express service.
              </p>
              <p>
                The service includes inspection and replacement of parts as per Motorola recommendation to make your vehicle roadworthy and enjoyable to drive.
              </p>
              <p>
                It helps recover key areas of your vehicle to preserve its efficiency and maximize durability on the road.
              </p>
            </div>
          </div>

          <div class="w-full">
            <img
              src={img4}
              alt="Toyota Service Center Ethiopia"
              class="w-full h-auto rounded-lg shadow-md"
            />
          </div>

        </div>
      </section>

      {/* secton three */}
      <section class="bg-white py-16 px-4 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">


          <div>
            <img
              src={img6}
              alt="Toyota Service Center Adama"
              class="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          <div>
            <h2 class="text-3xl !text-red-600 font-semibold mb-4">Maintenance Service</h2>
            <div class="text-gray-700 text-sm space-y-4">
              <p>
                Maintenance service includes a rigorous checkup, repair, and/or replacement of parts based on Toyota's official recommendations.
              </p>
              <p>
                Our expert technicians are highly trained and use precision tools specifically designed for Toyota service and maintenance.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* section 4 */}
      <section class="bg-gray-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          <div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl !text-red-600 font-semibold mb-4">
              General Repair
            </h2>
            <div class="text-gray-700 text-base sm:text-sm lg:text-base space-y-4 leading-relaxed">
              <p>
                We are dedicated to providing comprehensive service to extend the life of your vehicle,
                regardless of wear and tear. General repair includes diagnosing all faults or malfunctions
                and fixing them right the first time to retain your car's original condition.
              </p>
              <p>
                Our highly skilled technicians, supported by the latest diagnostic equipment and technology,
                are ready to give you peace of mind. From small malfunctions to major faults, we make sure
                everything is diagnosed and resolved accurately.
              </p>
            </div>
          </div>

          <div>
            <img
              src={img3}
              alt="Toyota Service Center Ethiopia"
              class="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

        </div>
      </section>


      {/* import React from "react";

const ServiceAdSection = ({ title, image, paragraphs = [], reverse = false }) => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        
      
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-red-600 font-semibold mb-4">
            {title}
          </h2>
          <div className="text-gray-700 text-sm sm:text-base space-y-4 leading-relaxed">
            {paragraphs.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
        </div>

      
        <div>
          <img
            src={image}
            alt={title}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}; */}



    </>
  );
}

export default ServicePage;
