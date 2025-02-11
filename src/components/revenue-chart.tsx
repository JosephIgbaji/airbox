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

const labels = Array(9).fill("2023");

const data = {
  labels,
  datasets: [
    {
      label: "Collected Fee",
      data: [30, 40, 35, 35, 35, 30, 35, 35, 35],
      backgroundColor: "rgb(37, 99, 235)",
    },
    {
      label: "Total Fee",
      data: [70, 85, 80, 80, 80, 65, 70, 80, 80],
      backgroundColor: "rgb(241, 245, 249)",
    },
  ],
};

export function FeesCollectionChart() {
  return (
    <div className="w-full h-full">
      <Bar options={options} data={data} />
    </div>
  );
}
