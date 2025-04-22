import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  Row,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import TablePaginationInfo from "./TablePaginationInfoScholar";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export interface Scholarship {
  id: string;
  name: string;
  description: string;
  condition: string;
  amount: number;
  major_id: string;
  campus_id: string;
  status: string;
  application_url: string;
}

interface ScholarshipTableProps {
  data: Scholarship[];
  onEdit?: (item: Scholarship) => void;
  onDelete?: (item: Scholarship) => void;
  showActions?: boolean;
}

const ScholarshipTable: React.FC<ScholarshipTableProps> = ({
  data,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const columns: ColumnDef<Scholarship>[] = [
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="max-w-[150px] whitespace-pre-wrap break-words">
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-[250px] whitespace-pre-wrap break-words">
          {row.original.description}
        </div>
      ),
    },
    {
      accessorKey: "condition",
      header: "Condition",
      cell: ({ row }) => (
        <div className="max-w-[200px] whitespace-pre-wrap break-words">
          {row.original.condition}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => formatCurrency(row.original.amount),
    },
    { accessorKey: "major_id", header: "Major" },
    { accessorKey: "campus_id", header: "Campus" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    ...(showActions
      ? [
          {
            id: "actions",
            header: "Actions",
            cell: ({ row }: { row: Row<Scholarship> }) => {
              const item = row.original;
              return (
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white shadow-lg border border-gray-300 rounded-lg overflow-hidden transition-all transform duration-200 ease-in-out"
                    >
                      <DropdownMenuLabel className="text-gray-700 font-semibold py-2 px-4">
                        Menu
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="border-t border-gray-300" />
                      {onEdit && (
                        <DropdownMenuItem
                          onClick={() => onEdit(item)}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                          Edit
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <a
                          href={item.application_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                          Apply
                        </a>
                      </DropdownMenuItem>
                      {onDelete && (
                        <DropdownMenuItem
                          onClick={() => onDelete(item)}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            },
          },
        ]
      : []),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 6,
        pageIndex: 0,
      },
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
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
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row: Row<Scholarship>) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={showActions ? 9 : 8}
                className="text-center py-4"
              >
                No scholarships found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePaginationInfo table={table} />
    </div>
  );
};

export default ScholarshipTable;
