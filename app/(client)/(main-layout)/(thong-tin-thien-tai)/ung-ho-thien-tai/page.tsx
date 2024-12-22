import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionDashboard from "./_components/transaction-dashboard";

export default function Page() {
  return (
    <div className="w-full h-full px-1 py-2 lg:py-4 lg:px-20 bg-white">
      <div className="mx-auto px-4 py-6 space-y-6 max-w-7xl">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">
            Thông tin đóng góp ủng hộ đồng bào thiên tai
          </h1>
          <p className="text-sm text-muted-foreground">
            Danh sách sao kê thông tin các cá nhân, tổ chức ủng hộ đồng bào
          </p>
        </div>

        <Tabs defaultValue="transfer" className="">
          {/* <TabsList className="justify-start border-b rounded-none h-auto p-0 space-x-2 overflow-x-auto">
            <TabsTrigger
              value="transfer"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-4 py-2 text-sm sm:text-base"
            >
              CHUYỂN KHOẢN
            </TabsTrigger>
            <TabsTrigger
              value="materials"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-4 py-2 text-sm sm:text-base"
            >
              VẬT TƯ
            </TabsTrigger>
          </TabsList> */}

          <TabsContent value="transfer" className="mt-6">
            <TransactionDashboard />
          </TabsContent>
          <TabsContent value="materials">
            {/* Materials tab content will be added later */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
