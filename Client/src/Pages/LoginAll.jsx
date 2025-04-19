import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomerLogin from '../components/LoginAsCustomer/LoginAsCustomer';
import Login from '../components/Login/Login';
import img9 from "../assets/img/banner/10006.jpg";

function LoginAll() {
    const [activeTab, setActiveTab] = useState('employee');

    // Animation variants
    const tabContentVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <>
            {/* Hero Banner with Parallax Effect */}
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
                    marginBottom: 0,
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

            {/* Login Section */}
            <div className="container mx-auto px-4 py-8 sm:py-12">
                {/* Animated Tab Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center mb-8 sm:mb-12"
                >
                    <div className="inline-flex rounded-full shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <button
                            onClick={() => setActiveTab('employee')}
                            className={`px-6 py-3 text-sm sm:text-base font-medium transition-all duration-300 ${activeTab === 'employee'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            Employee Login
                        </button>
                        <button
                            onClick={() => setActiveTab('customer')}
                            className={`px-6 py-3 text-sm sm:text-base font-medium transition-all duration-300 ${activeTab === 'customer'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            Customer Login
                        </button>
                    </div>
                </motion.div>

                {/* Full-width Form Container with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="w-full"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={tabContentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden p-6 sm:p-8 w-full"
                        >
                            {activeTab === 'employee' ? <Login /> : <CustomerLogin />}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Additional Options with Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-8 text-center"
                >
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        {activeTab === 'employee'
                            ? "Need help with your employee account?"
                            : "Don't have a customer account?"}
                        <a
                            href={activeTab === 'employee' ? "#employee-help" : "#customer-signup"}
                            className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                        >
                            {activeTab === 'employee' ? "Contact support" : "Sign up now"}
                        </a>
                    </p>
                </motion.div>
            </div>

            {/* Footer with Animation */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="bg-gray-100 dark:bg-gray-900 py-6 mt-12"
            >
                <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </motion.footer>
        </>
    );
}

export default LoginAll;