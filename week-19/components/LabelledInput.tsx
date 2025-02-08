"use client";

import { Ref } from "react";

interface LabelledInputProps {
  type: "text" | "password" | "email" | "date";
  label: string;
  placeholder?: string;
  reference?: Ref<HTMLInputElement> | null;
}

export default function LabelledInput({
  type,
  label,
  placeholder,
  reference,
}: LabelledInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-white text-sm font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        ref={reference}
        className="text-black"
      />
    </div>
  );
}
