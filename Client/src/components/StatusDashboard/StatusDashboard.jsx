// src/components/StatsDashboard.jsx
import React from "react";
import EmployeeStatusChart from "../EmployeeStatusChart/EmployeeStatusChart";
import CustomerStatsChart from "../CustomerStatusChart/CustomerStatusChart";

const StatusDashboard = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-2xl font-bold">37</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Services</h3>
          <p className="text-2xl font-bold">49</p>
        </div>
        <div className="bg-cyan-600 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Active Employees</h3>
          <p className="text-2xl font-bold">48</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl">
          <EmployeeStatusChart />
        </div>
        <div className="rounded-xl ">
          <CustomerStatsChart />
        </div>
      </div>
    </div>
  );
};

export default StatusDashboard;
