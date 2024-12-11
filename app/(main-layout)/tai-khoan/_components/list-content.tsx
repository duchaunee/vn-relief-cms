import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import TabAccount from "./tab-content/tab-account";
import TabRequest from "./tab-content/tab-request";
import { menuAccountItems } from "@/constants/info-account";

const ListContent = () => {
  return (
    <div className="settings-container">
      {menuAccountItems.map(({ value, component: TabComponent }) => (
        <TabsContent value={value}>
          <TabComponent />
        </TabsContent>
      ))}
    </div>
  );
};

export default ListContent;
