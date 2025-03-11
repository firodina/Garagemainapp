import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddCustomerForm from "../../Components/Admin/AddCustomer/AddCustomerForm";

function Addcustomer() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu/>
          </div>
          <div className="col-md-8 admin-right-side">
            <AddCustomerForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addcustomer;
