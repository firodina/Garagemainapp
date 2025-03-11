import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddEmployeeForm from "../../components/Admin/AddEmployeeForm/AddEmployeeFrom";
// Import the AddEmployeeForm component
// Import the AdminMenu component

function AddEmployee() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu/>
          </div>
          <div className="col-md-9 admin-right-side">
            <AddEmployeeForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
