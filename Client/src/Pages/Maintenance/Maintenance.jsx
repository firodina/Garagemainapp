import React from 'react'
import img2 from "../../assets/img/banner/MOENCO_HEAD_OFFICE-3662-1536x1024.jpg";
import img6 from "../../assets/img/banner/MOENCO_HEAD_OFFICE-3797-1536x1024.jpg";
import img3 from '../../assets/img/banner/10003.jpg';


function Maintenance() {
    return (
        <div>

            <div
                className="ltn__breadcrumb-area ltn__breadcrumb-area-2 ltn__breadcrumb-color-white"
                style={{
                    backgroundImage: `url(${img3})`,
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
            <div className="w-full bg-white px-4 py-12 sm:px-6 lg:px-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Image Section */}
                    <div>
                        <img
                            src={img6}
                            alt="Toyota Service Center Ethiopia"
                            className="rounded-lg shadow-md w-full h-auto object-cover"
                        />
                    </div>

                    {/* Text Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-red-600 mb-4">Collision Repair</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Body works be it light, moderate or heavy are performed in ORBIS by highly skilled technicians.
                            All our employees are provided with continuous training locally and abroad in Vichicle training facilities.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white px-4 py-12 sm:px-6 lg:px-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Image Section */}
                    <div className="w-full">
                        <img
                            src={img2}
                            alt="Toyota Service Center Ethiopia"
                            className="rounded-lg shadow-md w-full h-auto object-cover"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="w-full">
                        <h2 className="text-3xl font-bold text-red-600 mb-4">Paint</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Paint works at MOENCO is performed in our modern paint booth. We give detailed attention to match the paint
                            work with the original color of your vehicle by using a computerized mixing machine.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full bg-lxmt-bg px-4 py-12 sm:px-6 lg:px-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Text Section */}
                    <div>
                        <h4 className="text-lg font-light text-gray-700 mb-4">
                            Our state of the art equipment such as the Car-O-Liner (a computerized measuring system to denote alignments on the body and frame), Mig and Washer welding machines are waiting for your vehicle to be restored to its original look.
                        </h4>
                    </div>

                    {/* Image Section */}
                    <div>
                        <img
                            src="https://moencoethiopia.com/wp-content/uploads/2018/10/moenco-last-shoots-4851-scaled.jpg"
                            alt="Toyota Service Center Ethiopia"
                            className="rounded-lg shadow-md w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Maintenance