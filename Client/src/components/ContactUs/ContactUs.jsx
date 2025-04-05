import React from "react";
import img9 from "../../assets/abe/banner1.jpg";
import img10 from "../../assets/img/icons/10.png";
import img11 from "../../assets/img/icons/11.png";
import img12 from "../../assets/img/icons/12.png";
import img1 from "../../assets/img/banner/orbis_new.jpg";


function ContactUs() {
  return (
    <div>
      {/* Breadcrumb Area */}
      <div
        className="ltn__breadcrumb-area ltn__breadcrumb-area-2 ltn__breadcrumb-color-white"
        style={{
          backgroundImage: `url(${img9})`,
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
              
              <h1 className="section-title text-white text-5xl font-semibold">
                CALL TO US 
               
              </h1>
              <h6 className="section-subtitle text-gray-700 uppercase !text-lg mb-6">
              For service & parts inquires
              </h6>
            </div>

          </div>
        </div>
      </div>

      {/* Contact Address Area */}
      <div className="ltn__contact-address-area py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="ltn__contact-address-item box-shadow p-6 rounded-lg bg-white">
              <div className="ltn__contact-address-icon mb-4">
                <img src={img10} alt="Email Icon" />
              </div>
              <h3 className="text-xl font-semibold">Email Address</h3>
              <p>

                orbis.trading@ethionet.et

              </p>
            </div>
            <div className="ltn__contact-address-item box-shadow p-6 rounded-lg bg-white">
              <div className="ltn__contact-address-icon mb-4">
                <img src={img11} alt="Phone Icon" />
              </div>
              <h3 className="text-xl font-semibold">Phone Number</h3>
              <p>
                Tel   + 251 11-5-516211
                <br />  Fax  +251 11-5-512421
              </p>
            </div>
            <div className="ltn__contact-address-item box-shadow p-6 rounded-lg bg-white">
              <div className="ltn__contact-address-icon mb-4">
                <img src={img12} alt="Location Icon" />
              </div>
              <h3 className="text-xl font-semibold">Office Address</h3>
              <p>
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      {/* <div className="section-title-area text-center py-12">
        <h6 className="section-subtitle text-secondary">// Get in Touch</h6>
        <h1 className="section-title text-black">Get A Quote</h1>
      </div>

      <div className="ltn__contact-message-area mb-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="ltn__form-box contact-form-box box-shadow p-8 rounded-lg bg-white w-full">
            <h4 className="title-2 text-xl font-semibold mb-4">Contact Form</h4>
            <form id="contact-form" action="mail.php" method="post">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="input-item">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="input-item">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="input-item">
                  <select className="w-full p-3 border border-gray-300 rounded-md">
                    <option>Select Service Type</option>
                    <option>Car Repair</option>
                    <option>Engine Repairing</option>
                    <option>Oil Change</option>
                    <option>Car Wash</option>
                  </select>
                </div>
                <div className="input-item">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="input-item mt-6 mb-4">
                <textarea
                  name="message"
                  placeholder="Enter message"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows="5"
                ></textarea>
              </div>

              <p className="mb-4">
                <label className="input-info-save flex items-center gap-2">
                  <input type="checkbox" name="agree" />
                  Save my name, email, and website in this browser for the next time I comment.
                </label>
              </p>

              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all"
                >
                  Send Message
                </button>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      <div className="w-full bg-white py-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Form Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="your-firstname" className="block text-sm font-medium text-gray-700">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="your-firstname"
                  id="your-firstname"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="your-email" className="block text-sm font-medium text-gray-700">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="your-email"
                  id="your-email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="your-message" className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  name="your-message"
                  id="your-message"
                  rows="6"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-all"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="w-full h-full">
            <img
              src={img1}
              alt="Contact Office"
              className="rounded-lg shadow-md w-full object-cover"
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default ContactUs;
