import React from "react";
import { Line } from "react-chartjs-2";

const DashboardPro = () => {

  const xp = parseInt(localStorage.getItem("xp")) || 0;
  const level = Math.floor(xp / 100);

  const data = {
    labels: ["Start", "Current"],
    datasets: [
      {
        label: "XP Growth",
        data: [0, xp],
      },
    ],
  };

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl mb-4">📊 Dashboard</h1>

      <div className="mb-4">
        <p>⭐ XP: {xp}</p>
        <p>🏆 Level: {level}</p>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-gray-700 h-2 mb-4">
        <div
          className="bg-yellow-400 h-2"
          style={{ width: `${xp % 100}%` }}
        ></div>
      </div>

      <Line data={data} />

    </div>
  );
};

export default DashboardPro;