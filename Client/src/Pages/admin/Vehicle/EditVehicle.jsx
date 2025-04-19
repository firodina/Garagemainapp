import React from "react";
import AdminMenu from "../../../components/Admin/Adminmenu/AdminMenu";
import EditVehicleForm from "../../../components/Admin/Vehicle/EditVehicle/EditVehicleForm";

function EditVehicle() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu/>
          </div>
          <div className="col-md-9 admin-right-side">
            <EditVehicleForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditVehicle;
