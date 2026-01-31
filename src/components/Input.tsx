import type { ChangeEvent } from "react";

interface InputProps {
  value?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ value, placeholder, onChange }: InputProps) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      type="text"
      className="px-4 py-2 border rounded m-2"
      onChange={onChange}
    />
  );
}
