import { Upload } from "lucide-react";
import { forwardRef } from "react";

interface ImageUploadProps {
  previewUrl: string;
  onImageChange: (file: File) => void;
}

export const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ previewUrl, onImageChange }, ref) => {
    return (
      <div className="w-full">
        <label
          className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
            previewUrl ? "border-green-300" : "border-gray-300"
          }`}
        >
          <input
            type="file"
            ref={ref}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageChange(file);
            }}
          />

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="NFT Preview"
              className="absolute inset-0 w-full h-full object-contain p-2 rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 10MB)</p>
            </div>
          )}
        </label>
      </div>
    );
  }
);
