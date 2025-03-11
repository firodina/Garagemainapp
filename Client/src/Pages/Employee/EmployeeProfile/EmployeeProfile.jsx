import React from "react";
import EmployeeMenu from "../../../components/Employee/EmployeeMenu/EmployeeMenu";
import EmployeeProfile from "../../../components/Employee/EmployeeProfile/EmployeeProfilel";

function EmployeePofile() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <EmployeeMenu/>
          </div>
          <div className="col-md-6 admin-right-side">
            <EmployeeProfile/>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeePofile;
