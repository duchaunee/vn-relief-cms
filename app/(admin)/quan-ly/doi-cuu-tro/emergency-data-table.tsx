"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import ViewDialog from "./view-dialog";
import EditDialog from "./edit-dialog";
import DeleteConfirmDialog from "./delete-confirm-dialog";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/axios";
import { RESCUE_REQUEST_APIS } from "@/apis/rescue-request";
import RoleBadge from "@/components/badge-custom/badge-role";
import ColorBadge from "@/components/badge-custom/badge-custom-color";

interface EmergencyData {
  _id: string;
  type: string;
  title: string;
  description: string;
  contentNeedsRelief: string;
  numberOfPeopleNeedingHelp: number;
  phone: string;
  priorityContact: string;
  address: string;
  status: {
    verify: string;
    recipient: string;
  };
  createdAt: string;
}

export default function EmergencyDataTable() {
  const [data, setData] = useState<EmergencyData[]>([]);

  const [viewItem, setViewItem] = useState<EmergencyData | null>(null);
  const [editItem, setEditItem] = useState<EmergencyData | null>(null);
  const [deleteItem, setDeleteItem] = useState<EmergencyData | null>(null);

  const handleEdit = (updatedItem: EmergencyData) => {
    setData(
      data.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );
    setEditItem(null);
  };

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item._id !== id));
    setDeleteItem(null);
  };

  const user = getCurrentUser();
  const dataQuery = useQuery({
    queryKey: ["rescuerequest-account", user._id],
    queryFn: RESCUE_REQUEST_APIS.getAllByUserId(user._id),
  });

  const res = dataQuery?.data?.data;

  useEffect(() => {
    console.log("\n🔥 ~ file: emergency-data-table.tsx:73 ~ res::\n", res);
    if (res && res?.length > 0) setData(res);
  }, [dataQuery.data]);

  if (res && res?.length == 0) return;

  return (
    <div className="container mx-auto pb-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Loại</TableHead>
            <TableHead>Số người cần hỗ trợ</TableHead>
            <TableHead>Trạng thái xác minh</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>
                {item.type == "other" ? "Cần hỗ trợ" : "Khẩn cấp"}
              </TableCell>
              <TableCell>{item.numberOfPeopleNeedingHelp}</TableCell>
              <TableCell>
                {item.status.verify == "pending" ? (
                  <ColorBadge text="Đang chờ xác minh" variant="yellow" />
                ) : (
                  <ColorBadge text="Đã xác minh" variant="green" />
                )}
                {/* / Có người nhận:{" "} {item.status.recipient} */}
              </TableCell>
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Mở menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setViewItem(item)}>
                      Xem
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setEditItem(item)}>
                      Sửa thông tin
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteItem(item)}>
                      Xoá
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {viewItem && (
        <ViewDialog item={viewItem} onClose={() => setViewItem(null)} />
      )}

      {editItem && (
        <EditDialog
          item={editItem}
          onSave={handleEdit}
          onClose={() => setEditItem(null)}
        />
      )}

      {deleteItem && (
        <DeleteConfirmDialog
          item={deleteItem}
          onConfirm={() => handleDelete(deleteItem._id)}
          onCancel={() => setDeleteItem(null)}
        />
      )}
    </div>
  );
}
