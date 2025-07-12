// src/Service/customerLoginService.js
const customerLogIn = async (formData) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    };

    try {
        const response = await fetch("http://localhost:3005/api/customer/login", requestOptions);

        if (response.ok) {
            return response; // Return customer response if successful
        } else {
            const errorMessage = await response.text(); // Get error message from server
            throw new Error(`Customer login failed: ${errorMessage}`);
        }
    } catch (error) {
        console.error("Error during customer login:", error);
        throw new Error("An unexpected error occurred during customer login.");
    }
};

export default customerLogIn;