"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@/configs/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import toast from "react-hot-toast";
import { USER_APIS } from "@/apis/user";
import { Label } from "./ui/label";

const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOTP] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setupRecaptcha = () => {
    // Clear existing instance if any
    if ((window as any).recaptchaVerifier) {
      try {
        (window as any).recaptchaVerifier.clear();
      } catch (error) {
        console.error("Error clearing existing reCAPTCHA:", error);
      }
    }

    // Create new instance
    try {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA verified");
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
            // Reset recaptcha
            (window as any).recaptchaVerifier.clear();
            (window as any).recaptchaVerifier = null;
          },
        }
      );

      // Render immediately to avoid issues
      (window as any).recaptchaVerifier.render();
    } catch (error) {
      console.error("Error setting up reCAPTCHA:", error);
      throw error;
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^(0|84)\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      setError("Số điện thoại là bắt buộc");
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setError("Vui lòng nhập số điện thoại hợp lệ");
      return;
    }

    try {
      setIsLoading(true);
      const phoneNumber = phone.startsWith("+")
        ? phone
        : `+84${phone.startsWith("0") ? phone.substring(1) : phone}`;

      // Check phone registration first
      const response: any = await USER_APIS.getByPhoneNumber(phoneNumber);
      if (response.statusCode && !response.data.exist) {
        toast.error("Số điện thoại chưa được đăng ký!");
        return;
      } else if (
        response.statusCode &&
        response.data.accountStatus == "inactive"
      ) {
        toast.error("Tài khoản của bạn chưa được kích hoạt");
        return;
      }

      // Setup fresh reCAPTCHA instance
      await setupRecaptcha();

      // Send OTP
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        (window as any).recaptchaVerifier
      );

      setShowOTPForm(true);
      setConfirmationResult(confirmation);
      toast.success("Đã gửi mã OTP!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!");

      // Cleanup
      if ((window as any).recaptchaVerifier) {
        try {
          (window as any).recaptchaVerifier.clear();
          (window as any).recaptchaVerifier = null;
        } catch (e) {
          console.error("Error clearing reCAPTCHA:", e);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!confirmationResult) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại!");
      return;
    }

    try {
      setIsLoading(true);
      await confirmationResult.confirm(otp);
      toast.success("Xác thực thành công!");
      console.log("Logged in with phone:", phone);

      window.location.replace("/");
      // Redirect or update state here
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Mã OTP không hợp lệ!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={cn(
        "flex flex-col gap-3 max-w-sm items-center bg-transparent border-none shadow-none",
        "h-full lg:h-fit",
        "w-full lg:w-[384px]",
        "lg:justify-center mt-[10px] lg:mt-0"
      )}
    >
      <div
        className={cn(
          "bg-white border-gray-300 p-8 flex lg:items-center flex-col",
          "w-full lg:w-full",
          "border-0 lg:border"
        )}
      >
        <CardHeader className="px-0 py-0 w-full">
          <CardTitle className="text-xl">Đăng nhập</CardTitle>
          {!showOTPForm ? (
            <CardDescription>
              Nhập vào số điện thoại để đăng nhập vào VNRelief
            </CardDescription>
          ) : (
            <span className="text-sm text-gray-600">
              Nhập mã OTP đã được gửi tới:{" "}
              <span className="text-green-600 font-medium">{phone}</span>
            </span>
          )}
        </CardHeader>

        {!showOTPForm ? (
          <form onSubmit={handleSubmit} className="mt-4 w-full flex flex-col">
            <div className="flex flex-col gap-2 mb-4">
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={() => setError("")}
                autoFocus
                placeholder="Nhập vào số điện thoại"
                className="text-xs w-full rounded border bg-gray-100 border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                disabled={isLoading}
              />
              {error && <span className="text-red-500 text-xs">{error}</span>}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>
          </form>
        ) : (
          <div className="mt-4 w-full">
            <div className="flex flex-col gap-2 mb-4">
              <Input
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Nhập mã OTP"
                className="text-xs w-full rounded border bg-gray-100 border-gray-300 px-3 py-2"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleVerifyOTP}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Xác thực OTP"}
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white lg:border lg:border-gray-300 text-center lg:w-full px-8 lg:px-0 py-4">
        <span className="text-sm">Bạn chưa có tài khoản?</span>
        <Link
          href="/dang-ky"
          className="text-blue-500 text-sm font-semibold ml-1"
        >
          Đăng ký
        </Link>
      </div>

      <div id="recaptcha-container"></div>
    </Card>
  );
};

export default LoginForm;
