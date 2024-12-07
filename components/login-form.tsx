"use client";

// import { NavLink, useNavigate } from "react-router-dom";
// import { logo } from "../../assets/images";
import { useForm } from "react-hook-form";
// import { ButtonLoading } from "../../components/Button";
import { useContext, useState } from "react";
// import axiosInstance from "../../axios";
// import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm();

  const handleLogin = async () => {
    // setLoading(true);
    // await new Promise((resolve, reject) => {
    //   setTimeout(async () => {
    //     try {
    //       const logged = await axiosInstance.post("/auth/login", {
    //         email: form.getValues("email"),
    //         password: form.getValues("password"),
    //       });
    //       if (logged.message === "Login successfully") {
    //         setLoading(false);
    //         toast.success(logged.message);
    //         window.location.reload();
    //         resolve();
    //       }
    //     } catch (error) {
    //       setLoading(false);
    //       reject(error);
    //       toast.error(error.message);
    //       console.log("Error:", error);
    //     }
    //   }, 500);
    // });
  };

  return (
    <Card
      className={cn(
        "flex flex-col gap-3 max-w-sm items-center bg-transparent border-none shadow-none",
        "h-full lg:h-fit",
        "w-full lg:w-fit",
        "lg:justify-center mt-[10px] lg:mt-0"
      )}
    >
      <div
        className={cn(
          "bg-white border-gray-300 p-8 flex lg:items-center flex-col",
          "w-full lg:w-fit",
          "border-0 lg:border"
        )}
      >
        <CardHeader className="px-0 py-0">
          <CardTitle className="text-xl">Đăng nhập</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <h1 className="bg-no-repeat instagram-logo" />
        <Form {...form}>
          <form className="mt-8 w-full flex flex-col">
            <div className="flex flex-col gap-2 mb-4">
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        autoFocus
                        placeholder="Enter your email"
                        className="text-xs w-full rounded border bg-gray-100 border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] mt-1 text-left text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className="text-xs w-full rounded border bg-gray-100 border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] mt-1 text-left text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
            >
              Đăng nhập
            </Button>
          </form>
        </Form>
        <div className="flex justify-evenly space-x-2 w-64 mt-4 mx-auto">
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2" />
          <span className="flex-none uppercase text-xs text-gray-400 font-semibold">
            hoặc
          </span>
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2" />
        </div>
        <div className="mt-4 flex mx-auto">
          <div className="bg-no-repeat facebook-logo mr-1" />
          <button
            onClick={() => {}}
            className="text-xs text-blue-900 font-semibold"
          >
            Đăng nhập bằng số điện thoại
          </button>
        </div>
        <Link
          href="/forgot-password"
          className="text-xs text-blue-900 mt-4 cursor-pointer -mb-4 mx-auto"
        >
          Quên mật khẩu?
        </Link>
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
    </Card>
  );
};

export default LoginForm;
