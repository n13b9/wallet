"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-white bg-blue-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-6 py-2 me-2 mb-2"
    >
      {children}
    </button>
  );
};
