import { useRequestReliefContext } from "@/providers/app-context-provider/request-relief-provider";
import { SearchX } from "lucide-react";
import React from "react";

const EmptyData = ({
  onRemove,
  title,
  description,
  icon,
  removeText,
}: {
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
  icon: any;
  description: string;
  removeText: any;
}) => {
  const { open, setOpen } = useRequestReliefContext();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 rounded-lg">
      <div className="bg-gray-50 rounded-full p-3 mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        {description}
      </p>
      <button
        onClick={onRemove ?? (() => setOpen(true))}
        className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
      >
        {removeText}
      </button>
    </div>
  );
};

export default EmptyData;
