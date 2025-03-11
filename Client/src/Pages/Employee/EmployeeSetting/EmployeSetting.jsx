import React from "react";
import EmployeeMenu from "../../../components/Employee/EmployeeMenu/EmployeeMenu";
import EmployeeSetting from "../../../components/Employee/EmployeeSetting/EmployeeSetting";
function EmployeSetting() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <EmployeeMenu/>
          </div>
          <div className="col-md-9 admin-right-side">
            <EmployeeSetting/>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeSetting;
