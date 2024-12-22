import { TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { menuAccountItems } from "@/constants/info-account";
import { useInfoAccountContext } from "@/providers/app-context-provider/info-account-provider";

const NavbarMobile = () => {
  const { activeTab, setActiveTab } = useInfoAccountContext();
  const activeItem = menuAccountItems.find((item) => item.value === activeTab)!;

  return (
    <div className="tabs-trigger-mobile w-full lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full flex items-center justify-between px-4 py-2 text-sm font-normal transition-colors">
          <div className="flex items-center gap-2">
            {activeItem && <activeItem.icon className="h-4 w-4 text-black" />}
            <span className="text-black font-medium">{activeItem?.label}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-black" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-[6px] w-[var(--radix-dropdown-menu-trigger-width)] p-1 bg-white rounded-md shadow-lg border border-gray-200">
          {menuAccountItems.map(({ value, label, icon: Icon }) => (
            <DropdownMenuItem
              key={value}
              className="flex items-center cursor-pointer w-full focus:outline-none p-[2px] px-1"
              onClick={() => setActiveTab(value)}
            >
              <TabsTrigger
                value={value}
                className="flex items-center gap-2 justify-between w-full px-3 py-2 text-sm rounded-sm data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:shadow-none font-normal"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </div>
                {activeItem?.value === value && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </TabsTrigger>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarMobile;
