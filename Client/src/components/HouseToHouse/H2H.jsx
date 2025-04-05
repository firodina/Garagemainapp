import React, { useState } from "react";
import img3 from "../../assets/img/banner/10003.jpg";
// import img1 from "../../assets/img/banner/MOENCO_HEAD_OFFICE-3662-1536x1024.jpg";

const HouseToHouseService = () => {
    // State to hold form values
    const [address, setAddress] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [vehicleYear, setVehicleYear] = useState("");
    const [vin, setVin] = useState("");
    const [preferredDate, setPreferredDate] = useState("");
    const [preferredTime, setPreferredTime] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!address || !serviceType || !vehicleModel || !vehicleYear || !vin || !preferredDate || !preferredTime) {
            setErrorMessage("All fields are required.");
            setSuccessMessage(""); // Clear success message if there is an error
            return;
        }

        // Assuming form submission logic here...
        setSuccessMessage("Your request has been successfully submitted.");
        setErrorMessage(""); // Clear error message on success
    };

    return (
        <>
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
                            <h1 className="section-title text-white !text-3xl font-semibold">
                                Pick Schudle to your home
                            </h1>
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-full bg-white px-4 py-12 sm:px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-red-600 mb-4">House-to-House Service</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Address Section */}
                        <div>
                            <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                                Address
                            </label>
                            <input
                                id="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                required
                            />
                        </div>

                        {/* Service Type Section */}
                        <div>
                            <label htmlFor="serviceType" className="block text-lg font-medium text-gray-700">
                                Service Type
                            </label>
                            <select
                                id="serviceType"
                                value={serviceType}
                                onChange={(e) => setServiceType(e.target.value)}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                required
                            >
                                <option value="">Select Service Type</option>
                                <option value="Oil Change">Oil Change</option>
                                <option value="Tire Replacement">Tire Replacement</option>
                                <option value="Body Repair">Body Repair</option>
                                {/* Add other service types here */}
                            </select>
                        </div>

                        {/* Vehicle Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="vehicleModel" className="block text-lg font-medium text-gray-700">
                                    Vehicle Model
                                </label>
                                <input
                                    id="vehicleModel"
                                    type="text"
                                    value={vehicleModel}
                                    onChange={(e) => setVehicleModel(e.target.value)}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="vehicleYear" className="block text-lg font-medium text-gray-700">
                                    Vehicle Year
                                </label>
                                <input
                                    id="vehicleYear"
                                    type="text"
                                    value={vehicleYear}
                                    onChange={(e) => setVehicleYear(e.target.value)}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="vin" className="block text-lg font-medium text-gray-700">
                                    Vehicle VIN
                                </label>
                                <input
                                    id="vin"
                                    type="text"
                                    value={vin}
                                    onChange={(e) => setVin(e.target.value)}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                    required
                                />
                            </div>
                        </div>

                        {/* Date and Time Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="preferredDate" className="block text-lg font-medium text-gray-700">
                                    Preferred Date
                                </label>
                                <input
                                    id="preferredDate"
                                    type="date"
                                    value={preferredDate}
                                    onChange={(e) => setPreferredDate(e.target.value)}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="preferredTime" className="block text-lg font-medium text-gray-700">
                                    Preferred Time
                                </label>
                                <input
                                    id="preferredTime"
                                    type="time"
                                    value={preferredTime}
                                    onChange={(e) => setPreferredTime(e.target.value)}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                    required
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}

                        {/* Success Message */}
                        {successMessage && <div className="text-green-600 text-sm">{successMessage}</div>}

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                            >
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default HouseToHouseService;
