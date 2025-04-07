import React from "react";
import EmployeeMenu from "../../../components/Employee/EmployeeMenu/EmployeeMenu";
import EmployeeProfile from "../../../components/Employee/EmployeeProfile/EmployeeProfilel";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function EmployeePofile() {



  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Admin Menu */}
      <EmployeeMenu
        mobile={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
      />
     

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto md:ml-14">
        <div className="p-4 md:p-8">
          <EmployeeProfile />
        </div>
      </div>
    </div>
  );
}



export default EmployeePofile;
