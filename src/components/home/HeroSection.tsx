import { Activity, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 dark:from-blue-900/30 dark:to-purple-900/30 -z-10" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Activity className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            <div className="absolute -inset-4 bg-blue-500/20 dark:bg-blue-400/20 rounded-full blur-lg -z-10" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Track Your Activity
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Turn your daily activities into rewards. Earn tokens while maintaining
          a healthy lifestyle.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <button className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
