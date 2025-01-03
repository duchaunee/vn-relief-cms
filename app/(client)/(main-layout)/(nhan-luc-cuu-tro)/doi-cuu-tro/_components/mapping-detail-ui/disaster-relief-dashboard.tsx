"use client";

import { useState } from "react";
import { ReliefMap } from "./relief-map";
import { LocationList } from "./location-list";
import { Location } from "@/types/location";
import { cn } from "@/lib/utils";
import { GroupedData } from "@/types";

interface DisasterReliefDashboardProps {
  titleList: {
    title: string;
    button: string;
  };
  locations: GroupedData[];
}

export function DisasterReliefDashboard({
  titleList,
  locations,
}: DisasterReliefDashboardProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [expand, setExpand] = useState(false);

  return (
    <div className="w-full flex-1 flex">
      <div
        className={cn(
          "relative flex flex-col lg:flex-row flex-1 lg:p-4 overflow-auto"
        )}
      >
        <div
          className={cn(
            "sticky top-14 mb-14 lh:top-0 lg:mb-0 h-[400px] w-full lg:w-0 lg:min-h-full transition-all duration-500 ease-in-out",
            expand
              ? "h-0 lg:w-0 lg:basis-0 lg:flex-none left-0"
              : "lg:flex-1 mr-4"
          )}
        >
          <ReliefMap
            expand={expand}
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        </div>
        <LocationList
          expand={expand}
          setExpand={setExpand}
          titleList={titleList}
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
        />
      </div>
    </div>
  );
}
