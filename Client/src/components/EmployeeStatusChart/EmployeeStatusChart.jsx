import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeeStatsChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchEmployeeStats = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/employees/stats");
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} Employees (${percentage}%)`;
          },
        },
      },
    },
  };

  if (!chartData) {
    return (
      <div className="bg-white border border-gray-300 rounded-xl p-6 h-[40vh] shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Employee Statistics</h2>
        <div className="flex items-center justify-center  text-gray-500">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 h-[80vh] shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Employee Statistics</h2>
      <div className="">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default EmployeeStatsChart;
