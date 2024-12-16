import { Users, Activity, Award } from "lucide-react";

export function Stats() {
  const stats = [
    {
      icon: Users,
      value: "10K+",
      label: "Active Users",
    },
    {
      icon: Activity,
      value: "1M+",
      label: "Activities Tracked",
    },
    {
      icon: Award,
      value: "500K+",
      label: "Tokens Earned",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white dark:bg-dark-800 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            <stat.icon className="w-8 h-8 text-blue-500 mb-4" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
