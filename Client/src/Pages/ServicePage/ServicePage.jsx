import React, { useEffect, useState } from "react";
import img1 from "../../assets/img/banner/10002.jpg";
import img2 from "../../assets/img/banner/MOENCO_HEAD_OFFICE-3662-1536x1024.jpg";

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
        className="relative bg-cover bg-center py-20 text-white"
        style={{ backgroundImage: `url(${img2})` }}
      >
        <div className="container mx-auto text-center">
          <h6 className="text-gray-300 uppercase">// Welcome to our company</h6>
          <h1 className="text-4xl font-bold">What We Do</h1>
        </div>
      </div>

      <div className="container mx-auto py-16 px-4 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={img1} alt="Service" className="rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2">
          <h6 className="text-blue-600">// RELIABLE SERVICES</h6>
          <h1 className="text-3xl font-bold mb-4">We are Qualified & Professional</h1>
          <p className="text-gray-600 mb-4">
            At [Company Name], we take pride in delivering top-quality services with a team of certified professionals.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>24/7 Online Support</li>
            <li>Expert Team</li>
            <li>State-of-the-Art Equipment</li>
            <li>Extensive Product Range</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h6 className="text-blue-600">// Service</h6>
          <h1 className="text-3xl font-bold mb-8">What We Do</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Tire and Wheel", desc: "Tire puncher with cleaning, Tire Customization, Tire check & fixing, Tire change & color." },
              { title: "Drivability Problems", desc: "Engine diagnosis, Performance tuning, Emission control, Electrical system check." },
              { title: "Automotive Filters", desc: "Oil filter replacement, Air filter check, Fuel filter servicing, Cabin filter change." },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16 text-center">
        <h6 className="text-blue-600">// Blog & Insights</h6>
        <h1 className="text-3xl font-bold mb-8">News Feeds</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.length === 0 ? (
            <p className="col-span-3">Loading blogs...</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="bg-white p-6 rounded-lg shadow-lg">
                <img src={blog.image} alt={blog.title} className="rounded-t-lg" />
                <h3 className="text-xl font-semibold my-2">{blog.title}</h3>
                <p className="text-gray-600">{blog.summary}</p>
                <a href={`/blog-details/${blog.id}`} className="text-blue-500 mt-4 inline-block">
                  Read More
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ServicePage;
