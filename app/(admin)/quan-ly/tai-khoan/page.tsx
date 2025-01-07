"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

const roles = [
  {
    _id: "677d0534e8f3952639005d9f",
    code: 0,
    name: "Admin",
    description: "Admin nền tảng VNRelief",
  },
  {
    _id: "677d0534e8f3952639005da0",
    code: 1,
    name: "Thành viên đội cứu trợ",
    description: "Tham gia trực tiếp vào các hoạt động cứu trợ",
  },
  {
    _id: "677d0534e8f3952639005da1",
    code: 2,
    name: "Tình nguyện viên thu thập",
    description: "Thu thập thông tin từ các nguồn và cập nhật lên hệ thống",
  },
  {
    _id: "677d0534e8f3952639005da2",
    code: 3,
    name: "Tình nguyện viên hotline",
    description: "Tiếp nhận và xử lý các cuộc gọi hỗ trợ",
  },
  {
    _id: "677d0534e8f3952639005da3",
    code: 4,
    name: "Tình nguyện viên xác minh",
    description: "Xác minh và xử lý thông tin từ các nguồn tin cậy",
  },
  {
    _id: "677d0534e8f3952639005da4",
    code: 5,
    name: "Thành viên thường",
    description:
      "Người dùng thường của hệ thống, theo dõi, ủng hộ các vùng thiên tai",
  },
];

// Dữ liệu tài khoản mẫu
const initialAccounts = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phone: "0987654321",
    roles: ["677d0534e8f3952639005d9f", "677d0534e8f3952639005da0"],
    fbLink: "https://www.facebook.com/nguyenvana",
    wardCode: "01|123|12345",
    status: "active",
  },
  {
    id: 2,
    name: "Trần Thị B",
    phone: "0123456789",
    roles: ["677d0534e8f3952639005da1"],
    fbLink: "https://www.facebook.com/tranthib",
    wardCode: "02|456|45678",
    status: "pending",
  },
  {
    id: 3,
    name: "Lê Văn C",
    phone: "0918273645",
    roles: ["677d0534e8f3952639005da4"],
    fbLink: "https://www.facebook.com/levanc",
    wardCode: "03|789|78901",
    status: "inactive",
  },
];

