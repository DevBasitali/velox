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
import { Edit2, Eye, Filter, Search, SortAsc, Trash2, Share2, X } from 'lucide-react'
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface SalesData {
  invoiceNumber: string
  invoiceDate: string
  customerName: string
  gstinNo: string
  taxableValue: number
  quantity: number
  uom: string
  isEInvoice?: boolean
}

const salesData: SalesData[] = [
  {
    invoiceNumber: "INV-001",
    invoiceDate: "2024-01-15",
    customerName: "Acme Corp",
    gstinNo: "27AADCB2230M1Z2",
    taxableValue: 5000.00,
    quantity: 10,
    uom: "PCS"
  },
  {
    invoiceNumber: "INV-002",
    invoiceDate: "2024-01-14",
    customerName: "TechStart Inc",
    gstinNo: "29ABCDE1234F1Z5",
    taxableValue: 7500.00,
    quantity: 5,
    uom: "KG"
  },
  {
    invoiceNumber: "INV-003",
    invoiceDate: "2024-01-14",
    customerName: "Global Solutions",
    gstinNo: "32FGHIJ5678K1Z8",
    taxableValue: 12000.00,
    quantity: 20,
    uom: "MTR"
  },
  {
    invoiceNumber: "INV-004",
    invoiceDate: "2024-01-13",
    customerName: "Local Shop",
    gstinNo: "33KLMNO9012P1Z1",
    taxableValue: 2500.00,
    quantity: 15,
    uom: "PCS"
  },
  {
    invoiceNumber: "INV-005",
    invoiceDate: "2024-01-13",
    customerName: "Metro Retail",
    gstinNo: "19PQRST3456U1Z4",
    taxableValue: 8750.00,
    quantity: 25,
    uom: "BOX"
  },
  {
    invoiceNumber: "EINV-006",
    invoiceDate: "2024-01-16",
    customerName: "E-Corp Solutions",
    gstinNo: "36UVWXY7890Z1Z7",
    taxableValue: 15000.00,
    quantity: 30,
    uom: "PCS",
    isEInvoice: true
  }
]

export function SalesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns: ColumnDef<SalesData>[] = [
    {
      accessorKey: "invoiceNumber",
      header: "Invoice Number",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 font-medium">
          {row.getValue("invoiceNumber")}
          {row.original.isEInvoice && (
            <Badge variant="secondary" className="h-5 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-100">
              E
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "invoiceDate",
      header: "Invoice Date",
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
    },
    {
      accessorKey: "gstinNo",
      header: "GSTIN No",
    },
    {
      accessorKey: "taxableValue",
      header: "Taxable Value",
      cell: ({ row }) => {
        const value = row.getValue("taxableValue") as number
        return <div>₹{value.toFixed(2)}</div>
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "uom",
      header: "UOM",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-end space-x-2">
            <Button variant="ghost" size="icon" asChild className="hover:bg-blue-100">
              <Link href={`/sales/${row.original.invoiceNumber}`}>
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="sr-only">View</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-green-100">
              <Link href={`/sales/${row.original.invoiceNumber}/edit`}>
                <Edit2 className="h-4 w-4 text-green-600" />
                <span className="sr-only">Edit</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-purple-100">
              <Share2 className="h-4 w-4 text-purple-600" />
              <span className="sr-only">Share</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-red-100"
              onClick={() => {
                console.log(`Delete sale with Invoice Number: ${row.original.invoiceNumber}`)
              }}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
              <span className="sr-only">Delete</span>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <X className="h-4 w-4 text-gray-600" />
              <span className="sr-only">Cancel</span>
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: salesData,
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
              placeholder="Search invoices..."
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
            <DropdownMenuItem onClick={() => table.getColumn("invoiceDate")?.toggleSorting(false)}>
              Date (Newest First)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("invoiceDate")?.toggleSorting(true)}>
              Date (Oldest First)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("taxableValue")?.toggleSorting(false)}>
              Taxable Value (Highest First)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("taxableValue")?.toggleSorting(true)}>
              Taxable Value (Lowest First)
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
    </div>
  )
}

