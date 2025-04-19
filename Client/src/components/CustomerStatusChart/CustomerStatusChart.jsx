import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerStatsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/customers/status");
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
                  "rgba(34,197,94,0.6)",
                  "rgba(239,68,68,0.6)",
                  "rgba(251,191,36,0.6)",
                ],
                borderColor: [
                  "rgba(34,197,94,1)",
                  "rgba(239,68,68,1)",
                  "rgba(251,191,36,1)",
                ],
                borderWidth: 2,
              },
            ],
          });
        } else {
          setError("No data available");
        }
      } catch (error) {
        console.error("Error fetching customer stats:", error);
        setError("Failed to fetch customer stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerStats();
  }, []);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 h-[80vh] shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Statistics</h2>
      {loading ? (
        <div className="flex justify-center items-center h-full text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <Doughnut data={chartData} />
      )}
    </div>
  );
};

export default CustomerStatsChart;
