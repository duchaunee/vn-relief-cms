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
    id: "FT25007222222024",
    sender: "NGUYEN THAI HOC",
    content:
      "CHUYEN TIEN THEO TO TRINH 161/TTR-MTTW-BPT NGAY 27/9/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 3",
    time: "07/01/25 - 18:27:00",
    amount: -10000000.0,
  },
  {
    id: "FT25007222222022",
    sender: "LE THI THE",
    content:
      "CHUYEN TIEN THEO TO TRINH 161/TTR-MTTW-BPT NGAY 27/9/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 4",
    time: "07/01/25 - 18:27:00",
    amount: -180000000.0,
  },
  {
    id: "FT25007222222023",
    sender: "TRUONG NGOC TAM",
    content:
      "CHUYEN TIEN THEO TO TRINH 161/TTR-MTTW-BPT NGAY 27/9/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 4",
    time: "07/01/25 - 18:27:00",
    amount: -54000000.0,
  },
  {
    id: "FT25007222222025",
    sender: "LAI THI DINH",
    content:
      "CHUYEN TIEN THEO TO TRINH 161/TTR-MTTW-BPT NGAY 27/9/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 3",
    time: "07/01/25 - 18:27:00",
    amount: -10000000.0,
  },
  {
    id: "FT25007222222021",
    sender: "NGUYEN NGOC MINH MAN",
    content:
      "CHUYEN TIEN THEO TO TRINH 161/TTR-MTTW-BPT NGAY 27/9/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 3",
    time: "07/01/25 - 18:26:00",
    amount: -8600000.0,
  },
  {
    id: "FT25007222222036",
    sender: "PHAN MINH HAI",
    content:
      "CHUYEN TIEN THEO TO TRINH 172/TTR-MTTW-BPT NGAY 02/11/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 15",
    time: "07/01/25 - 18:40:00",
    amount: 12000000.0,
  },
  {
    id: "FT25007222222037",
    sender: "HOANG NGUYEN KIM",
    content:
      "CHUYEN TIEN THEO TO TRINH 173/TTR-MTTW-BPT NGAY 05/11/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 16",
    time: "07/01/25 - 18:41:00",
    amount: 25000000.0,
  },
  {
    id: "FT25007222222038",
    sender: "VAN DUONG",
    content:
      "CHUYEN TIEN THEO TO TRINh 174/TTR-MTTW-BPT NGAY 10/11/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 17",
    time: "07/01/25 - 18:42:00",
    amount: 15000000.0,
  },
  {
    id: "FT25007222222039",
    sender: "NGUYEN THI HANH",
    content:
      "CHUYEN TIEN THEO TO TRINH 171/TTR-MTTW-BPT NGAY 15/11/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 14",
    time: "07/01/25 - 18:43:00",
    amount: 20000000.0,
  },
  {
    id: "FT25007222222040",
    sender: "HOANG TUNG",
    content:
      "CHUYEN TIEN THEO TO TRINH 180/TTR-MTTW-BPT NGAY 12/11/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 18",
    time: "07/01/25 - 18:45:00",
    amount: 18000000.0,
  },
  {
    id: "FT25007222222041",
    sender: "PHUONG DAI",
    content:
      "CHUYEN TIEN THEO TO TRINH 186/TTR-MTTW-BPT NGAY 19/11/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 19",
    time: "07/01/25 - 18:46:00",
    amount: 10000000.0,
  },
  {
    id: "FT25007222222042",
    sender: "TUNG HOAI",
    content:
      "CHUYEN TIEN THEO TO TRINH 185/TTR-MTTW-BPT NGAY 20/11/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 19",
    time: "07/01/25 - 18:47:00",
    amount: 22000000.0,
  },
  {
    id: "FT25007222222043",
    sender: "MONG LIEM",
    content:
      "CHUYEN TIEN THEO TO TRINH 188/TTR-MTTW-BPT NGAY 25/11/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 20",
    time: "07/01/25 - 18:48:00",
    amount: 13000000.0,
  },
  {
    id: "FT25007222222044",
    sender: "NGUYEN BAO",
    content:
      "CHUYEN TIEN THEO TO TRINH 190/TTR-MTTW-BPT NGAY 27/11/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 21",
    time: "07/01/25 - 18:49:00",
    amount: 16000000.0,
  },
  {
    id: "FT25007222222045",
    sender: "DAO MAI",
    content:
      "CHUYEN TIEN THEO TO TRINH 192/TTR-MTTW-BPT NGAY 30/11/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 22",
    time: "07/01/25 - 18:50:00",
    amount: 17000000.0,
  },
  {
    id: "FT25007222222046",
    sender: "PHUONG LE",
    content:
      "CHUYEN TIEN THEO TO TRINH 193/TTR-MTTW-BPT NGAY 05/12/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 23",
    time: "07/01/25 - 18:51:00",
    amount: 14000000.0,
  },
  {
    id: "FT25007222222047",
    sender: "HUY THIEN",
    content:
      "CHUYEN TIEN THEO TO TRINH 195/TTR-MTTW-BPT NGAY 12/12/2024 CUA BANPHONG TRAO VV CHUYEN TRA LAI TIENCHO CA NHAN DO CHUYEN NHAM VAO TK NGUON CUU TRO TW DOT 24",
    time: "07/01/25 - 18:52:00",
    amount: 19000000.0,
  },
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
