"use client";

import { Fragment, useState } from "react";
import { ReliefMap } from "./relief-map";
import { LocationList } from "./location-list";
import { Location } from "@/types/location";
import { Card } from "../ui/card";

interface DisasterReliefDashboardProps {
  titleList: string;
  locations: Location[];
}

export function DisasterReliefDashboard({
  titleList,
  locations,
}: DisasterReliefDashboardProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  return (
    <div className="flex flex-col lg:flex-row gap-4 flex-1 h-full p-4">
      <div className="flex-1 lg:h-full">
        <ReliefMap
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
        />
      </div>
      <div className="flex-1">
        <LocationList
          titleList={titleList}
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
        />
      </div>
    </div>
  );
}
