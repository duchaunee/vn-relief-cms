"use client";

import { useState, useCallback } from "react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TransactionTable from "./transaction-table";
import { TransactionFilters } from "@/types/transaction";

export default function TransactionDashboard() {
  const [filters, setFilters] = useState<TransactionFilters>({
    type: "all",
    amount: "all",
    fromDate: undefined,
    toDate: undefined,
    search: "",
  });

  const handleFilterChange = useCallback(
    (key: keyof TransactionFilters, value: any) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };

        // Ensure toDate is not before fromDate
        if (
          key === "fromDate" &&
          newFilters.toDate &&
          value > newFilters.toDate
        ) {
          newFilters.toDate = undefined;
        }

        return newFilters;
      });
    },
    []
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-4">
          <div className="text-sm font-medium">Số dư tài khoản</div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-500">
            +4.794.345.678 VND
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium">Tổng thu</div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-500">
            +5.852.345.678 VND
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium">Tổng chi</div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-500">
            -1.058.000.000 VND
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Loại giao dịch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="income">Thu</SelectItem>
              <SelectItem value="expense">Chi</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.amount}
            onValueChange={(value) => handleFilterChange("amount", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Số tiền (VND)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="0-1000000">0 - 1,000,000</SelectItem>
              <SelectItem value="1000000-10000000">
                1,000,000 - 10,000,000
              </SelectItem>
              <SelectItem value="10000000+">Trên 10,000,000</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.fromDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.fromDate
                  ? format(filters.fromDate, "dd/MM/yyyy")
                  : "Từ ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.fromDate}
                onSelect={(date) => handleFilterChange("fromDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.toDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.toDate
                  ? format(filters.toDate, "dd/MM/yyyy")
                  : "Đến ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.toDate}
                onSelect={(date) => handleFilterChange("toDate", date)}
                disabled={(date) =>
                  (filters.fromDate ? date < filters.fromDate : false) ||
                  date > new Date()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            placeholder="Tìm kiếm theo mã giao dịch"
            className="w-full ml-auto"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Kết quả: Thu: <span className="text-green-500">+5.852.345.678</span>{" "}
        VND/Chi: <span className="text-red-500">-1.058.000.000</span> VND
      </div>

      <TransactionTable filters={filters} />
    </div>
  );
}
