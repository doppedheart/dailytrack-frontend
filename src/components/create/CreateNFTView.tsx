import React, { useState } from "react";
import { Plus, Upload } from "lucide-react";
import { AttributeInput } from "../AttributeInput";
import { NFTPreview } from "../NFTPreview";
import { NFTMetadata, FormErrors } from "../../types";
import Web3 from "web3";
import { useSelector } from "react-redux";
import { RootState } from "../../contexts/store";
import { ERC721Mock, ERC721MockAbi } from "../contracts/NFTfactoryAbi";
import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_PINATA_JWT}`,
  pinataGateway: `${import.meta.env.VITE_GATEWAY_URL}`,
});
export function CreateNFTView() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const [file, setFile] = useState<File | null>();
  const { isConnected, address } = useSelector(
    (state: RootState) => state.contract
  );
  const [metadata, setMetadata] = useState<NFTMetadata>({
    name: "",
    description: "",
    image: "",
    attributes: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleImageChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setFile(file);
    setMetadata((prev) => ({ ...prev, image: url }));
    setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const addAttribute = () => {
    setMetadata((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { trait_type: "", value: "" }],
    }));
  };

  const updateAttribute = (
    index: number,
    field: "trait_type" | "value",
    value: string
  ) => {
    setMetadata((prev) => ({
      ...prev,
      attributes: prev.attributes.map((attr, i) =>
        i === index ? { ...attr, [field]: value } : attr
      ),
    }));
  };

  const removeAttribute = (index: number) => {
    setMetadata((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    setIsSubmitting(true);

    if (!metadata.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!metadata.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!metadata.image) {
      newErrors.image = "Image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      const imageResponse = await pinata.upload.file(file!);

      const imageCID = imageResponse.IpfsHash;

      const metadataToUpload = {
        ...metadata,
        image: `https://ipfs.io/ipfs/${imageCID}`,
      };

      const jsonString = JSON.stringify(metadataToUpload, null, 2); // Pretty-print with 2 spaces
      const random = Math.random() * 10000;
      const fileName = `data${random}.json`;
      const blob = new File([jsonString], fileName, {
        type: "application/json",
      });
      const metadataResponse = await pinata.upload.file(blob);
      const metadataCID = metadataResponse.IpfsHash;

      const web3 = new Web3(window.ethereum);
      const NFTContract = new web3.eth.Contract(ERC721MockAbi, ERC721Mock);
      const tokenId = Math.floor(Math.random() * 10000);
      const tx = await NFTContract.methods
        .mint(address, tokenId, `https://ipfs.io/ipfs/${metadataCID}`)
        .send({
          from: address,
        });
      alert(`Nft minted successfully with tokenId: ${tokenId}`);
      console.log("transaction", tx);
    } catch (error) {
      console.error("Error during NFT creation: ", error);
      alert("An error occurred while creating the NFT");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
              NFT Image
            </label>
            <div className="w-full">
              <label
                className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed dark:border-white rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  metadata.image ? "border-green-300" : "border-gray-300"
                }`}
              >
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageChange(file);
                  }}
                />

                {metadata.image ? (
                  <img
                    src={metadata.image}
                    alt="NFT Preview"
                    className="absolute inset-0 w-full h-full object-contain p-2 rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-200" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-300">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      PNG, JPG, GIF (MAX. 10MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={metadata.name}
              onChange={(e) =>
                setMetadata((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2 border-2 border-dashed rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-300"
              placeholder="Enter NFT name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={metadata.description}
              onChange={(e) =>
                setMetadata((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className="w-full px-4 py-2 border-2 border-dashed rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-300"
              placeholder="Describe your NFT"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Attributes
              </label>
              <button
                type="button"
                onClick={addAttribute}
                className="flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus size={16} className="mr-1" />
                Add Attribute
              </button>
            </div>
            <div className="space-y-3">
              {metadata.attributes.map((attr, index) => (
                <AttributeInput
                  key={index}
                  index={index}
                  trait={attr.trait_type}
                  value={attr.value}
                  onChange={updateAttribute}
                  onRemove={removeAttribute}
                />
              ))}
            </div>
          </div>

          <button
            disabled={!isConnected || isSubmitting}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating NFT..." : "Create NFT"}
          </button>
        </form>
      </div>

      <div className="lg:sticky lg:top-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-gray-300">
          Preview
        </h2>
        <NFTPreview metadata={metadata} />
      </div>
    </div>
  );
}
