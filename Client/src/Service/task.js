// ✨ New function: Get Orders assigned to an employee (based on their tasks)
const getOrdersAssignedToEmployee = async (employeeId, token) => {
    try {
      const response = await axios.get(`/assigned-orders/${employeeId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
  
      return response.data.orders; // Assuming the controller returns { orders: [...] }
    } catch (error) {
      console.error("Error fetching orders assigned to employee:", error);
      throw error;
    }
  };
  
  // ✅ New: Update service completed status (checkbox toggle)
  const updateServiceCompleted = async (data, token) => {
    try {
      const response = await axios.put("/updateservicecompleted", data, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error updating service completion:", error);
      throw error;
    }
  };
  
  // ✅ New: Mark entire task as completed
  const updateTaskCompleted = async (orderId, token) => {
    try {
      const response = await axios.put(`/updatetaskcompleted/${orderId}`, {}, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error updating task completed:", error);
      throw error;
    }
  };
  
  const getOrderServices = async (orderId, token) => {
    try {
      const response = await axios.get(`/order-services/${orderId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching order services:", error);
      throw error;
    }
  };
  
  
  const getOrderDetails = async (orderId, token) => {
    try {
      const response = await axios.get(`/order-details/${orderId}`, {
        headers: { 
          'Content-Type': 'application/json',
          'x-access-token': token 
        }
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', {
        url: error.config.url,
        status: error.response?.status,
        data: error.response?.data
      });
      throw new Error(error.response?.data?.message || 'Failed to fetch order details');
    }
  };
  
  
  const updateServiceStatus = async (orderId, serviceId, completed, token) => {
    try {
      await axios.put(
        `/${orderId}/services/${serviceId}/status`,
        { completed },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          }
        }
      );
    } catch (error) {
      console.error("Error updating service status:", error);
      throw error;
    }
  };