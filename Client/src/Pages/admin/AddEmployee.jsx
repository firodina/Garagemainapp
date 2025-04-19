import { useState } from "react";
import AddEmployeeForm from "../../components/Admin/AddEmployeeForm/AddEmployeeFrom";
import AdminMenu from "../../components/Admin/Adminmenu/AdminMenu";

function AddEmployee() {
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
      <div className="flex-1 p-4 md:ml-24 overflow-auto mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto">
          <AddEmployeeForm />
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;