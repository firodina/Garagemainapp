import React, { useState, useEffect } from "react";
import EmployeeService from "../../../Service/employee.service";
import { useAuth } from "../../../Contexts/AuthContext";

function EmployeeProfile() {
  const [employeeInfo, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee } = useAuth();
  const employeeId = employee.employee_id;

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const data = await EmployeeService.fetchEmployeeById(employeeId);
        setEmployee(data.data);
      } catch (error) {
        setError("Failed to fetch employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  if (!employeeInfo) {
    return <div className="text-center py-8">No employee data found.</div>;
  }

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg  p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center !mb-10 text-gray-800">
            Employee Profile
          </h1>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Profile Image */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <img
                  src={employeeInfo.employee_image || "default-avatar.png"}
                  alt="Profile"
                  className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
                />
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-semibold text-gray-700 min-w-[120px]">Name:</span>
                  <span className="text-gray-600">
                    {`${employeeInfo.employee_first_name} ${employeeInfo.employee_last_name}`}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-700 min-w-[120px]">Email:</span>
                  <span className="text-gray-600">{employeeInfo.employee_email}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-700 min-w-[120px]">Phone:</span>
                  <span className="text-gray-600">{employeeInfo.employee_phone}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-700 min-w-[120px]">Position:</span>
                  <span className="text-gray-600">Employee</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-700 min-w-[120px]">Department:</span>
                  <span className="text-gray-600">Mechanic</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-700 min-w-[120px]">Date of Hire:</span>
                  <span className="text-gray-600">
                    {new Date(employeeInfo.added_date).toLocaleDateString()}
                  </span>
                </li>
                {/* Add more fields as needed */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;