import axios from "axios";
import Navbar from "./Navbar";
import ApiConfig from "../utils/ApiConfig";
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<any>([]);
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: []
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(ApiConfig.API_CHART_URL);
      const data = response.data;
      setChartData({
        labels: data.map((item: any) => item.department),
        datasets: [
          {
            label: 'Success Percentage',
            data: data.map((item: any) => item.successPercentage),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getDashboardData = async () => {
    try {
      const response = await axios.get(ApiConfig.API_DASHBOARD_URL);
      setDashboardData(Object.entries(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      <Navbar header={"Dashboard"} />
      <div className="w-[90%] h-screen mx-8 px-6 rounded-lg fixed top-32 overflow-scroll md:overflow-hidden scrollbar">
        <div className="flex justify-around">
          {dashboardData.map((data: any, index: number) => (
            <div
              key={index}
              className="bg-white w-60 h-24 flex items-start shadow-lg rounded-lg overflow-hidden"
            >
              <div className="px-2 h-full bg-[#0CC9E8]"></div>
              <div className="pl-4 pt-4">
                <h2 className="text-md font-medium text-gray-700">{data[0]}</h2>
                <p className="text-4xl font-bold text-gray-500">{data[1]}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Bar
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Success Percentage'
                  }
                }
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'top'
                },
                title: {
                  display: true,
                  text: 'Department-wise Project Success Percentage'
                }
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
