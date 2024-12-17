import { Smartphone, Trophy, Shield, Zap } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: Smartphone,
      title: "Easy Tracking",
      description: "Track your activities seamlessly with our mobile app",
    },
    {
      icon: Trophy,
      title: "Earn Rewards",
      description: "Convert your activities into valuable tokens",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description:
        "Your data and tokens are protected by blockchain technology",
    },
    {
      icon: Zap,
      title: "Instant Rewards",
      description: "Receive tokens immediately after activity verification",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Why Choose DailyTrack?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl dark:hover:bg-dark-700 transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
