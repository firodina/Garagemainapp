import React, { useState } from "react";

import EmployeesList from "../../components/Admin/EmployeeList/EmployeeList";
import AdminMenu from "../../components/Admin/Adminmenu/AdminMenu";

function Employees() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile menu button (hidden on desktop) */}
    

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Admin Menu */}
      <AdminMenu
        mobile={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:ml-10 md:mt-0 mt-16 overflow-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <EmployeesList />
        </div>
      </div>
    </div>
  );
}

export default Employees;