import { NFTMetadata } from "../../types";
import { ExternalLink } from "lucide-react";
import { NFTCardSkeleton } from "./NFTCardSkelton";

interface NFTCardProps {
  listing: NFTMetadata;
  onBuy: (listing: NFTMetadata) => void;
  isPurchasing: boolean;
}

export function NFTCard({ listing, onBuy, isPurchasing }: NFTCardProps) {
  if (isPurchasing) {
    return <NFTCardSkeleton />;
  }
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
      <div className="aspect-square relative">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {listing.name}
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {listing.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {listing.price?.toString()} HTO
            </p>
          </div>
          <button
            onClick={() => onBuy(listing)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buy Now
            <ExternalLink className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
