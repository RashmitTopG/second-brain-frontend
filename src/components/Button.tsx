import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-purple-dark text-white",
  secondary: "bg-purple-medium text-purple-light",
};

const defaultStyles =
  "px-4 py-2 rounded-md font-light flex items-center justify-center transition-all";

export const Button = ({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
}: ButtonProps) => {
  return (
    <button
      className={`
        ${variantClasses[variant]}
        ${defaultStyles}
        ${fullWidth ? "w-full" : ""}
        ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
      `}
      disabled={loading}
      onClick={onClick}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {text}
    </button>
  );
};
