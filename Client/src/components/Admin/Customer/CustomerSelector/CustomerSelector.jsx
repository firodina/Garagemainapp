import React, { useState, useEffect } from "react";
import { Form, Spinner } from "react-bootstrap";
import customerService from "../../../../Service/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const CustomerSelector = ({ onSelect, initialCustomerId }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { employee } = useAuth();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await customerService.getAllCustomers(
          employee.employee_token
        );
        setCustomers(data);

        if (initialCustomerId) {
          const initialCustomer = data.find(
            (c) => c.customer_id.toString() === initialCustomerId.toString()
          );
          if (initialCustomer) {
            onSelect(initialCustomer);
          }
        }
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [employee, initialCustomerId, onSelect]);

  const handleChange = (e) => {
    const selectedCustomer = customers.find(
      (c) => c.customer_id.toString() === e.target.value
    );
    if (selectedCustomer) {
      onSelect(selectedCustomer);
    }
  };

  if (loading) return <Spinner size="sm" />;

  return (
    <Form.Select onChange={handleChange} value={initialCustomerId || ""}>
      <option value="">Select a customer</option>
      {customers.map((customer) => (
        <option key={customer.customer_id} value={customer.customer_id}>
          {customer.first_name} {customer.last_name}
        </option>
      ))}
    </Form.Select>
  );
};

export default CustomerSelector;
