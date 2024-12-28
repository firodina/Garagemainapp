// import React from 'react';
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import StatusDashboard from "../../components/StatusDashboard/StatusDashboard";
import "./AddCustomer.css"
function AdminDashbord () {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side mt-3">
              <AdminMenu/>  
          </div>
          <div className="col-md-9 admin-right-side p-0 m-0 mt-3">
            <StatusDashboard/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashbord;
