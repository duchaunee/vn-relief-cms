import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Phone, Share2, LinkIcon, SearchX } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  copyTextToClipboard,
  findDistrictByCode,
  findLocation,
  findProvinceByCode,
  handleShare,
  StatusBadge,
} from "@/utils/helper/common";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { Location } from "@/types/location";
import { useRequestReliefContext } from "@/providers/app-context-provider/request-relief-provider";
import Image from "next/image";
import TooltipContainer from "@/components/tooltip-container/tooltip-container";
import { ExpandIcon } from "@/components/icon/expand-icon";
import { Badge } from "@/components/ui/badge";
import { GroupedData } from "@/types";
import { StatusType } from "@/types/status";
import Link from "next/link";
import { debounce } from "lodash";
import EmptyData from "@/constants/empty-data";

interface LocationListProps {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  titleList: {
    title: string;
    button: string;
  };
  locations: GroupedData[];
  onLocationSelect: (location: Location) => void;
  selectedLocation?: Location;
}

const LocationItem = ({
  location,
  onLocationSelect,
  selectedLocation,
}: Omit<LocationListProps, "expand" | "titleList" | "locations"> & {
  location: any;
}) => {
  return (
    <div key={location.address} className="bg-gray-50">
      <div className="px-5 py-3 flex items-center gap-2 border-b border-gray-300 shadow-sm bg-gray-100">
        <span className="font-semibold text-gray-700">
          {
            findDistrictByCode(
              Number(location.address.split("|")[1]),
              Number(location.address.split("|")[0])
            )?.name
          }
          , {findProvinceByCode(Number(location.address.split("|")[1]))?.name}
        </span>
        <Badge
          variant="secondary"
          className="bg-slate-200 text-slate-600 px-2 rounded-sm"
        >
          {location.count}
        </Badge>
      </div>
      <div className="">
        {location.groupRequest.map((request: any) => {
          console.log(
            "\n🔥 ~ file: location-list.tsx:69 ~ request::\n",
            request
          );
          return (
            <Link
              //open dialog
              href={window.location.pathname + "/" + request._id}
              key={request._id}
              className={cn(
                "block px-5 py-3 transition-colors bg-white",
                "border-b border-gray-300",
                "hover:bg-gray-50 cursor-pointer"
                // selectedLocation?.id === location.id ? "bg-blue-50" : ""
              )}
            >
              <div
                className="flex gap-4"
                // onClick={() => onLocationSelect(request)}
              >
                {/* <Image
                  // src={request.images[0]!}
                  src="https://firebasestorage.googleapis.com/v0/b/shoes-shopping-web.appspot.com/o/social-media%2F1718324038019anhcute.jpg?alt=media&token=2e7fdc46-9367-41b8-8ebd-730d02b9602a"
                  width={70}
                  height={70}
                  alt={request.images[0]}
                  className="h-[70px] rounded-md aspect-square object-cover"
                /> */}
                <div className="flex-1">
                  <h3 className="font-semibold text-red-500">{request.name}</h3>
                  <p className="text-sm text-gray-600">
                    Số điện thoại: {request.phone}
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    {findLocation(request.wardCode)}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex"></div>
            </Link>
          );
        })}
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
  const { open, setOpen } = useRequestReliefContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const debouncedSearch = (value: string, timer: number) =>
    debounce(() => {
      setDebouncedValue(value);
    }, timer)();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value, 500);
  };

  const filteredLocations = useMemo(
    () =>
      locations.filter((location) => {
        const locationFormat =
          findProvinceByCode(+location.address.split("|")[1])?.name +
          " " +
          findDistrictByCode(
            +location.address.split("|")[1],
            +location.address.split("|")[0]
          )?.name;
        return locationFormat.toLowerCase().includes(searchQuery.toLowerCase());
      }),
    [locations, debouncedValue]
  );

  return (
    <div className="flex-1 flex h-full min-h-0 flex-col bg-[#fcfcfc] border border-gray-300">
      <div className="fixed z-[20] h-14 lg:h-auto lg:static top-14 left-0 right-0 flex items-center justify-between p-2 px-2 lg:px-5 bg-[#f1f1f1] border-b border-b-gray-300">
        <h2 className="hidden lg:block text-md">{titleList.title}</h2>
        <div className="flex items-center gap-2 ml-auto">
          <div className="lg:hidden block flex-1 w-full border border-gray-300 p-2 rounded-md text-sm bg-white">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Button
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            className="flex-1 lg:flex-none bg-red-600 text-white hover:bg-red-500"
          >
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
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <ScrollArea className={cn("lg:h-[calc(100vh-235px)] overflow-auto")}>
          <div className="flex flex-col">
            {filteredLocations?.length > 0 ? (
              filteredLocations.map((location) => (
                <LocationItem
                  key={location.address}
                  setExpand={setExpand}
                  location={location}
                  onLocationSelect={onLocationSelect}
                  selectedLocation={selectedLocation}
                />
              ))
            ) : (
              <div className="mt-6">
                <EmptyData
                  onRemove={() => {
                    setSearchQuery("");
                    debouncedSearch("", 0);
                  }}
                  title="Không tìm thấy dữ liệu"
                  description="Không tìm thấy kết quả nào phù hợp với từ khóa tìm kiếm.
                                Vui lòng thử lại với từ khóa khác."
                  icon={<SearchX className="h-8 w-8 text-gray-400" />}
                  removeText="Xoá tìm kiếm"
                />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
