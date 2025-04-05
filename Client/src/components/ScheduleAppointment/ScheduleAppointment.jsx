import React from "react";
import img9 from "../../assets/img/banner/10006.jpg";

function ScheduleAppointment() {
  return (
    <>
      {/* Fixed Banner */}
      <div
        className="ltn__breadcrumb-area ltn__breadcrumb-area-2 ltn__breadcrumb-color-white"
        style={{
          backgroundImage: `url(${img9})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed", // Changed to 'fixed' to keep the image fixed
          top: 70,
          left: 0,
          width: "100%",
          height: "400px",
          zIndex: -1, // Makes sure the image stays behind the form
        }}
      >
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-wrap justify-between items-center">
            <div className="section-title-area ltn__section-title-2">
              <h6 className="section-subtitle text-gray-700 uppercase !text-lg mb-6">
                // Welcome to our company
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-12 px-6 bg-gray-100 min-h-screen mt-96"> {/* Add margin-top to push the form down */}
        <h2 className="text-3xl font-semibold text-center mb-6">
          Online Service Booking
        </h2>
        <form className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="First name"
              className="flex-1 p-3 border border-gray-300 rounded w-full md:w-[48%]"
            />
            <input
              type="text"
              placeholder="Last name"
              className="flex-1 p-3 border border-gray-300 rounded w-full md:w-[48%]"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 p-3 border border-gray-300 rounded w-full md:w-[48%]"
            />
            <input
              type="text"
              placeholder="Phone number"
              className="flex-1 p-3 border border-gray-300 rounded w-full md:w-[48%]"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <select className="flex-1 p-3 border border-gray-300 rounded w-full md:w-[32%]">
              <option>Select Make</option>
              <option>Toyota</option>
              <option>Honda</option>
              <option>Ford</option>
            </select>
            <select className="flex-1 p-3 border border-gray-300 rounded w-full md:w-[32%]">
              <option>Select Model</option>
              <option>Corolla</option>
              <option>Civic</option>
              <option>Mustang</option>
            </select>
            <input
              type="text"
              placeholder="Year"
              className="flex-1 p-3 border border-gray-300 rounded w-full md:w-[32%]"
            />
          </div>
          <textarea
            rows="2"
            placeholder="Enter service details"
            className="w-full p-3 border border-gray-300 rounded"
          ></textarea>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="flex-1 p-3 border border-gray-300 rounded w-full md:w-[48%]"
            />
            <input
              type="text"
              placeholder="--:-- --"
              className="flex-1 p-3 border border-gray-300 rounded w-full md:w-[48%]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600"
          >
            Submit Now
          </button>
        </form>
      </div>
    </>
  );
}

export default ScheduleAppointment;
