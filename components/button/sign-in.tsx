import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const ButtonSignIn = () => {
  return (
    <Button
      variant="outline"
      className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
    >
      <Link href="/dang-nhap">Đăng nhập</Link>
    </Button>
  );
};

export default ButtonSignIn;
