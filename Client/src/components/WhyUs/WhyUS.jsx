import React from "react";
import { Link } from "react-router-dom";
import "./whyus.css";
import imgOther1 from "../../assets/img/banner/moenco-last-shoots-4830-1536x1024.jpg";

function WhyUS() {
  return (
    <div className="ltn__why-choose-us-area section-bg-1">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Side - Text Section */}
          <div>
            <div className="why-choose-us-info-wrap">
              <div className="section-title-area mb-6">
                <h6 className="section-subtitle text-secondary uppercase text-sm mb-2">
                  // Why Choose Us
                </h6>
                <h1 className="section-title text-4xl font-bold text-gray-800 mb-4">
                  Safety Is Our First Priority<span>.</span>
                </h1>
                <p className="text-gray-600 text-sm">
                  We take pride in ensuring that your vehicle is always safe and
                  road-ready. From regular check-ups to specialized services, we
                  have you covered.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex items-start space-x-5">
                  <div className="text-5xl text-secondary"></div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      <Link to="/schedule" className="!text-red-500 !no-underline hover:no-underline focus:no-underline">
                        Get Service Anytime
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Our team is ready to assist you 24/7 with all your automotive
                      needs, whether it's an emergency or scheduled maintenance.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start space-x-5">
                  <div className="text-5xl text-secondary"></div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      <Link to="/service" className="!text-red-500 !no-underline hover:no-underline focus:no-underline">
                        Expert Repair Services
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Our expert technicians can handle even the most complex repairs,
                      ensuring your vehicle is back on the road in no time with
                      top-notch performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="why-choose-us-img-wrap">
              <img src={imgOther1} alt="Why Choose Us" className="max-w-[95%] rounded-lg shadow-lg" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default WhyUS;
