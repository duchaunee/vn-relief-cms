"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  emptyScreenshot,
  screenshot1,
  screenshot2,
  screenshot3,
  screenshot4,
} from "@/public/images";

import { cn } from "@/lib/utils";

const screenshots = [screenshot1, screenshot2, screenshot3, screenshot4];

const LoginScreenshot = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) =>
        prevIndex >= screenshots.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cn("relative", "hidden lg:block h-[581.15px]")}>
      <Image
        src={emptyScreenshot}
        alt="Empty screenshot frame"
        priority
        quality={100}
        draggable={false}
      />
      {screenshots.map((screenshot, index) => (
        <div
          key={screenshot.src}
          className={cn(
            "absolute right-[60px] bottom-[16px]",
            "transition-all duration-[1.5s] ease-out",
            index === visibleIndex
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          )}
        >
          <Image
            src={screenshot}
            alt={`Screenshot ${index + 1}`}
            quality={100}
            priority={index === 0}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};

export default LoginScreenshot;
