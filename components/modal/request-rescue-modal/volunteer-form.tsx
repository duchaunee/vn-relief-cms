import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ROLES_APIS } from "@/apis/roles";
import toast from "react-hot-toast";
import { useRequestReliefContext } from "@/providers/app-context-provider/request-relief-provider";
import { USER_ROLES_APIS } from "@/apis/user-role";

const VolunteerForm = () => {
  const { open, setOpen } = useRequestReliefContext();

  const [selectedRole, setSelectedRole] = useState<string>("");

  const router = useRouter();
  const user = getCurrentUser();

  const userRoleQuery = useQuery({
    queryKey: ["roles"],
    queryFn: ROLES_APIS.getAll,
  });

  const handleSignVolunteer = async () => {
    if (!user) return router.push("/dang-ky");
    // setShowDialog(true);
  };

  const handleConfirm = async () => {
    if (!selectedRole) {
      toast.error("Vui lòng chọn vai trò tình nguyện viên");
      return;
    }

    // Log selected role for testing
    const selectedRoleData = userRoleQuery.data?.data.find(
      (role: any) => role._id === selectedRole
    );
    console.log("Selected role:", selectedRoleData);

    await USER_ROLES_APIS.save(user._id, [
      {
        roleId: selectedRoleData._id,
        status: "pending",
      },
    ]);

    // TODO: Implement API call to register volunteer role
    toast.success("Đăng ký tình nguyện viên thành công!");
    setOpen(false);
  };

  // Lọc ra chỉ các role tình nguyện viên (code 2, 3, 4)
  const volunteerRoles =
    userRoleQuery.data?.data?.filter((role: any) =>
      [2, 3, 4].includes(role.code)
    ) || [];

  useEffect(() => {
    document.addEventListener("open-dialog-sign", handleConfirm);
  }, []);

  const onSubmit = async () => {};

  return (
    <form id="volunteer-form-id" onSubmit={onSubmit} className="space-y-6 px-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[500px] bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Đăng ký tình nguyện viên</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 my-4">
            {volunteerRoles.map((role: any) => (
              <div
                key={role._id}
                className={cn(
                  "p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all",
                  selectedRole === role._id ? "border-blue-500 bg-blue-50" : ""
                )}
                onClick={() => setSelectedRole(role._id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex items-center h-5">
                    <input
                      type="radio"
                      checked={selectedRole === role._id}
                      onChange={() => {}}
                      className="w-4 h-4 text-blue-600"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{role.name}</h3>
                    <p className="text-sm text-gray-500">{role.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setSelectedRole("");
              }}
            >
              Huỷ
            </Button>
            <Button onClick={handleConfirm}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default VolunteerForm;
