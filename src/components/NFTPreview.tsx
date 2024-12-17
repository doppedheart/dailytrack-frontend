import { NFTMetadata } from "../types";

interface NFTPreviewProps {
  metadata: NFTMetadata;
}

export function NFTPreview({ metadata }: NFTPreviewProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-lg dark:bg-gray-900">
      <div className="aspect-square relative">
        {metadata.image ? (
          <img
            src={metadata.image}
            alt={metadata.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 dark:bg-gray-800 dark:text-gray-200">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 dark:text-gray-200">
          {metadata.name || "Unnamed NFT"}
        </h3>
        <p className="text-gray-600 text-sm mb-4 dark:text-gray-200">
          {metadata.description || "No description"}
        </p>
        {metadata.attributes.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-100">
              Properties
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {metadata.attributes.map((attr, index) => (
                <div
                  key={index}
                  className="bg-blue-50 p-2 rounded-md text-xs dark:bg-blue-700"
                >
                  <div className="text-blue-500 font-medium dark:text-blue-50">
                    {attr.trait_type}
                  </div>
                  <div className="text-blue-700 dark:text-blue-50">
                    {attr.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
