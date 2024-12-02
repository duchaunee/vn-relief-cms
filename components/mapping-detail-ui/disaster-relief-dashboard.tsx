"use client";

import { Fragment, useState } from "react";
import { ReliefMap } from "./relief-map";
import { LocationList } from "./location-list";
import { Location } from "@/types/location";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import RequestReliefModal from "../modal/request-relief-modal";
import { useRequestReliefContext } from "@/providers/app-context-provider/request-relief-provider";
import { DialogHeader, DialogTitle } from "../ui/dialog";

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

  const { open, setOpen } = useRequestReliefContext();
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

      <RequestReliefModal
        open={open}
        onOpenChange={() => setOpen((prev: boolean) => !prev)}
        title="Mẫu cứu trợ khẩn cấp"
        children={
          <>
            <DialogHeader>
              <DialogTitle>Modal Title</DialogTitle>
            </DialogHeader>
            <div className="p-4">Modal content goes here</div>
          </>
        }
      />
    </div>
  );
}
