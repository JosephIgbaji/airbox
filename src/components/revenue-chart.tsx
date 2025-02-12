import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetAllMetricQuery } from "../service/metric.service";
import { useEffect, useState } from "react";
import { set } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      // beginAtZero: true,
      // max: 100,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

// const labels = Array(9).fill("2023");

export function FeesCollectionChart() {
  const { data: metricData, isLoading, refetch } = useGetAllMetricQuery();
  console.log("MetricRevenue: ", metricData);
  const [revenue, setRevenue] = useState([]);
  const [totalBooking, setTotalBooking] = useState([]);
  const [label, setLabel] = useState([]);

  useEffect(() => {
    if (metricData) {
      const newRev = [];
      const newTotal = [];
      const newLabel = [];
      metricData?.revenue.map((item) => {
        // setTotalBooking((prev) => [...prev, item.totalFee]);
        newRev.push(item.total);
      });
      metricData?.totalBookingPerMonth.map((item) => {
        // setTotalBooking((prev) => [...prev, item.totalFee]);
        newTotal.push(item.totalBookings * 10000);
        newLabel.push(item._id.month);
      });
      setRevenue(newRev);
      setTotalBooking(newTotal);
      setLabel(newLabel);
    }
  }, [metricData]);

  // console.log("Revenue: ", revenue);

  const labels = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        // data: [0, 40, 35, 35, 35, 30, 35, 35, 35],
        data: revenue,
        backgroundColor: "rgb(37, 99, 235)",
      },
      {
        label: "Total Booking",
        data: totalBooking,
        backgroundColor: "rgb(241, 245, 249)",
      },
    ],
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full">
      <Bar options={options} data={data} />
    </div>
  );
}
