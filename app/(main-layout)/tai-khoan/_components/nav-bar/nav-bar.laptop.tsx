import { TabsTrigger } from "@/components/ui/tabs";
import { menuAccountItems } from "@/constants/info-account";
import { CircleUser, CreditCard, PaintBucket, Bell, Eye } from "lucide-react";

const NavbarLaptop = () => {
  return (
    <div className="tabs-trigger-mobile hidden lg:flex flex-col items-center gap-1">
      {menuAccountItems.map(({ value, label, icon: Icon }) => (
        <TabsTrigger
          value={value}
          className="flex items-center gap-2 justify-start w-full py-2.5 px-3 hover:bg-gray-100 data-[state=active]:shadow-none text-[#111820] data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
        >
          <Icon className="h-4 w-4" />
          {label}
        </TabsTrigger>
      ))}
    </div>
  );
};

export default NavbarLaptop;
