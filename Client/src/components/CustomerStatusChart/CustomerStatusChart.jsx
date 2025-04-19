import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Register necessary components with ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerStatsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/customers/status"
        );
        const data = response.data.data;

        if (data) {
          setChartData({
            labels: [
              "Approved Customers",
              "Non-Approved Customers",
              "Total Customers",
            ],
            datasets: [
              {
                label: "Customer Status",
                data: [
                  data.approved_customers[0],
                  data.non_approved_customers[0],
                  data.totalCustomers[0],
                ],
                backgroundColor: [
                  "rgba(0, 255, 0, 0.8)",
                  "rgba(255, 99, 132, 0.8)",
                  "rgba(255, 159, 64, 0.8)",
                ],
                borderColor: [
                  "rgba(0, 255, 0, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 2,
              },
            ],
          });
        } else {
          setError("Data is empty or not in the expected format.");
        }
      } catch (error) {
        console.error("Error fetching customer stats:", error);
        setError("Error fetching customer stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerStats();
  }, []);

  if (loading) {
    return (
      <Card>
        <Card.Header as="h5">Customer Statistics</Card.Header>
        <Card.Body>Loading...</Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Card.Header as="h5">Customer Statistics</Card.Header>
        <Card.Body>{error}</Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header as="h5">Customer Statistics</Card.Header>
      <Card.Body>
        <div style={{ height: "100%" }}>
          <Doughnut data={chartData} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomerStatsChart;
