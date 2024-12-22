import { DataTable } from "@/components/custom-table/data-table";
import { Task } from "@/types/account-types/task";
import { FilterOption } from "@/types/data-table";

const tasks: Task[] = [
  {
    id: "1",
    title: "Implement authentication",
    type: "feature",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "2",
    title: "Create dashboard layout",
    type: "feature",
    status: "done",
    priority: "medium",
  },
  {
    id: "3",
    title: "Create dashboard layout 11111",
    type: "rescue",
    status: "done",
    priority: "medium",
  },
  {
    id: "4",
    title: "Create dashboard layout 222222222",
    type: "rescue",
    status: "done",
    priority: "medium",
  },
  // Add more tasks...
];

const columns = [
  { key: "title", label: "Title", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "priority", label: "Priority", sortable: true },
];

const statusOptions: FilterOption[] = [
  { label: "Backlog", value: "backlog", count: 21 },
  { label: "Todo", value: "todo", count: 21 },
  { label: "In Progress", value: "in-progress", count: 20 },
  { label: "Done", value: "done", count: 19 },
  { label: "Canceled", value: "canceled", count: 19 },
];

const priorityOptions: FilterOption[] = [
  { label: "Low", value: "low", count: 15 },
  { label: "Medium", value: "medium", count: 45 },
  { label: "High", value: "high", count: 25 },
];

const typeOptions: FilterOption[] = [
  { label: "rescue", value: "rescue" },
  { label: "feature", value: "feature" },
];

const filters = [
  {
    key: "status",
    label: "Status",
    options: statusOptions,
  },
  {
    key: "priority",
    label: "Priority",
    options: priorityOptions,
  },
  {
    key: "type",
    label: "type",
    options: typeOptions,
  },
];

export default function TabRecusRequest() {
  const handleDelete = async (task: Task) => {
    // Implement delete logic
    console.log("Deleting task:", task);
  };

  const handleEdit = async (task: Task) => {
    // Implement edit logic
    console.log("Editing task:", task);
  };

  const handleView = (task: Task) => {
    // Implement view logic
    console.log("Viewing task:", task);
  };

  return (
    <div className="container mx-auto">
      <DataTable
        data={tasks}
        columns={columns}
        filters={filters}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
      />
    </div>
  );
}
