import { FC } from "react";

const sizeVariants = {
  small: {
    wrapper: "h-[32px] w-auto min-w-[80px] text-xs",
    inner: "h-[28px] w-[calc(100%-8px)]",
    padding: "px-2",
  },
  medium: {
    wrapper: "h-[40px] w-auto min-w-[108px] text-sm",
    inner: "h-[36px] w-[calc(100%-8px)]",
    padding: "px-3",
  },
  large: {
    wrapper: "h-[48px] w-auto min-w-[128px] text-base",
    inner: "h-[44px] w-[calc(100%-8px)]",
    padding: "px-4",
  },
};
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size: "small" | "medium" | "large";
  className?: string;
  disabled?: boolean;
  variant: "active" | "inactive";
}
export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  size = "medium",
  className = "",
  disabled = false,
  variant = "inactive",
}) => {
  // Determine the appropriate size variant
  const sizeClasses = sizeVariants[size] || sizeVariants.medium;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center 
        overflow-hidden font-medium group 
        bg-gradient-to-bl from-grey0 to-grey1 
        ${sizeClasses.wrapper}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}
        ${className}
      `}
    >
      <span
        className={`
            inline-flex items-center justify-center 
            ${variant === "active" ? "bg-transparent" : "bg-background"}
            ${sizeClasses.inner}
            ${sizeClasses.padding}
        `}
      >
        <span
          className={`bg-gradient-to-bl from-grey0 to-grey1 whitespace-nowrap ${
            variant === "active" ? "text-white" : "text-gradient"
          }`}
        >
          {children}
        </span>
      </span>
    </button>
  );
};
