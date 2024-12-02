import { Dispatch, SetStateAction } from "react";
import { Phone, Share2, LinkIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { StatusBadge } from "@/utils/helper/common";

import { Badge } from "../ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { Location } from "@/types/location";
import TooltipContainer from "../tooltip-container/tooltip-container";
import { ExpandIcon } from "../icon/expand-icon";
interface LocationListProps {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  titleList: {
    title: string;
    button: string;
  };
  locations: Location[];
  onLocationSelect: (location: Location) => void;
  selectedLocation?: Location;
}

const LocationItem = ({
  location,
  onLocationSelect,
  selectedLocation,
}: Omit<LocationListProps, "expand" | "titleList" | "locations"> & {
  location: Location;
}) => {
  return (
    <div key={location.name} className="bg-gray-50">
      <div className="px-5 py-3 flex items-center gap-2 border-b border-gray-300 shadow-sm bg-gray-100">
        <span className="font-semibold text-gray-700">{location.name}</span>
        <Badge
          variant="secondary"
          className="bg-slate-200 text-slate-600 px-2 rounded-sm"
        >
          {location.count}12
        </Badge>
      </div>
      <div className="">
        {location.groupRequest.map((request) => (
          <div
            className={cn(
              "px-5 py-3 transition-colors bg-white",
              "border-b border-gray-300",
              "hover:bg-gray-50 cursor-pointer"
              // selectedLocation?.id === location.id ? "bg-blue-50" : ""
            )}
          >
            <div
              className="flex gap-4"
              onClick={() => onLocationSelect(request)}
            >
              <img
                src={request.imageUrl}
                alt={request.name}
                className="h-[70px] rounded-md aspect-square object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-red-500">{request.name}</h3>
                <p className="text-sm text-gray-600">{request.description}</p>
                <p className="mt-2 text-sm text-gray-400">{request.address}</p>
              </div>
            </div>
            <div className="mt-2 flex">
              <div className="flex-1 flex flex-wrap gap-[6px] mt-auto lg:h-7">
                <StatusBadge status="Đã xác minh" />
                <StatusBadge status="Đang tìm đội cứu trợ" />
                <StatusBadge status="Đã đủ nguồn hỗ trợ" />
              </div>
              <div className="flex gap-2 ml-auto">
                <TooltipContainer
                  trigger={
                    <Button className=" bg-gray-100 hover:bg-gray-300 text-black p-1 h-8 w-8">
                      <Phone className="h-3 w-3" />
                    </Button>
                  }
                  content="Gọi điện"
                />
                <TooltipContainer
                  trigger={
                    <Button className=" bg-gray-100 hover:bg-gray-300 text-black p-1 h-8 w-8">
                      <LinkIcon className="h-3 w-3" />
                    </Button>
                  }
                  content="Sao chép liên kết"
                />
                <TooltipContainer
                  trigger={
                    <Button className=" bg-gray-100 hover:bg-gray-300 text-black p-1 h-8 w-8">
                      <Share2 className="h-3 w-3" />
                    </Button>
                  }
                  content="Chia sẻ"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function LocationList({
  expand,
  setExpand,
  titleList,
  locations,
  onLocationSelect,
  selectedLocation,
}: LocationListProps) {
  return (
    <div className="flex-1 flex h-full min-h-0 flex-col bg-[#fcfcfc] border border-gray-300">
      <div className="fixed z-[20] h-14 lg:h-auto lg:static top-14 left-0 right-0 flex items-center justify-between p-2 px-2 lg:px-5 bg-[#f1f1f1] border-b border-b-gray-300">
        <h2 className="hidden lg:block text-md">{titleList.title}</h2>
        <div className="flex items-center gap-2 ml-auto">
          <div className="lg:hidden block flex-1 w-full border border-gray-300 p-2 rounded-md text-sm bg-white">
            <input type="text" placeholder="Tìm kiếm..." className="w-full" />
          </div>
          <Button className="flex-1 lg:flex-none bg-red-600 text-white hover:bg-red-500">
            {titleList.button}
          </Button>
          <ExpandIcon
            onClick={() => setExpand((prev) => !prev)}
            content="Mở rộng"
            className={cn(expand && "bg-gray-300 hover:bg-gray-300")}
          />
        </div>
      </div>
      <div className="hidden lg:block flex-none w-full border-b border-b-gray-300 py-2 pl-5 pr-10">
        <input
          type="text"
          placeholder="Tìm kiếm thông tin..."
          className="w-full"
        />
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <ScrollArea className={cn("lg:h-[calc(100vh-235px)] overflow-auto")}>
          <div className="flex flex-col">
            {locations.map((location) => (
              <LocationItem
                key={location?.id || location.name}
                setExpand={setExpand}
                location={location}
                onLocationSelect={onLocationSelect}
                selectedLocation={selectedLocation}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
