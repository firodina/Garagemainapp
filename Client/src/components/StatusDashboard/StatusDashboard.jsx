import { useEffect, useState } from "react";
import employeeService from "../../Service/employee.service";
import orderService from "../../Service/order.service";
import serviceService from "../../Service/service.service";
import EmployeeStatsChart from "../EmployeeStatusChart/EmployeeStatusChart";
import CustomerStatusChart from "../CustomerStatusChart/CustomerStatusChart";

const StatusDashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [activeEmployeeCount, setActiveEmployeeCount] = useState(0); // State for Active Employees

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const employees = await employeeService.getAllEmployees(token);
        setEmployeeCount(employees.length);

        const orders = await orderService.getAllOrders();
        setOrderCount(orders.length);

        const services = await serviceService.getAllServices();
        setServiceCount(services.length);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl mt-2 font-bold">{orderCount}</p>
        </div>
        <div className="bg-green-500 text-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold">Total Services</h3>
          <p className="text-2xl mt-2 font-bold">{serviceCount}</p>
        </div>
        <div className="bg-cyan-500 text-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold">Active Employees</h3>
          <p className="text-2xl mt-2 font-bold">{activeEmployeeCount}</p> {/* Display Active Employees Count */}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <EmployeeStatsChart setActiveEmployeeCount={setActiveEmployeeCount} /> {/* Pass setter function */}
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <CustomerStatusChart />
        </div>
      </div>
    </div>
  );
};

export default StatusDashboard;