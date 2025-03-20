import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components with ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeeStatsChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchEmployeeStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/employees/stats"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        setChartData({
          labels: ["Active Employees", "Inactive Employees", "Total Employees"],
          datasets: [
            {
              label: "Employee Status",
              data: [
                data.data.activeEmployees,
                data.data.inactiveEmployees,
                data.data.totalEmployees,
              ],
              backgroundColor: [
                "rgba(0, 123, 255, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(255, 205, 86, 0.6)",
              ],
              borderColor: [
                "rgba(0, 123, 255, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 205, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching employee stats:", error);
      }
    };

    fetchEmployeeStats();
  }, []);

  if (!chartData) {
    return (
      <Card
        style={{
          backgroundColor: "#fff", // White background
          borderColor: "#ddd",
          height: "100vh",
        }}
      >
        <Card.Header as="h5" style={{ color: "#000" }}>
          Employee Statistics
        </Card.Header>
        <Card.Body style={{ height: "100%" }}>Loading...</Card.Body>
      </Card>
    );
  }

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000", // Legend text color changed to black
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.chart.data.datasets[0].data.reduce(
              (a, b) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} Employees (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Card
      style={{
        backgroundColor: "#fff",
        borderColor: "#ddd",
        height: "80vh",
      }}
    >
      <Card.Header as="h5" style={{ color: "#000" }}>
        Employee Statistics
      </Card.Header>
      <Card.Body style={{ height: "80%", paddingBottom: "50px" }}>
        <div style={{ height: "100%" }}>
          <Pie data={chartData} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default EmployeeStatsChart;
