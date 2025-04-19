import React from "react";
import AdminMenu from "../../../components/Admin/Adminmenu/AdminMenu";
import VehicleDetail from '../../../components/Admin/Vehicle/VehicleDetail/VehicleDetail'
function VehicleDetailPage() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <VehicleDetail/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetailPage;

