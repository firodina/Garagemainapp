import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import img1 from "../../assets/img/banner/moenco-last-shoots-4830-1536x1024.jpg";
import img2 from "../../assets/img/banner/MOENCO_HEAD_OFFICE-3797-1536x1024.jpg";
import img3 from "../../assets/img/banner/MOENCO_HEAD_OFFICE-3662-1536x1024.jpg";
import img4 from "../../assets/img/banner/MOENCO_HEAD_OFFICE-3502-1536x1024.jpg";
import img5 from "../../assets/img/banner/MOENCO_HEAD_OFFICE-3452-1536x1024.jpg";
import img6 from "../../assets/img/banner/MOENCO-ADAMA-4971-1536x1024.jpg";

function Service() {
  const services = [
    { id: 1, title: "General Repair", img: img1, description: "Our general repair service is here to address all common issues your vehicle might face, ensuring it runs smoothly and efficiently." },
    { id: 2, title: "Collision Repair", img: img2, description: "From minor dents to major bodywork, our collision repair services restore your vehicle to its original condition." },
    { id: 3, title: "Car Paint", img: img3, description: "We provide professional car painting services to refresh the look of your vehicle and protect it from the elements." },
    { id: 4, title: "Express Service", img: img4, description: "Quick and reliable service for regular maintenance, designed for your convenience without compromising quality." },
    { id: 5, title: "Latest Equipment", img: img5, description: "We use the latest and most advanced equipment to ensure every repair and service is done to the highest standard." },
    { id: 6, title: "Maintenance Service", img: img6, description: "Our maintenance service ensures your vehicle stays in top condition, preventing costly repairs down the road." },
  ];

  return (
    <div className="!bg-gray py-16 px-6">
      <div className="text-center mb-2">
        <h2 className="text-3xl font-bold uppercase">
          Our Best <span className="text-red-500">Services</span>
        </h2>
        <p className="text-gray-800 max-w-2xl mx-auto mt-3">
          We are dedicated to providing comprehensive service to extend the life of your vehicle irrespective of wear and tear.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="service-slider"
        
      >
        {services.map((service) => (
          <SwiperSlide key={service.id} >
            <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden text-center">
              <div className="h-52 w-full overflow-hidden">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="!text-sm font-semibold text-white bg-red-500 py-2 px-3 inline-block rounded">
                  {service.title}
                </h3>
                {/* Render service description here */}
                <p className="text-gray-800 mt-3">{service.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
}

export default Service;
