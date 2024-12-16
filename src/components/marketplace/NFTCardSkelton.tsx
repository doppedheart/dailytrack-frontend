export function NFTCardSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-4 space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
          </div>
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
}
