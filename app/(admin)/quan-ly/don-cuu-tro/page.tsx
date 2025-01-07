import EmergencyDataTable from "./emergency-data-table";

export default function TabRescueRequest() {
  return (
    <div className="">
      <h1 className="font-medium text-lg mb-4">Quản lý đơn cứu trợ</h1>
      <div className="bg-white p-4">
        <EmergencyDataTable />
      </div>
    </div>
  );
}
