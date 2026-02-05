import React, { forwardRef, type ChangeEvent } from "react";

interface InputProps {
  value?: string;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, placeholder, onChange }, ref) => {
    return (
      <input
        ref={ref}
        value={value}
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 border rounded m-2"
        onChange={onChange}
      />
    );
  }
);
