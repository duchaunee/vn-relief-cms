"use client";

import { Fragment, useState } from "react";
import { ReliefMap } from "./relief-map";
import { LocationList } from "./location-list";
import { Location } from "@/types/location";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface DisasterReliefDashboardProps {
  titleList: {
    title: string;
    button: string;
  };
  locations: Location[];
}

export function DisasterReliefDashboard({
  titleList,
  locations,
}: DisasterReliefDashboardProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [expand, setExpand] = useState(false);

  return (
    <div className={cn("flex flex-col lg:flex-row lg:flex-1 lg:p-4")}>
      <div
        className={cn(
          "h-[400px] w-full lg:w-0 lg:min-h-full transition-all duration-500 ease-in-out",
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
      <div className={cn("flex-1")}>
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
