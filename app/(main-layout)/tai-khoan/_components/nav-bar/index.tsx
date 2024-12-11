import { TabsList } from "@/components/ui/tabs";
import NavbarMobile from "./nav-bar.mobile";
import NavbarLaptop from "./nav-bar.laptop";

const Navbar = () => {
  return (
    <TabsList className="sticky top-0 left-0 w-full lg:w-fit h-auto space-y-1 lg:border-none border bg-transparent p-0 py-1 lg:justify-center text-black">
      <NavbarMobile />
      <NavbarLaptop />
    </TabsList>
  );
};

export default Navbar;
