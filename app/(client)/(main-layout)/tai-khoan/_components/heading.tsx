import React from "react";

const Heading = () => {
  return (
    <div className="hidden lg:block space-y-1 lg:pb-5 lg:border-b lg:border-b-gray-300">
      <h1 className="text-2xl font-semibold">Thông tin tài khoản của bạn</h1>
      <p className="text-sm text-muted-foreground">
        Quản lý tài khoản cá nhân và các trạng thái hoạt động cứu trợ của bạn.
      </p>
    </div>
  );
};

export default Heading;
