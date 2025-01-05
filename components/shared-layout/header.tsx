"use client";

import { Separator } from "@radix-ui/react-separator";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import Notification from "@/components/notification/notification";

import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";
import { dataSidebar } from "@/constants/side-bar";
import { NavUser } from "../nav-user";
import Hotline from "../hotline";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { auth } from "@/configs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { USER_APIS } from "@/apis/user";
import ButtonSignIn from "../button/sign-in";

import Cookies from "js-cookie";
import { handleLogout, isLogged } from "@/lib/axios";
import { NATURAL_DISASTER_APIS } from "@/apis/natural-disaster";
import { saveNaturalDisasterToCookies } from "@/utils/auth";

export const Header = () => {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  const [userFromMongodb, setUserFromMongodb] = useState<{} | null | undefined>(
    undefined
  );

  useEffect(() => {
    const handleSaveDateState = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userFromMongodb: any = await USER_APIS.getByUidFirebase(
            user.uid
          );

          if (userFromMongodb && userFromMongodb?.data) {
            if (userFromMongodb.data.accountStatus == "inactive") {
              setUserFromMongodb(null);
              Cookies.remove("user");
              handleLogout();
              return;
            }

            Cookies.set("user", JSON.stringify(userFromMongodb.data));
            setUserFromMongodb(userFromMongodb.data);
          }
        } else {
          setUserFromMongodb(null);
          Cookies.remove("user");
        }
      });
    };
    handleSaveDateState(); //init

    window.addEventListener("saveDataState", handleSaveDateState);

    return () =>
      window.removeEventListener("saveDataState", handleSaveDateState);
  }, []);

  useEffect(() => {
    //get active natural disaster
    const saveNaturalDisasterActive = async () => {
      const getNaturalDisasterActive = await NATURAL_DISASTER_APIS.getActive();
      if (getNaturalDisasterActive && getNaturalDisasterActive.data) {
        saveNaturalDisasterToCookies(
          JSON.stringify(getNaturalDisasterActive.data)
        );
      }
    };
    saveNaturalDisasterActive();
  }, []);

  return (
    <header className="sticky top-0 right-0 lg:mb-0 flex z-[30] h-14 shrink-0 items-center gap-2 px-4 bg-header transition-[width,height] ease-linear border-b border-b-gray-300">
      <div className={`flex items-center gap-2 ${isMobile ? "flex-1" : ""}`}>
        <SidebarTrigger
          className={cn(
            "h-9 w-9 text-black rounded-md",
            state == "expanded" &&
              "lg:text-blue-600 lg:hover:text-blue-600 lg:bg-blue-50"
          )}
          size="icon"
        />
        <Separator className="shrink-0 bg-gray-300 w-[1px] lg:mr-2 h-6" />
        <Link href="/">
          <Image
            src={"/logo/logo-header.png"}
            alt="logo-relief"
            width={140}
            height={140}
            className="rounded-md mt-[6px]"
          ></Image>
        </Link>
      </div>
      <div className="flex items-center gap-2.5 ml-auto">
        {/* {isClient && !isMobile && <CommandMenu />} */}
        <Hotline />
        <Separator className="shrink-0 bg-gray-300 w-[1px] h-6" />
        {/* <Notification /> */}
        {userFromMongodb !== undefined && ( // Chỉ render khi đã fetch xong
          <>
            {userFromMongodb && isLogged() ? (
              <NavUser user={dataSidebar.user} />
            ) : (
              <ButtonSignIn />
            )}
          </>
        )}
      </div>
    </header>
  );
};
