"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dataLocation from "@/constants/location.json";
import { findProvinceByCode, formatPhoneNumber } from "@/utils/helper/common";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { auth } from "@/configs/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  onAuthStateChanged,
} from "firebase/auth";
import { USER_APIS } from "@/apis/user";
import { useQuery } from "@tanstack/react-query";
import { ROLES_APIS } from "@/apis/roles";
import { RESCUE_TEAMS_APIS } from "@/apis/rescue-team";

import Cookies from "js-cookie";
import { TEAM_RESCUE_USER_APIS } from "@/apis/team-rescue-user";

// const reliefTeams = [
//   "Đội xuồng hơi cứu hộ cứu nạn Đà Nẵng",
//   "ĐỘI PHẢN ỨNG NHANH (PUN) PUN Pickup & SUV Quảng Bình",
//   "Đội SOS đà Nẵng",
//   "Nguyễn Mẫn",
//   "Hội thiện nguyện 8 Sáng",
//   "SOS Quảng Nam",
// ];

interface FormData {
  name: string;
  phone: string;
  facebook: string;
  wardCode: string;
  roles: string;
  team: string | null;
}
interface RescueTeam {
  teamName: string;
  operationType: string;
  phone: string;
  supportCapability: string;
}

export default function Register() {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    phone: "",
    facebook: "",
    wardCode: "",
    roles: "",
    team: null,
  });
  console.log("\n🔥 ~ file: page.tsx:65 ~ formData::\n", formData);

  const [rescueTeam, setRescueTeam] = React.useState<RescueTeam>({
    teamName: "",
    operationType: "",
    phone: "",
    supportCapability: "",
  });
  // Thêm state để quản lý errors của form đội cứu trợ
  const [teamErrors, setTeamErrors] = React.useState<{ [key: string]: string }>(
    {}
  );

  // Location states
  const [provinces, setProvinces] = React.useState(dataLocation);
  const [selectedProvince, setSelectedProvince] = React.useState<number | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] = React.useState<number | null>(
    null
  );
  const [districts, setDistricts] = React.useState<any[]>([]);
  const [wards, setWards] = React.useState<any[]>([]);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const [showOTPForm, setShowOTPForm] = React.useState(false);
  const [confirmationResult, setConfirmationResult] =
    React.useState<ConfirmationResult | null>(null);
  const [otp, setOTP] = React.useState("");
  const [countdown, setCountdown] = React.useState(0);

  const recaptchaVerifierRef = React.useRef<RecaptchaVerifier>();

  React.useEffect(() => {
    if (selectedProvince) {
      const province = findProvinceByCode(selectedProvince);
      if (province) {
        setDistricts(province.districts);
      }
    } else {
      setDistricts([]);
    }
    setSelectedDistrict(null);
    setWards([]);
  }, [selectedProvince]);

  React.useEffect(() => {
    if (selectedProvince && selectedDistrict) {
      const province = findProvinceByCode(selectedProvince);
      const district = province?.districts.find(
        (d) => d.code === selectedDistrict
      );
      if (district) {
        setWards(district.wards);
      }
    } else {
      setWards([]);
    }
  }, [selectedProvince, selectedDistrict]);

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex =
      /^(?:\+84|84|0)(3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])[0-9]{7}$/;
    return phoneRegex.test(phone);
  };

  const validateFacebookUrl = (url: string): boolean => {
    const fbRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.+/i;
    return fbRegex.test(url);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }

    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.facebook) {
      newErrors.facebook = "Vui lòng nhập link Facebook";
    } else if (!validateFacebookUrl(formData.facebook)) {
      newErrors.facebook = "Link Facebook không hợp lệ";
    }

    if (!formData.wardCode) {
      newErrors.wardCode = "Vui lòng chọn địa chỉ";
    }

    if (!formData.roles) {
      newErrors.type = "Vui lòng chọn loại tình nguyện viên";
    }

    if (
      formData.roles &&
      formData.roles == userRoleData.find((role: any) => role.code == 1)._id &&
      !formData.team
    ) {
      newErrors.team = "Vui lòng chọn đội/nhóm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTeamForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!rescueTeam.teamName.trim()) {
      newErrors.teamName = "Vui lòng nhập tên đội cứu trợ";
    }

    if (!rescueTeam.operationType) {
      newErrors.operationType = "Vui lòng chọn loại hoạt động";
    }

    if (!rescueTeam.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!validatePhoneNumber(rescueTeam.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!rescueTeam.supportCapability.trim()) {
      newErrors.supportCapability = "Vui lòng mô tả khả năng hỗ trợ";
    }

    setTeamErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = validateForm();
    const isTeamFormNeeded = formData.team === "new";
    const isTeamFormValid = isTeamFormNeeded ? validateTeamForm() : true;

    if (isFormValid && isTeamFormValid) {
      try {
        // Check if phone number is already registered
        // Check phone registration first
        const phoneNumber = formData.phone.startsWith("+")
          ? formData.phone
          : `+84${formData.phone.slice(1)}`;
        const response: any = await USER_APIS.getByPhoneNumber(phoneNumber);

        if (response.statusCode && response.data.exist) {
          toast.error("Số điện thoại đã tồn tại!");
          return;
        }

        if (!recaptchaVerifierRef.current) {
          recaptchaVerifierRef.current = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "invisible",
              callback: () => {
                console.log("recaptcha resolved..");
              },
            }
          );
        }

        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifierRef.current
        );

        setShowOTPForm(true);
        setConfirmationResult(confirmationResult);
      } catch (error) {
        console.error("Error sending OTP:", error);
        toast.error("Đã xảy ra lỗi khi gửi OTP!");
      }
    } else {
      toast.error("Vui lòng kiểm tra lại thông tin!");
    }
  };

  const handleRegister = async ({
    user: userForm,
    rescueTeam: rescueTeamForm,
  }) => {
    // const user = USER_APIS.save();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (formData.team == "new") {
          //chọn thêm mới đội cứu trợ
          //"nếu tạo mới dội cứu trợ" thì tạo đội cứu trợ --> chèn rescueTeamId vào user tạo sau
          const createRescueTeam = await RESCUE_TEAMS_APIS.save({
            teamName: rescueTeamForm.teamName,
            naturalDisasterId: JSON.parse(Cookies.get("natural-disaster"))?._id,
            operationType: rescueTeamForm.operationType,
            phone: rescueTeamForm.phone,
            supportCapability: rescueTeamForm.supportCapability,
            wardCode: userForm.wardCode,
            status: "pending",
            activityStatus: "pending",
          });
          await USER_APIS.save({
            rescueTeamId: createRescueTeam?.data?.data._id,
            uid_firebase: user.uid,
            name: userForm.name,
            phone: formatPhoneNumber(userForm.phone),
            roles: [userForm.roles],
            fbLink: userForm.facebook,
            wardCode: userForm.wardCode,
            accountStatus: "active",
            avatar: "",
          });
        } else if (typeof formData.team == "string") {
          //chọn 1 đội cứu trợ có sẵn
          //"nếu tạo mới dội cứu trợ" thì tạo user --> join request
          const createUser = await USER_APIS.save({
            rescueTeamId: null,
            uid_firebase: user.uid,
            name: userForm.name,
            phone: formatPhoneNumber(userForm.phone),
            roles: [userForm.roles],
            fbLink: userForm.facebook,
            wardCode: userForm.wardCode,
            accountStatus: "active",
            avatar: "",
          });

          await TEAM_RESCUE_USER_APIS.save(userForm.team, {
            userId: createUser?.data?.data._id,
          });
        } else if (formData.team == null) {
          //chọn role khác
          await USER_APIS.save({
            rescueTeamId: null, //đợi TVĐCT duyệt thì mới thêm
            uid_firebase: user.uid,
            name: userForm.name,
            phone: formatPhoneNumber(userForm.phone),
            roles: [userForm.roles],
            fbLink: userForm.facebook,
            wardCode: userForm.wardCode,
            accountStatus:
              userRoleData.find((role) => role._id == userForm.roles).code == 5
                ? "active"
                : "inactive", //nếu là người dùng thường thì được active luôn
            avatar: "",
          });
        }
      }
    });
  };

  const handleVerifyOTP = async () => {
    if (confirmationResult) {
      try {
        await confirmationResult.confirm(otp);

        const isTeamFormNeeded = formData.team === "new";
        const submitData = {
          user: formData,
          rescueTeam: isTeamFormNeeded ? rescueTeam : undefined,
        };
        toast.success(
          `Xác thực OTP thành công!  ${
            [2, 3, 4].includes(
              userRoleData.find((role) => role._id == formData.roles).code
            )
              ? "Vui lòng liên hệ Admin để kích hoạt tài khoản"
              : ""
          }`
        );

        await handleRegister(submitData);
        window.dispatchEvent(new CustomEvent("saveDataState"));

        //Nếu k phải đăng ký TNV thì về redirect về /
        //còn nếu là TNV thì nó có stauts là inactive, tự nó logout (ở header có xử lý), k cần redirect
        ![2, 3, 4].includes(
          userRoleData.find((role) => role._id == formData.roles).code
        ) && window.location.replace("/");

        // Further processing or redirection logic here
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast.error("Mã OTP không hợp lệ!");
      }
    }
  };

  // const handleResendOTP = async () => {
  //   try {
  //     const recaptchaVerifier = new RecaptchaVerifier(
  //       "recaptcha-container",
  //       {},
  //       auth
  //     );
  //     const confirmationResult = await signInWithPhoneNumber(
  //       auth,
  //       formData.phone,
  //       recaptchaVerifier
  //     );
  //     setConfirmationResult(confirmationResult);
  //     setCountdown(60);
  //     toast.success("Đã gửi lại mã OTP!");
  //   } catch (error) {
  //     console.error("Error resending OTP:", error);
  //     toast.error("Đã xảy ra lỗi khi gửi lại mã OTP!");
  //   }
  // };

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown]);

  React.useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // =================
  const userRoleQuery = useQuery({
    queryKey: ["roles"],
    queryFn: ROLES_APIS.getAll,
  });
  const rescueTeamQuery = useQuery({
    queryKey: ["rescue-team"],
    queryFn: RESCUE_TEAMS_APIS.getAll("active"),
  });

  const userRoleData =
    userRoleQuery?.data?.data.filter((role: any) => role.name != "Admin") || [];
  const rescueTeamData = rescueTeamQuery?.data?.data || [];
  console.log("\n🔥 ~ file: page.tsx:337 ~ userRoleData::\n", userRoleData);

  if (userRoleData?.length == 0) return;

  return (
    <div className="w-full p-0 lg:p-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-2xl mx-auto p-6 lg:my-6 bg-white"
      >
        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">Tên của bạn</h2>
              <p className="text-sm text-gray-500">
                Nhập họ tên đầy đủ của bạn
              </p>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={cn("mt-2", errors.name && "border-red-500")}
                placeholder="Nguyễn Văn A"
              />
              {errors.name && (
                <span className="text-sm text-red-500">{errors.name}</span>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">Số điện thoại/Zalo</h2>
              <p className="text-sm text-gray-500">
                Số điện thoại để liên lạc khi cần
              </p>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={cn("mt-2", errors.phone && "border-red-500")}
                placeholder="0123456789"
              />
              {errors.phone && (
                <span className="text-sm text-red-500">{errors.phone}</span>
              )}
            </div>
          </div>

          {/* Facebook */}
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">Link Facebook liên hệ</h2>
              <p className="text-sm text-gray-500">
                Link Facebook cá nhân của bạn
              </p>
              <Input
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                className={cn("mt-2", errors.facebook && "border-red-500")}
                placeholder="https://facebook.com/username"
              />
              {errors.facebook && (
                <span className="text-sm text-red-500">{errors.facebook}</span>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-6 rounded-lg border border-gray-300 bg-white p-6">
            <div className="space-y-4">
              <h2 className="text-base font-semibold">Khu vực sinh sống</h2>

              {/* Province */}
              <div>
                <Select
                  onValueChange={(value) => {
                    setSelectedProvince(Number(value));
                    setFormData((prev) => ({
                      ...prev,
                      wardCode: `||${value}`,
                    }));
                  }}
                >
                  <SelectTrigger
                    className={cn(errors.wardCode && "border-red-500")}
                  >
                    <SelectValue placeholder="Chọn tỉnh/thành phố" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem
                        key={province.code}
                        value={province.code.toString()}
                      >
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* District */}
              <div>
                <Select
                  disabled={!selectedProvince}
                  onValueChange={(value) => {
                    setSelectedDistrict(Number(value));
                    setFormData((prev) => ({
                      ...prev,
                      wardCode: `|${value}|${selectedProvince}`,
                    }));
                  }}
                >
                  <SelectTrigger
                    className={cn(errors.wardCode && "border-red-500")}
                  >
                    <SelectValue placeholder="Chọn quận/huyện" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem
                        key={district.code}
                        value={district.code.toString()}
                      >
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ward */}
              <div>
                <Select
                  disabled={!selectedDistrict}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      wardCode: `${value}|${selectedDistrict}|${selectedProvince}`,
                    }));
                  }}
                >
                  <SelectTrigger
                    className={cn(errors.wardCode && "border-red-500")}
                  >
                    <SelectValue placeholder="Chọn phường/xã" />
                  </SelectTrigger>
                  <SelectContent>
                    {wards.map((ward) => (
                      <SelectItem key={ward.code} value={ward.code.toString()}>
                        {ward.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {errors.wardCode && (
                <span className="text-sm text-red-500">{errors.wardCode}</span>
              )}
            </div>
          </div>

          {/* Volunteer Type */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold">Công tác muốn tham gia</h2>
            <p className="text-sm text-gray-500">
              Chọn công tác cứu trợ muốn tham gia vào nền tảng
            </p>
            <div className="grid grid-cols-1 gap-4">
              {userRoleData.map((role: any) => (
                <div
                  key={role._id}
                  className={cn(
                    "p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all",
                    formData.roles === role._id
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  )}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, roles: role._id }));
                    setErrors((prev) => ({ ...prev, roles: undefined }));
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        checked={formData.roles === role._id}
                        onChange={() => {}}
                        className="w-4 h-4 text-blue-600"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{role.name}</h3>
                      <p className="text-sm text-gray-500">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {errors.type && (
                <span className="text-sm text-red-500">{errors.type}</span>
              )}
            </div>
          </div>

          {/* Team Selection - Only show if volunteer type is selected and not DOI_CUU_TRO */}
          {formData.roles &&
            formData.roles ==
              userRoleData.find((role: any) => role.code == 1)._id && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-base font-semibold">
                    Tên Đoàn/Nhóm cứu trợ của bạn
                  </h2>
                  <p className="text-sm text-gray-500">
                    Chọn hoặc thêm mới đoàn/nhóm của bạn
                  </p>
                  <Select
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, team: value }));
                      setErrors((prev) => ({ ...prev, team: undefined }));
                    }}
                  >
                    <SelectTrigger
                      className={cn(errors.team && "border-red-500")}
                    >
                      <SelectValue placeholder="Chọn đội/nhóm của bạn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Tạo mới (nếu chưa có)</SelectItem>
                      {rescueTeamData?.length > 0 &&
                        rescueTeamData?.map((team) => (
                          <SelectItem key={team._id} value={team._id}>
                            {team.teamName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.team && (
                    <span className="text-sm text-red-500">{errors.team}</span>
                  )}
                </div>
              </div>
            )}
        </div>

        {formData.team === "new" && (
          <div className="mt-6 space-y-6 p-6 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold">Thông tin đội cứu trợ mới</h2>

            {/* Tên đội cứu trợ */}
            <div className="space-y-2">
              <Label>Tên đội cứu trợ</Label>
              <Input
                value={rescueTeam.teamName}
                onChange={(e) => {
                  setRescueTeam((prev) => ({
                    ...prev,
                    teamName: e.target.value,
                  }));
                  setTeamErrors((prev) => ({ ...prev, teamName: undefined }));
                }}
                className={cn(teamErrors.teamName && "border-red-500")}
                placeholder="Nhập tên đội cứu trợ"
              />
              {teamErrors.teamName && (
                <span className="text-sm text-red-500">
                  {teamErrors.teamName}
                </span>
              )}
            </div>

            {/* Loại hoạt động */}
            <div className="space-y-2">
              <Label>Loại hoạt động</Label>
              <Select
                value={rescueTeam.operationType}
                onValueChange={(value) => {
                  setRescueTeam((prev) => ({ ...prev, operationType: value }));
                  setTeamErrors((prev) => ({
                    ...prev,
                    operationType: undefined,
                  }));
                }}
              >
                <SelectTrigger
                  className={cn(teamErrors.operationType && "border-red-500")}
                >
                  <SelectValue placeholder="Chọn loại hoạt động" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cứu hộ và di dời">
                    Cứu hộ và di dời
                  </SelectItem>
                  <SelectItem value="Y tế khẩn cấp">Y tế khẩn cấp</SelectItem>
                  <SelectItem value="Cung cấp lương thực">
                    Cung cấp lương thực
                  </SelectItem>
                  <SelectItem value="Khác">Khác</SelectItem>
                </SelectContent>
              </Select>
              {teamErrors.operationType && (
                <span className="text-sm text-red-500">
                  {teamErrors.operationType}
                </span>
              )}
            </div>

            {/* Số điện thoại liên hệ */}
            <div className="space-y-2">
              <Label>Số điện thoại liên hệ</Label>
              <Input
                value={rescueTeam.phone}
                onChange={(e) => {
                  setRescueTeam((prev) => ({ ...prev, phone: e.target.value }));
                  setTeamErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                className={cn(teamErrors.phone && "border-red-500")}
                placeholder="Nhập số điện thoại liên hệ"
              />
              {teamErrors.phone && (
                <span className="text-sm text-red-500">{teamErrors.phone}</span>
              )}
            </div>

            {/* Khả năng hỗ trợ */}
            <div className="space-y-2">
              <Label>Khả năng hỗ trợ</Label>
              <Textarea
                value={rescueTeam.supportCapability}
                onChange={(e) => {
                  setRescueTeam((prev) => ({
                    ...prev,
                    supportCapability: e.target.value,
                  }));
                  setTeamErrors((prev) => ({
                    ...prev,
                    supportCapability: undefined,
                  }));
                }}
                className={cn(teamErrors.supportCapability && "border-red-500")}
                placeholder="Mô tả khả năng hỗ trợ của đội"
                rows={4}
              />
              {teamErrors.supportCapability && (
                <span className="text-sm text-red-500">
                  {teamErrors.supportCapability}
                </span>
              )}
            </div>
          </div>
        )}
        {showOTPForm && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Xác thực OTP</h2>
            <span className="block text-sm text-gray-600 my-1">
              Nhập mã OTP đã được gửi tới:{" "}
              <span className="text-green-600 font-medium">
                {formData.phone}
              </span>
            </span>
            <div className="flex items-center gap-4">
              <Input
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Nhập mã OTP"
                className="flex-1"
              />
              <Button
                type="button"
                variant="destructive"
                onClick={handleVerifyOTP}
              >
                Xác thực
              </Button>
            </div>
            {/* <div className="mt-4">
              <Button disabled={countdown > 0} onClick={handleResendOTP}>
                {countdown > 0 ? `Gửi lại mã (${countdown}s)` : "Gửi lại mã"}
              </Button>
            </div> */}
          </div>
        )}

        {!showOTPForm && (
          <Button type="submit" className="w-full">
            Đăng ký
          </Button>
        )}

        <div id="recaptcha-container"></div>
      </form>
    </div>
  );
}
