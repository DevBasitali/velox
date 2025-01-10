"use client"

import { useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Edit, Trash2, Filter, Search, SortAsc, Share2 } from 'lucide-react'
import { ViewReceiptModal } from "./view-receipt-modal"
import { ReceiptModal } from "./receipt-modal"

interface ReceiptData {
  id: string
  customer: string
  date: string
  amount: string
  mode: string
  narration: string
}

interface ReceiptTableProps {
  data: ReceiptData[]
}

export function ReceiptTable({ data }: ReceiptTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | null>(null)

  const columns: ColumnDef<ReceiptData>[] = [
    {
      accessorKey: "id",
      header: "Receipt No",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => <div>{row.getValue("customer")}</div>,
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <div>₹{row.getValue("amount")}</div>,
    },
    {
      accessorKey: "mode",
      header: "Payment Mode",
    },
    {
      accessorKey: "narration",
      header: "Narration",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const receipt = row.original
        return (
          <div className="flex items-center justify-end space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-blue-100"
              onClick={() => {
                setSelectedReceipt(receipt)
                setViewModalOpen(true)
              }}
            >
              <Eye className="h-4 w-4 text-blue-600" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-purple-100">
              <Share2 className="h-4 w-4 text-purple-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-green-100"
              onClick={() => {
                setSelectedReceipt(receipt)
                setEditModalOpen(true)
              }}
            >
              <Edit className="h-4 w-4 text-green-600" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-red-100">
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search receipts..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Add filter options here if needed */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SortAsc className="h-4 w-4" /> Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => table.getColumn("date")?.toggleSorting(false)}>
              Date (Newest First)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("date")?.toggleSorting(true)}>
              Date (Oldest First)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("amount")?.toggleSorting(false)}>
              Amount (Highest First)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("amount")?.toggleSorting(true)}>
              Amount (Lowest First)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ViewReceiptModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        receipt={selectedReceipt}
      />
      <ReceiptModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        receipt={selectedReceipt}
      />
    </div>
  )
}

