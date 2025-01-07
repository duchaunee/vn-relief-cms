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
import VerificationDialog from "./change-status-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EmergencyReliefForm from "./emergency-relief-form";

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
  const [showCreateDialog, setShowCreateDialog] = useState(false);
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
    queryKey: ["rescuerequest"],
    queryFn: RESCUE_REQUEST_APIS.getAll(null),
  });

  const res = dataQuery?.data?.data;

  useEffect(() => {
    if (res && res?.length > 0) setData(res);
  }, [dataQuery.data]);

  if (!res) return;

  return (
    <div className="container mx-auto pb-10 bg-white p-4">
      {/* <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Danh sách đơn cứu trợ</h2>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-primary text-white hover:bg-primary/90"
        >
          Tạo đơn cứu trợ
        </Button>
      </div> */}
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
        {data && data?.length > 0 ? (
          data.map((item) => (
            <TableBody>
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
                      {/* <DropdownMenuItem onClick={() => setEditItem(item)}>
                        Sửa thông tin
                      </DropdownMenuItem> */}
                      <DropdownMenuItem onClick={() => setDeleteItem(item)}>
                        Cập nhật trạng thái đơn
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          ))
        ) : (
          <p className="text-muted-foreground text-center mt-[40px]">
            Chưa có đơn cứu trợ nào
          </p>
        )}
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
        <VerificationDialog
          item={deleteItem}
          onConfirm={() => handleDelete(deleteItem._id)}
          onCancel={() => setDeleteItem(null)}
        />
      )}

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tạo đơn cứu trợ mới</DialogTitle>
          </DialogHeader>
          <EmergencyReliefForm
            onSubmitSuccess={() => {
              setShowCreateDialog(false);
              dataQuery.refetch(); // Refresh the data after creating
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
