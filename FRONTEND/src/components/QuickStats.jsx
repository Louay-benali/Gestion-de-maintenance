import React from "react";
import {
  FiActivity,
  FiAlertCircle,
  FiCheckCircle,
  FiCalendar,
  FiTrendingUp,
} from "react-icons/fi";

const QuickStats = () => {
  const stats = [
    {
      title: "Maintenances en cours",
      value: "8",
      icon: <FiActivity className="w-6 h-6 text-blue-500" />,
      change: "+2.5%",
      changeType: "increase",
      subtitle: "From last month",
    },
    {
      title: "Pannes non résolues",
      value: "3",
      icon: <FiAlertCircle className="w-6 h-6 text-red-500" />,
      change: "-1.1%",
      changeType: "decrease",
      subtitle: "From last month",
    },
    {
      title: "Disponibilité machines",
      value: "92%",
      icon: <FiCheckCircle className="w-6 h-6 text-green-500" />,
      change: "+3.2%",
      changeType: "increase",
      subtitle: "From last month",
    },
    {
      title: "Maintenances prévues",
      value: "12",
      icon: <FiCalendar className="w-6 h-6 text-purple-500" />,
      change: "Cette semaine",
      changeType: "neutral",
      subtitle: "From last month",
    },
    {
      title: "KPI Maintenance",
      value: "87%",
      icon: <FiTrendingUp className="w-6 h-6 text-indigo-500" />,
      change: "+5.4%",
      changeType: "increase",
      subtitle: "From last month",
    },
  ];

  return (
    <div className="flex flex-wrap justify-start gap-6 p-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex-grow basis-[30%] min-w-[300px] bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="space-y-3">
            <div className="flex flex-col">
              <h3 className="text-[32px] font-semibold text-gray-900">
                {stat.value}
              </h3>
              <p className="text-base text-gray-600 mt-1">{stat.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : stat.changeType === "decrease"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500">{stat.subtitle}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
