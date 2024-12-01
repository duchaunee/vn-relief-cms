"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

const QRCodeWithLogo = () => {
  const currentUrl = React.useRef("");
  const [qrCodeUrl, setQrCodeUrl] = React.useState("");

  React.useEffect(() => {
    currentUrl.current = window.location.href;
  }, []);

  React.useEffect(() => {
    if (currentUrl.current) {
      generateQRCode();
    }
  }, [currentUrl.current]);

  const generateQRCode = async () => {
    try {
      const response = await fetch("/api/qr-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: currentUrl.current }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }

      const data = await response.json();
      console.log("\n🔥 ~ file: qr-code-logo.tsx:34 ~ data::\n", data);

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
        <img
          src={qrCodeUrl}
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
