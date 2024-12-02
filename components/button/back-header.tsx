"use client";

import { ArrowLeft } from "lucide-react";

interface IBackButton {
  text: string;
  onClick: () => void;
}

const BackButton = ({ text, onClick }: IBackButton) => {
  return (
    <div className="lg:hidden sticky top-14 left-0 z-[12] w-full border-b border-b-gray-300">
      <button
        onClick={onClick}
        className="w-full flex items-center gap-2 min-h-14 bg-white px-4"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="font-medium text-gray-700">{text}</span>
      </button>
    </div>
  );
};

export default BackButton;
