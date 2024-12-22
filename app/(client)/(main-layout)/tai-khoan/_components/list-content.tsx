import { TabsContent } from "@radix-ui/react-tabs";
import { menuAccountItems } from "@/constants/info-account";

const ListContent = () => {
  return (
    <div className="settings-container w-full flex-1 overflow-hidden">
      {menuAccountItems.map(({ value, component: TabComponent }) => (
        <TabsContent key={value} value={value}>
          <TabComponent />
        </TabsContent>
      ))}
    </div>
  );
};

export default ListContent;
