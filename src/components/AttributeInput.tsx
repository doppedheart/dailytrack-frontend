import { X } from "lucide-react";

interface AttributeInputProps {
  index: number;
  trait: string;
  value: string;
  onChange: (
    index: number,
    field: "trait_type" | "value",
    value: string
  ) => void;
  onRemove: (index: number) => void;
}

export function AttributeInput({
  index,
  trait,
  value,
  onChange,
  onRemove,
}: AttributeInputProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Trait (e.g., Color)"
          value={trait}
          onChange={(e) => onChange(index, "trait_type", e.target.value)}
          className="w-full px-4 py-2 border-2 border-dashed rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-300"
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          placeholder="Value (e.g., Blue)"
          value={value}
          onChange={(e) => onChange(index, "value", e.target.value)}
          className="w-full px-4 py-2 border-2 border-dashed rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-300"
        />
      </div>
      <button
        onClick={() => onRemove(index)}
        className="p-2 text-gray-500 hover:text-red-500"
      >
        <X size={20} />
      </button>
    </div>
  );
}
