import { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DashboardCard from "../components/DashboardCard";
import Navbar from "../components/Navbar";
import ApiConfig from "../utils/ApiConfig";
import { useAuth } from "../context/useAuth";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<any>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const { handleLogout } = useAuth();
  

  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: Array.isArray(chartData) ? chartData.map((data: any) => data.department) : [],
      
      title: {
        // text: 'Departments'
      }
    },
    yAxis: {
      min: 0,
      title: {
        // text: 'Number of Projects'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: (Highcharts.defaultOptions?.title?.style && Highcharts.defaultOptions.title.style.color) || 'gray'
        }
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: Highcharts.defaultOptions?.legend?.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      bar: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {
        name: 'Total projects',
        data:Array.isArray(chartData) ? chartData.map((data: any) => data.totalProjects) : [],
        color: 'rgb(53, 162, 235)',
      },
      {
        name: 'Closed projects',
        data: Array.isArray(chartData) ? chartData.map((data: any) => data.closedProjects) : [],
        color: 'rgb(255, 99, 132)',
      }
    ]
  };

  // Fetch chart data
  const fetchData = async () => {
    try {
      const response = await axios.get(ApiConfig.API_CHART_URL, {
        withCredentials: true, // Important for sending cookies
      });
      const data = response.data;
      if(data.tokenExpired){
        handleLogout();
      }
      setChartData(data);
      // console.log('Chart data:', data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  // Fetch dashboard data
  const getDashboardData = async () => {
    try {
      const response = await axios.get(ApiConfig.API_DASHBOARD_URL, {
        withCredentials: true,
      });
      setDashboardData(Object.entries(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    getDashboardData();
  }, []);

  return (
    <>
      <Navbar header={"Dashboard"} />
      <div className="w-full md:w-[95%] h-screen mx-2 md:mx-0 px-0 md:px-6 rounded-lg fixed top-16 md:top-32 scrollbar">
        <div className="w-full flex md:justify-between gap-x-2 overflow-scroll scrollbar px-4">
          { dashboardData.slice(0, 5).map((data: any, index: number) => (
            <div key={index} className={`${index >= 5 ? 'hidden md:block' : ''}`}>
              <DashboardCard data={data} />
            </div>
          ))}
        </div>
        <div className="w-full py-2 pr-8 pl-4 mt-4 md:mx-0 h-96 md:h-80 md:w-1/2 rounded-xl">
          <h2 className="text-lg ml-2 mb-2 font-medium">Department wise Total vs Closed Projects</h2>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
