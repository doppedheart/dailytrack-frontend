import { Search, SlidersHorizontal } from "lucide-react";
import { MarketplaceFilters } from "../../types";

interface FilterBarProps {
  filters: MarketplaceFilters;
  onFilterChange: (filters: MarketplaceFilters) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="bg-white dark:bg-dark-800 p-4 rounded-lg shadow-sm transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search NFTs..."
              value={filters.searchTerm || ""}
              onChange={(e) =>
                onFilterChange({ ...filters, searchTerm: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2 border dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-32">
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-4 py-2 border dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <div className="w-32">
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-4 py-2 border dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <button className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 border dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            More Filters
          </button>
        </div>
      </div>
    </div>
  );
}
