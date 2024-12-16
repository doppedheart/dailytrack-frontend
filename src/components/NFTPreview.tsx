import { NFTMetadata } from "../types";

interface NFTPreviewProps {
  metadata: NFTMetadata;
}

export function NFTPreview({ metadata }: NFTPreviewProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-lg">
      <div className="aspect-square relative">
        {metadata.image ? (
          <img
            src={metadata.image}
            alt={metadata.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">
          {metadata.name || "Unnamed NFT"}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {metadata.description || "No description"}
        </p>
        {metadata.attributes.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700">Properties</h4>
            <div className="grid grid-cols-2 gap-2">
              {metadata.attributes.map((attr, index) => (
                <div key={index} className="bg-blue-50 p-2 rounded-md text-xs">
                  <div className="text-blue-500 font-medium">
                    {attr.trait_type}
                  </div>
                  <div className="text-blue-700">{attr.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
