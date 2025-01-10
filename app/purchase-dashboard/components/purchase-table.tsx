"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { format } from "date-fns"
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
import { CalendarIcon, Edit2, Eye, Filter, Search, SortAsc, Trash2, Share2, X } from 'lucide-react'
import Link from "next/link"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { EasyDatePicker } from "@/components/ui/easy-date-picker"

interface PurchaseData {
  invoiceNumber: string
  invoiceDate: string
  supplierName: string
  gstinNo: string
  taxableValue: number
  quantity: number
  uom: string
}

export function PurchaseTable({ data }: { data: PurchaseData[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [filteredData, setFilteredData] = useState(data)

  const isFiltered = globalFilter !== '' || fromDate !== null || toDate !== null

  useEffect(() => {
    const filtered = data.filter(purchase => {
      const purchaseDate = new Date(purchase.invoiceDate)
      const matchesSearch =
        purchase.invoiceNumber.toLowerCase().includes(globalFilter.toLowerCase()) ||
        purchase.supplierName.toLowerCase().includes(globalFilter.toLowerCase())

      const matchesDateRange =
        (!fromDate || purchaseDate >= fromDate) &&
        (!toDate || purchaseDate <= toDate)

      return matchesSearch && matchesDateRange
    })
    setFilteredData(filtered)
  }, [globalFilter, fromDate, toDate, data])

  const clearFilters = () => {
    setGlobalFilter('')
    setFromDate(null)
    setToDate(null)
  }

  const columns: ColumnDef<PurchaseData>[] = [
    {
      accessorKey: "invoiceNumber",
      header: "Invoice Number",
      cell: ({ row }) => <div className="font-medium">{row.getValue("invoiceNumber")}</div>,
    },
    {
      accessorKey: "invoiceDate",
      header: "Invoice Date",
    },
    {
      accessorKey: "supplierName",
      header: "Supplier Name",
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
              <Link href={`/purchase/${row.original.invoiceNumber}`}>
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="sr-only">View</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-green-100">
              <Link href={`/purchase/${row.original.invoiceNumber}/edit`}>
                <Edit2 className="h-4 w-4 text-green-600" />
                <span className="sr-only">Edit</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-purple-100">
              <Link href={`/purchase/${row.original.invoiceNumber}/share`}>
                <Share2 className="h-4 w-4 text-purple-600" />
                <span className="sr-only">Share</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-red-100"
              onClick={() => {
                console.log(`Delete purchase with Invoice Number: ${row.original.invoiceNumber}`)
              }}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: filteredData,
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
              placeholder="Search purchases..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] pl-3 text-left font-normal">
                {fromDate ? (
                  format(fromDate, "PPP")
                ) : (
                  <span>From Date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <EasyDatePicker
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                onDateChange={(date) => setFromDate(date || null)}
                disabled={(date) =>
                  date > new Date() || (toDate ? date > toDate : false)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] pl-3 text-left font-normal">
                {toDate ? (
                  format(toDate, "PPP")
                ) : (
                  <span>To Date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <EasyDatePicker
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                onDateChange={(date) => setToDate(date || null)}
                disabled={(date) =>
                  date > new Date() || (fromDate ? date < fromDate : false)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
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

