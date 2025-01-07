"use client";

import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Location } from "@/types/location";
import { findLocation } from "@/utils/helper/common";
import { useQueryClient } from "@tanstack/react-query";

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

const fakeLocations = [
  { name: "Hà Nội", coordinates: { lat: 21.028511, lng: 105.804817 } },
  { name: "Hồ Chí Minh", coordinates: { lat: 10.823099, lng: 106.629662 } },
  { name: "Đà Nẵng", coordinates: { lat: 16.047079, lng: 108.20623 } },
  { name: "Hội An", coordinates: { lat: 15.880058, lng: 108.338047 } },
  { name: "Huế", coordinates: { lat: 16.463713, lng: 107.590866 } },
  { name: "Nha Trang", coordinates: { lat: 12.238791, lng: 109.196749 } },
  { name: "Cần Thơ", coordinates: { lat: 10.045162, lng: 105.746857 } },
  { name: "Sapa", coordinates: { lat: 22.337442, lng: 103.844813 } },
  { name: "Phú Quốc", coordinates: { lat: 10.28988, lng: 103.984017 } },
  { name: "Quảng Bình", coordinates: { lat: 17.5469, lng: 106.2569 } },
];

async function geocodeAddress(
  address: string
): Promise<google.maps.LatLngLiteral | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );
  const data = await response.json();

  if (data.status === "OK" && data.results.length > 0) {
    const location = data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  } else {
    console.error(`Geocoding failed for address: ${address}`);
    return null;
  }
}

export function ReliefMap({
  expand,
  locations, // Dùng fakeLocations mặc định
  onLocationSelect,
  selectedLocation,
}: ReliefMapProps) {
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");
  const [showButton, setShowButton] = useState<boolean>(false);

  const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral[]>(
    []
  );

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["rescue-request-other"]);

  const locationNames = locations.flatMap((item) =>
    item.groupRequest.map((request) => findLocation(request.wardCode))
  );

  useEffect(() => {
    async function fetchCoordinates() {
      if (locationNames?.length == 0) return;
      const results = await Promise.all(
        locationNames.map((name) => geocodeAddress(name))
      );
      setCoordinates(
        results.filter((coord) => coord !== null) as google.maps.LatLngLiteral[]
      );
    }

    fetchCoordinates();
  }, []);

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
          zoom={6}
          mapTypeId={mapType}
        >
          {coordinates.map((coord, index) => (
            <Marker key={index} position={coord} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
