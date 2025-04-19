import React, { useState } from "react";
import AdminMenu from "../../components/Admin/Adminmenu/AdminMenu";
import CustomerUpdate from "../../components/Admin/Customer/UpdateCustomer/CustomerUpdate";


const CustomerUpdatePage = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side px-0">
            <CustomerUpdate/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerUpdatePage;
