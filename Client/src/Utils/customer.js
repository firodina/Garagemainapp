const customerAuthHeader = async () => {
    const customer = JSON.parse(localStorage.getItem("customer"));
    if (customer && customer.customer_token) {
      const decodedToken = decodeTokenPayload(customer.customer_token);
      customer.customer_id = decodedToken.customer_id;
      customer.customer_email = decodedToken.customer_email;
      customer.customer_first_name = decodedToken.customer_first_name;  
      customer.customer_role = decodedToken.customer_role;
      return customer;
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
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  };
  
  export default customerAuthHeader;