// src/util/employeeAuthHeader.js

const employeeAuthHeader = async () => {
    const employee = JSON.parse(localStorage.getItem("employee"));
    if (employee && employee.employee_token) {
      const decodedToken = decodeTokenPayload(employee.employee_token);
      employee.employee_role = decodedToken.employee_role;
      employee.employee_id = decodedToken.employee_id;
      employee.employee_first_name = decodedToken.employee_first_name;
      // employee.customer_id = decodedToken.customer_id;
      // employee.customer_email = decodedToken.customer_email;
      return employee;
    } else {
      return {};
    }
  };
  
  const decodeTokenPayload = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  };
  
  export default employeeAuthHeader;
  