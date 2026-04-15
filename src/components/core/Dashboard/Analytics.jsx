import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function Analytics() {
  // 🔥 Dummy data (you can connect API later)
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: [2000, 5000, 7000, 4000, 9000],
      },
    ],
  };

  const courseData = {
    labels: ["React", "Node", "MongoDB", "JS"],
    datasets: [
      {
        label: "Courses Sold",
        data: [10, 15, 8, 20],
      },
    ],
  };
}