const UserAccountDashboard = () => {
  // Thêm state cho edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  // Handler mở modal sửa
  const openEditModal = (account) => {
    setEditingAccount({
      ...account,
      wardCode: account.wardCode || "||", // Đảm bảo có wardCode để split
    });
    setIsEditModalOpen(true);
  };

  // Handler đóng modal sửa
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingAccount(null);
  };

  // Handler validate form
  const validateForm = (data) => {
    const errors = {};

    if (!data.name?.trim()) {
      errors.name = "Họ tên không được để trống";
    }

    if (!data.phone?.trim()) {
      errors.phone = "Số điện thoại không được để trống";
    } else if (
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(data.phone)
    ) {
      errors.phone = "Số điện thoại không hợp lệ";
    }

    if (data.fbLink && !data.fbLink.includes("facebook.com")) {
      errors.fbLink = "Link Facebook không hợp lệ";
    }

    const [province, district, ward] = data.wardCode.split("|");
    if (!province || !district || !ward) {
      errors.wardCode = "Vui lòng nhập đầy đủ thông tin địa bàn";
    }

    if (!data.roles?.length) {
      errors.roles = "Vui lòng chọn ít nhất một quyền";
    }

    return errors;
  };

  // Handler cập nhật tài khoản
  const handleUpdateAccount = () => {
    const errors = validateForm(editingAccount);

    if (Object.keys(errors).length > 0) {
      // Hiển thị lỗi validation
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return;
    }

    setAccounts(
      accounts.map((account) =>
        account.id === editingAccount.id ? { ...editingAccount } : account
      )
    );

    toast.success("Cập nhật thông tin tài khoản thành công!");
    closeEditModal();
  };
  //////////////////////////////////////

  const [accounts, setAccounts] = useState(initialAccounts);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    phone: "",
    roles: [],
    fbLink: "",
    wardCode: "|0|",
  });

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    resetNewAccountForm();
  };

  const openViewModal = (account) => {
    setSelectedAccount(account);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedAccount(null);
    setIsViewModalOpen(false);
  };

  const resetNewAccountForm = () => {
    setNewAccount({
      name: "",
      phone: "",
      roles: [],
      fbLink: "",
      wardCode: "|0|",
    });
  };

  const handleCreateAccount = () => {
    if (newAccount.name && newAccount.phone) {
      setAccounts([
        ...accounts,
        {
          ...newAccount,
          id: accounts.length + 1,
          status: "pending",
        },
      ]);
      closeCreateModal();
      toast.success("Tài khoản mới đã được tạo!");
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin.");
    }
  };

  const handleUpdateAccountStatus = (accountId, newStatus) => {
    setAccounts(
      accounts.map((account) =>
        account.id === accountId ? { ...account, status: newStatus } : account
      )
    );
    toast.success("Trạng thái tài khoản đã được cập nhật!");
  };

  const handleApproveAccount = (accountId) => {
    setAccounts(
      accounts.map((account) =>
        account.id === accountId ? { ...account, status: "active" } : account
      )
    );
    toast.success("Tài khoản đã được phê duyệt!");
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Quản lý tài khoản</CardTitle>
            <CardDescription className="mt-2">
              Xem và cập nhật trạng thái các tài khoản
            </CardDescription>
          </div>
          <Button onClick={openCreateModal}>Tạo tài khoản mới</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Danh sách tài khoản</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>{account.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        account.status === "active"
                          ? "default"
                          : account.status === "pending"
                          ? "warning"
                          : "destructive"
                      }
                    >
                      {account.status === "active"
                        ? "Hoạt động"
                        : account.status === "pending"
                        ? "Đang chờ duyệt"
                        : "Bị khóa"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => openViewModal(account)}
                        >
                          Xem thông tin
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openEditModal(account)}
                        >
                          Sửa thông tin
                        </DropdownMenuItem>
                        {account.status === "pending" && (
                          <DropdownMenuItem
                            onClick={() => handleApproveAccount(account.id)}
                          >
                            Phê duyệt
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateAccountStatus(
                              account.id,
                              account.status === "active"
                                ? "inactive"
                                : "active"
                            )
                          }
                        >
                          {account.status === "active"
                            ? "Khóa tài khoản"
                            : "Mở khóa tài khoản"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog tạo tài khoản mới */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Tạo tài khoản mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin để tạo tài khoản mới.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Họ tên
              </Label>
              <Input
                id="name"
                value={newAccount.name}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                value={newAccount.phone}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, phone: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fbLink" className="text-right">
                Facebook
              </Label>
              <Input
                id="fbLink"
                value={newAccount.fbLink}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, fbLink: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Quyền</Label>
              <div className="col-span-3 space-y-2">
                {roles.map((role) => (
                  <div key={role._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={role._id}
                      checked={newAccount.roles.includes(role._id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewAccount({
                            ...newAccount,
                            roles: [...newAccount.roles, role._id],
                          });
                        } else {
                          setNewAccount({
                            ...newAccount,
                            roles: newAccount.roles.filter(
                              (id) => id !== role._id
                            ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={role._id} className="space-x-2">
                      <span>{role.name}</span>
                      <span className="text-sm text-gray-400">
                        ({role.description})
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Địa bàn</Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Input
                  value={newAccount.wardCode.split("|")[0]}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      wardCode: `${e.target.value}|${
                        newAccount.wardCode.split("|")[1]
                      }|${newAccount.wardCode.split("|")[2]}`,
                    })
                  }
                  className="w-1/3"
                  placeholder="Tỉnh/TP"
                />
                <Input
                  value={newAccount.wardCode.split("|")[1]}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      wardCode: `${newAccount.wardCode.split("|")[0]}|${
                        e.target.value
                      }|${newAccount.wardCode.split("|")[2]}`,
                    })
                  }
                  className="w-1/3"
                  placeholder="Quận/Huyện"
                />
                <Input
                  value={newAccount.wardCode.split("|")[2]}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      wardCode: `${newAccount.wardCode.split("|")[0]}|${
                        newAccount.wardCode.split("|")[1]
                      }|${e.target.value}`,
                    })
                  }
                  className="w-1/3"
                  placeholder="Phường/Xã"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeCreateModal}>
              Hủy
            </Button>
            <Button onClick={handleCreateAccount}>Tạo tài khoản</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xem chi tiết tài khoản */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Thông tin tài khoản</DialogTitle>
            <DialogDescription>
              Chi tiết thông tin tài khoản người dùng
            </DialogDescription>
          </DialogHeader>
          {selectedAccount && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Họ tên</Label>
                <div className="col-span-3">{selectedAccount.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Số điện thoại</Label>
                <div className="col-span-3">{selectedAccount.phone}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Facebook</Label>
                <div className="col-span-3">
                  <a
                    href={selectedAccount.fbLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {selectedAccount.fbLink}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Quyền</Label>
                <div className="col-span-3 space-y-2">
                  {roles.map((role) => (
                    <div key={role._id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`view-${role._id}`}
                        checked={selectedAccount.roles.includes(role._id)}
                        disabled
                      />
                      <Label htmlFor={`view-${role._id}`} className="space-x-2">
                        <span>{role.name}</span>
                        <span className="text-sm text-gray-400">
                          ({role.description})
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Địa bàn</Label>
                <div className="col-span-3">
                  <div className="flex space-x-2">
                    <div className="w-1/3 p-2 bg-gray-100 rounded">
                      {selectedAccount.wardCode.split("|")[0]}
                    </div>
                    <div className="w-1/3 p-2 bg-gray-100 rounded">
                      {selectedAccount.wardCode.split("|")[1]}
                    </div>
                    <div className="w-1/3 p-2 bg-gray-100 rounded">
                      {selectedAccount.wardCode.split("|")[2]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedAccount?.status === "pending" && (
              <Button
                onClick={() => {
                  handleApproveAccount(selectedAccount.id);
                  closeViewModal();
                }}
                className="mr-2"
              >
                Phê duyệt
              </Button>
            )}
            <Button
              variant={
                selectedAccount?.status === "active" ? "destructive" : "default"
              }
              onClick={() => {
                handleUpdateAccountStatus(
                  selectedAccount.id,
                  selectedAccount.status === "active" ? "inactive" : "active"
                );
                closeViewModal();
              }}
            >
              {selectedAccount?.status === "active"
                ? "Khóa tài khoản"
                : "Mở khóa tài khoản"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog sửa thông tin tài khoản */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Sửa thông tin tài khoản</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin tài khoản người dùng.
            </DialogDescription>
          </DialogHeader>
          {editingAccount && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Họ tên
                </Label>
                <div className="col-span-3">
                  <Input
                    id="edit-name"
                    value={editingAccount.name}
                    onChange={(e) =>
                      setEditingAccount({
                        ...editingAccount,
                        name: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Số điện thoại
                </Label>
                <div className="col-span-3">
                  <Input
                    id="edit-phone"
                    value={editingAccount.phone}
                    onChange={(e) =>
                      setEditingAccount({
                        ...editingAccount,
                        phone: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-fbLink" className="text-right">
                  Facebook
                </Label>
                <div className="col-span-3">
                  <Input
                    id="edit-fbLink"
                    value={editingAccount.fbLink}
                    onChange={(e) =>
                      setEditingAccount({
                        ...editingAccount,
                        fbLink: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Quyền</Label>
                <div className="col-span-3 space-y-2">
                  {roles.map((role) => (
                    <div key={role._id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-${role._id}`}
                        checked={editingAccount.roles.includes(role._id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEditingAccount({
                              ...editingAccount,
                              roles: [...editingAccount.roles, role._id],
                            });
                          } else {
                            setEditingAccount({
                              ...editingAccount,
                              roles: editingAccount.roles.filter(
                                (id) => id !== role._id
                              ),
                            });
                          }
                        }}
                      />
                      <Label htmlFor={`edit-${role._id}`} className="space-x-2">
                        <span>{role.name}</span>
                        <span className="text-sm text-gray-400">
                          ({role.description})
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Địa bàn</Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Input
                    value={editingAccount.wardCode.split("|")[0]}
                    onChange={(e) =>
                      setEditingAccount({
                        ...editingAccount,
                        wardCode: `${e.target.value}|${
                          editingAccount.wardCode.split("|")[1]
                        }|${editingAccount.wardCode.split("|")[2]}`,
                      })
                    }
                    className="w-1/3"
                    placeholder="Tỉnh/TP"
                  />
                  <Input
                    value={editingAccount.wardCode.split("|")[1]}
                    onChange={(e) =>
                      setEditingAccount({
                        ...editingAccount,
                        wardCode: `${editingAccount.wardCode.split("|")[0]}|${
                          e.target.value
                        }|${editingAccount.wardCode.split("|")[2]}`,
                      })
                    }
                    className="w-1/3"
                    placeholder="Quận/Huyện"
                  />
                  <Input
                    value={editingAccount.wardCode.split("|")[2]}
                    onChange={(e) =>
                      setEditingAccount({
                        ...editingAccount,
                        wardCode: `${editingAccount.wardCode.split("|")[0]}|${
                          editingAccount.wardCode.split("|")[1]
                        }|${e.target.value}`,
                      })
                    }
                    className="w-1/3"
                    placeholder="Phường/Xã"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={closeEditModal}>
              Hủy
            </Button>
            <Button onClick={handleUpdateAccount}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserAccountDashboard;
