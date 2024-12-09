import { Phone } from "lucide-react";
import React from "react";

const Hotline = () => {
  return (
    <a
      href="tel:18006132"
      className="group flex items-center gap-2 px-[10px] py-1.5 rounded-lg bg-green-50 lg:hover:bg-green-100 transition-colors duration-200 cursor-pointer"
    >
      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500 lg:group-hover:bg-green-600 transition-colors">
        <Phone className="h-3.5 w-3.5 text-white" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[11px] text-green-600 font-medium">
          Hotline hỗ trợ
        </span>
        <span className="text-sm font-semibold text-green-700">1800 6132</span>
      </div>
    </a>
  );
};

export default Hotline;
