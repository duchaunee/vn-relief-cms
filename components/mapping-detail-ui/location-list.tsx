import { Phone, Share2, LinkIcon } from "lucide-react";
import { Location } from "@/types/location";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { StatusBadge } from "@/utils/helper/common";

interface LocationListProps {
  titleList: string;
  locations: Location[];
  onLocationSelect: (location: Location) => void;
  selectedLocation?: Location;
}

export function LocationList({
  titleList,
  locations,
  onLocationSelect,
  selectedLocation,
}: LocationListProps) {
  return (
    <div className="flex min-h-0 h-full flex-col bg-[#fcfcfc] border border-gray-300">
      <div className="flex-none flex items-center justify-between p-2 px-5 bg-white border-b border-b-gray-300">
        <h2 className="text-md">{titleList}</h2>
        <Button className="bg-red-600 text-white hover:bg-red-500">
          Cần cứu hộ khẩn cấp
        </Button>
      </div>
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full">
          <div className="flex flex-col divide-y divide-gray-300">
            {locations.map((location) => (
              <div key={location.name} className="bg-gray-50">
                <div className="px-5 py-3 flex items-center gap-2 sticky top-0 z-10 border-b border-gray-300 shadow-sm bg-gray-100">
                  <span className="font-semibold text-gray-700">
                    {location.name}
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-800 px-2"
                  >
                    {location.count}12
                  </Badge>
                </div>
                <div className="divide-y divide-gray-300">
                  {location.groupRequest.map((request) => (
                    <div
                      className={cn(
                        "px-5 py-3 transition-colors bg-white"
                        // selectedLocation?.id === location.id ? "bg-blue-50" : ""
                      )}
                    >
                      <div className="space-x-2">
                        <StatusBadge status="Đã xác minh" className="mb-3" />
                        <StatusBadge
                          status="Chờ xác minh thông tin"
                          className="mb-3"
                        />
                      </div>
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
                          <h3 className="font-semibold text-red-500">
                            {request.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {request.description}
                          </p>
                          <p className="mt-2 text-sm text-gray-400">
                            {request.address}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="icon" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline">
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
