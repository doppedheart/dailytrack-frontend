import { UserPlus, Activity, Coins, Share2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Account",
      description: "Sign up and connect your wallet",
    },
    {
      icon: Activity,
      title: "Track Activities",
      description: "Log your daily activities and achievements",
    },
    {
      icon: Coins,
      title: "Earn Tokens",
      description: "Get rewarded for completing activities",
    },
    {
      icon: Share2,
      title: "Share & Trade",
      description: "Use tokens in our marketplace or trade them",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
        How It Works
      </h2>
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 hidden md:block" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white dark:bg-dark-800 rounded-full flex items-center justify-center shadow-lg mb-4 relative z-10">
                  <step.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
