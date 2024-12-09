"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

const QRCodeWithLogo = () => {
  const [qrCodeUrl, setQrCodeUrl] = React.useState("");

  React.useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    try {
      const response = await fetch("/api/qr-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: window.location.href }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }

      const data = await response.json();

      if (data.qrCodeUrl) {
        setQrCodeUrl(data.qrCodeUrl);
      } else {
        setQrCodeUrl("");
        console.log("No QR code URL received");
      }
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Failed to generate QR code"
      );
    }
  };

  return (
    <div className="w-fit relative">
      {qrCodeUrl ? (
        <Image
          src={qrCodeUrl}
          width={160}
          height={160}
          alt="QR Code"
          className="w-40 h-40 border border-gray-300 rounded-sm"
        />
      ) : (
        <Skeleton className="w-40 h-40 rounded-sm" />
      )}
    </div>
  );
};

export default QRCodeWithLogo;
