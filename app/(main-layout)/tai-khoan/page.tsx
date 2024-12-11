"use client";

import { Tabs } from "@/components/ui/tabs";
import Navbar from "./_components/nav-bar";
import ListContent from "./_components/list-content";
import Heading from "./_components/heading";
import InfoAccountContext from "@/providers/app-context-provider/info-account-provider";

export default function SettingsPage() {
  return (
    <InfoAccountContext>
      <div className="relative w-full h-full px-6 py-2 lg:py-10 lg:px-[120px] bg-white">
        <Heading />
        <Tabs
          defaultValue="account"
          className="flex lg:flex-row flex-col items-start gap-3 lg:gap-20 lg:pt-10 pt-3"
        >
          <Navbar />
          <ListContent />
        </Tabs>
      </div>
    </InfoAccountContext>
  );
}
