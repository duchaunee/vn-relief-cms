"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CirclePlus, MoreVertical, Trash, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { DataTableProps, FilterConfig } from "@/types/data-table";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

function FilterDropdown<T>({
  filter,
  selectedValues,
  onChange,
}: {
  filter: FilterConfig<T>;
  selectedValues: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-8 px-3 border-dashed border-gray-300 bg-white hover:bg-gray-100"
        >
          <CirclePlus />
          {filter.label}
          {selectedValues.length > 0 && (
            <div className="flex items-center">
              <Separator className="shrink-0 bg-gray-300 w-[1px] mr-2 h-4" />
              <Badge variant="secondary" className=" bg-gray-100 px-1">
                {selectedValues.length} đã chọn
              </Badge>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2" align="start">
        <div className="space-y-2">
          {filter.options.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-2 p-1 hover:bg-accent rounded-md"
            >
              <Checkbox
                id={`${String(filter.key)}-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChange([...selectedValues, option.value]);
                  } else {
                    onChange(selectedValues.filter((v) => v !== option.value));
                  }
                }}
              />
              <label
                htmlFor={`${String(filter.key)}-${option.value}`}
                className="flex-1 text-sm cursor-pointer"
              >
                {option.label}
              </label>
              {option.count !== undefined && (
                <span className="text-muted-foreground text-xs">
                  {option.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  filters = [],
  onDelete,
  onEdit,
  onView,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string[]>
  >({});
  const [selectedItem, setSelectedItem] = React.useState<T | null>(null);
  const [dialogType, setDialogType] = React.useState<
    "view" | "edit" | "delete" | "deleteSelected" | null
  >(null);
  const [rowSelection, setRowSelection] = React.useState({});
  const [editedItem, setEditedItem] = React.useState<Partial<T> | null>(null);

  const tableColumns: ColumnDef<T>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns.map((col) => ({
      accessorKey: col.key,
      header: ({ column }) => {
        if (col.renderHeader) {
          return col.renderHeader(col.label);
        }
        return col.sortable ? (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {col.label}
          </Button>
        ) : (
          col.label
        );
      },
      cell: ({ row }) => {
        const value = row.getValue(col.key);
        return col.render ? col.render(value, row.original) : value;
      },
      enableSorting: col.sortable,
    })),
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onView && (
                <DropdownMenuItem onClick={() => handleAction("view", item)}>
                  Xem
                </DropdownMenuItem>
              )}
              {onEdit && (
                <DropdownMenuItem onClick={() => handleAction("edit", item)}>
                  Sửa thông tin
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => handleAction("delete", item)}
                  className="text-red-600"
                >
                  Xoá
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
      },
    },
  });

  const handleAction = (
    type: "view" | "edit" | "delete" | "deleteSelected",
    item?: T
  ) => {
    if (item) {
      setSelectedItem(item);
      if (type === "edit") {
        setEditedItem({ ...item });
      }
    }
    setDialogType(type);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
    setEditedItem(null);
    setDialogType(null);
  };

  const handleFilterChange = (key: keyof T, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: values,
    }));
    table.getColumn(key)?.setFilterValue(values.length ? values : undefined);
  };

  const resetFilters = () => {
    setSelectedFilters({});
    table.resetColumnFilters();
  };

  const handleDeleteSelected = async () => {
    if (onDelete) {
      const selectedRows = table.getFilteredSelectedRowModel().rows;
      await onDelete(selectedRows.map((row) => row.original));
      setRowSelection({});
      handleCloseDialog();
    }
  };

  const handleEditSubmit = async () => {
    if (onEdit && editedItem) {
      await onEdit(editedItem as T);
      handleCloseDialog();
    }
  };

  const filteredRows = table.getFilteredRowModel().rows;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = table.getState().pagination.pageIndex + 1;
  const selectedRows = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className="w-full">
      <div className="flex flex-col items-start gap-4 pb-4">
        <Input
          placeholder="Tìm kiếm..."
          value={
            (table.getColumn(columns[0].key)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(columns[0].key)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <FilterDropdown
              key={String(filter.key)}
              filter={filter}
              selectedValues={selectedFilters[String(filter.key)] || []}
              onChange={(values) => handleFilterChange(filter.key, values)}
            />
          ))}
          <Button
            variant="outline"
            onClick={resetFilters}
            className="bg-transparent border-none shadow-none"
          >
            Xoá bộ lọc <X className="h-4 w-4" />
          </Button>
          {selectedRows > 0 && onDelete && (
            <>
              <Separator className="shrink-0 bg-gray-300 w-[1px] mr-2 h-4" />
              <Button
                variant="link"
                onClick={() => handleAction("deleteSelected")}
                className="gap-2 bg-transparent underline text-red-600 p-0"
              >
                <Trash className="h-4 w-4" />
                Xoá các mục ({selectedRows})
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 2}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 space-x-2 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selectedRows}/ {table.getFilteredRowModel().rows.length} hàng đã
            chọn
          </span>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={defaultPageSize.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm font-medium">hàng mỗi trang</span>
        </div>

        <Pagination className="w-full lg:w-fit mx-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.getCanPreviousPage();
                  if (table.getCanPreviousPage()) {
                    table.previousPage();
                  }
                }}
                className={cn(
                  !table.getCanPreviousPage() &&
                    "text-gray-400 hover:text-gray-400 cursor-not-allowed",
                  "hover:bg-transparent font-medium"
                )}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            {pageCount === 1 ? (
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
            ) : (
              Array.from({ length: pageCount }).map((_, i) => {
                if (
                  i === 0 ||
                  i === pageCount - 1 ||
                  (i >= currentPage - 2 && i <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          table.setPageIndex(i);
                        }}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                if ((i === 1 || i === pageCount - 2) && pageCount > 5) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (table.getCanNextPage()) {
                    table.nextPage();
                  }
                }}
                className={cn(
                  !table.getCanNextPage() &&
                    "text-gray-400  hover:text-gray-400 cursor-not-allowed",
                  "hover:bg-transparent font-medium"
                )}
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* View Dialog */}
      <Dialog open={dialogType === "view"} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {columns.map((column) => (
              <div
                key={String(column.key)}
                className="grid grid-cols-4 items-center gap-4"
              >
                <span className="font-medium">{column.label}:</span>
                <span className="col-span-3">
                  {selectedItem ? (selectedItem as any)[column.key] : ""}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={dialogType === "delete"} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xoá item này?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Huỷ
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedItem && onDelete) {
                  onDelete([selectedItem]);
                  handleCloseDialog();
                }
              }}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Selected Dialog */}
      <Dialog
        open={dialogType === "deleteSelected"}
        onOpenChange={handleCloseDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Selected Items</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xoá {selectedRows} item đã chọn?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Huỷ
            </Button>
            <Button variant="destructive" onClick={handleDeleteSelected}>
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={dialogType === "edit"} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {columns.map((column) => (
              <div
                key={String(column.key)}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={String(column.key)} className="text-right">
                  {column.label}
                </Label>
                <Input
                  id={String(column.key)}
                  value={editedItem ? (editedItem as any)[column.key] : ""}
                  onChange={(e) =>
                    setEditedItem((prev) => ({
                      ...prev,
                      [column.key]: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Huỷ
            </Button>
            <Button onClick={handleEditSubmit}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
