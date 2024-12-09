"use client";

import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Location } from "@/types/location";

interface ReliefMapProps {
  expand: boolean;
  locations: Location[];
  onLocationSelect: (location: Location) => void;
  selectedLocation?: Location;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 17.5469,
  lng: 106.2569, // Approximate center of Quang Binh province
};

export function ReliefMap({
  expand,
  locations,
  onLocationSelect,
  selectedLocation,
}: ReliefMapProps) {
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    if (expand) setShowButton(false);
    else {
      setTimeout(() => {
        setShowButton(!expand);
      }, 500);
    }
  }, [expand]);

  return (
    <div className="relative h-full w-full">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={selectedLocation?.coordinates || defaultCenter}
          zoom={8}
          mapTypeId={mapType}
        >
          {locations.map((location) => (
            <Marker
              key={location.name}
              position={location.coordinates}
              onClick={() => onLocationSelect(location)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      {showButton && (
        <div className="absolute left-4 top-4 z-0 flex gap-2 rounded-md bg-white p-1 shadow-lg">
          <button
            onClick={() => setMapType("roadmap")}
            className={`rounded px-3 py-1 text-sm ${
              mapType === "roadmap" ? "bg-primary text-white" : "bg-transparent"
            }`}
          >
            Map
          </button>
          <button
            onClick={() => setMapType("satellite")}
            className={`rounded px-3 py-1 text-sm ${
              mapType === "satellite"
                ? "bg-primary text-white"
                : "bg-transparent"
            }`}
          >
            Satellite
          </button>
        </div>
      )}
    </div>
  );
}
