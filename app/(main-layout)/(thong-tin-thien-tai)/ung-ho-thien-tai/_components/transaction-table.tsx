"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  Transaction,
  TransactionFilters,
  PaginationState,
} from "@/types/transaction";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data - replace with your actual data source
const transactions: Transaction[] = [
  {
    id: "FT24334344344324",
    time: "29/11/24 - 14:00:00",
    sender: "NGUYEN THI HA",
    content:
      "CT THEO TT 161.TTR.MTTW.BPT N27.9.2024 CUA BAN PHONG TRAO VV CHUYENTRA LAI TIEN CHO CA NHAN DO CHUYENNHAM VAO TK NGUON CUU TRO TW DOT 2",
    amount: -31000000,
  },
  {
    id: "FT24334344344323",
    time: "29/11/24 - 13:59:00",
    sender: "VU THI KY",
    content:
      "CT THEO TT 161.TTR.MTTW.BPT N27.9.2024 CUA BAN PHONG TRAO VV CHUYENTRA LAI TIEN CHO CA NHAN DO CHUYENNHAM VAO TK NGUON CUU TRO TW DOT 2",
    amount: -27000000,
  },
  // Adding more sample data with different dates for testing
  {
    id: "FT24334344344325",
    time: "01/12/24 - 10:00:00",
    sender: "TRAN VAN A",
    content: "Test content",
    amount: -15000000,
  },
  {
    id: "FT24334344344326",
    time: "15/12/24 - 09:00:00",
    sender: "LE THI B",
    content: "Test content",
    amount: 25000000,
  },
  ...Array.from({ length: 50 }, (_, index) => ({
    id: `FT2433434434${4350 + index}`,
    time: "29/11/24 - 14:00:00",
    sender: `User ${index + 1}`,
    content: "Test transaction",
    amount: -20000000,
  })),
];

interface TransactionTableProps {
  filters: TransactionFilters;
}

export default function TransactionTable({ filters }: TransactionTableProps) {
  const isMobile = useIsMobile();

  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: transactions.length,
  });

  // Reset to first page when filters change
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  }, [filters]);

  // Filter transactions based on all filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Type filter
      if (filters.type !== "all") {
        if (filters.type === "income" && transaction.amount < 0) return false;
        if (filters.type === "expense" && transaction.amount > 0) return false;
      }

      // Amount filter
      if (filters.amount !== "all") {
        const amount = Math.abs(transaction.amount);
        switch (filters.amount) {
          case "0-1000000":
            if (amount > 1000000) return false;
            break;
          case "1000000-10000000":
            if (amount <= 1000000 || amount > 10000000) return false;
            break;
          case "10000000+":
            if (amount <= 10000000) return false;
            break;
        }
      }

      // Date filtering
      if (filters.fromDate || filters.toDate) {
        const [datePart] = transaction.time.split(" - ");
        const [day, month, year] = datePart.split("/").map(Number);
        const transactionDate = new Date(2000 + year, month - 1, day);

        if (filters.fromDate) {
          const fromDate = new Date(filters.fromDate);
          fromDate.setHours(0, 0, 0, 0);
          if (transactionDate < fromDate) return false;
        }

        if (filters.toDate) {
          const toDate = new Date(filters.toDate);
          toDate.setHours(23, 59, 59, 999);
          if (transactionDate > toDate) return false;
        }
      }

      // Search filter
      if (filters.search) {
        return transaction.id
          .toLowerCase()
          .includes(filters.search.toLowerCase());
      }

      return true;
    });
  }, [filters]);

  // Calculate pagination values
  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = Math.min(startIndex + pagination.itemsPerPage, totalItems);
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: parseInt(value),
      currentPage: 1, // Reset to first page when changing items per page
      totalItems: filteredTransactions.length,
    }));
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: (number | "ellipsis")[] = [];
    const maxVisiblePages = 5; // Maximum number of page numbers to show

    if (totalPages <= maxVisiblePages) {
      // If total pages is less than max visible, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      if (pagination.currentPage > 3) {
        pageNumbers.push("ellipsis");
      }

      // Show pages around current page
      for (
        let i = Math.max(2, pagination.currentPage - 1);
        i <= Math.min(totalPages - 1, pagination.currentPage + 1);
        i++
      ) {
        pageNumbers.push(i);
      }

      if (pagination.currentPage < totalPages - 2) {
        pageNumbers.push("ellipsis");
      }

      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border">
        {isMobile ? (
          currentTransactions.map((transaction: Transaction) => (
            <div key={transaction.id} className="border-b p-4 space-y-2">
              <div
                className={`text-lg font-medium ${
                  transaction.amount > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {transaction.amount > 0 ? "+" : "-"}
                {Math.abs(transaction.amount).toLocaleString()} VND
              </div>
              <div className="text-gray-500 text-sm">{transaction.time}</div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">
                  MÃ GIAO DỊCH: {transaction.id}
                </div>
                <div className="text-sm text-gray-600">
                  NỘI DUNG: {transaction.content}
                </div>
                <div className="text-sm text-gray-600">
                  Người chuyển:{" "}
                  <span className="uppercase font-bold text-gray-800">
                    {transaction.sender}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] p-4">Mã giao dịch</TableHead>
                <TableHead className="w-[150px]">Thời gian</TableHead>
                <TableHead className="w-[150px]">Người chuyển</TableHead>
                <TableHead>Nội dung</TableHead>
                <TableHead className="text-right w-[150px]">Số tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium p-4">
                    {transaction.id}
                  </TableCell>
                  <TableCell>{transaction.time}</TableCell>
                  <TableCell>{transaction.sender}</TableCell>
                  <TableCell>{transaction.content}</TableCell>
                  <TableCell
                    className={`text-right ${
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : "-"}
                    {Math.abs(transaction.amount).toLocaleString()} VND
                  </TableCell>
                </TableRow>
              ))}
              {currentTransactions.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-4 text-muted-foreground"
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Hiển thị {totalItems > 0 ? startIndex + 1 : 0} - {endIndex}/
            {totalItems}
          </div>
          <Select
            value={pagination.itemsPerPage.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value} hàng
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {totalItems > 0 && (
          <Pagination className="w-fit">
            <PaginationContent className="flex flex-wrap gap-2 justify-center">
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.currentPage > 1) {
                      handlePageChange(pagination.currentPage - 1);
                    }
                  }}
                  className={
                    pagination.currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) => (
                <PaginationItem key={index}>
                  {pageNumber === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNumber);
                      }}
                      isActive={pagination.currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.currentPage < totalPages) {
                      handlePageChange(pagination.currentPage + 1);
                    }
                  }}
                  className={
                    pagination.currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
