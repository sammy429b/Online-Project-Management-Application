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
import DashboardCard from "./DashboardCard";

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

  const options = {
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
  };

  return (
    <>
      <Navbar header={"Dashboard"} />
      <div className="w-full md:w-[90%] h-screen mx-4 md:mx-8 px-0 md:px-6 rounded-lg fixed top-32 overflow-scroll md:overflow-hidden scrollbar">
        <div className="flex md:justify-between justify-center gap-x-2 md:gap-x-0">
          {dashboardData.slice(0, 5).map((data: any, index: number) => (
            <div key={index} className={`${index >= 3 ? 'hidden md:block' : ''}`}>
              <DashboardCard data={data}/>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
