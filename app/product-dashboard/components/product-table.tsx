"use client"

import {  useEffect } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
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
import { ArrowUpDown, Eye, Edit, Trash } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { ViewProductModal } from "./view-product-modal"
import { EditProductModal } from "./edit-product-modal"

interface Product {
  id: string
  name: string
  group: string
  stock: number
  stockValue: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  hsnCode: string
  gstPercentage: number
}

const data: Product[] = [
  { id: "1", name: "Product A", group: "Electronics", stock: 50, stockValue: 49950, status: "In Stock", hsnCode: "8517", gstPercentage: 18 },
  { id: "2", name: "Product B", group: "Clothing", stock: 100, stockValue: 49900, status: "In Stock", hsnCode: "6203", gstPercentage: 5 },
  { id: "3", name: "Product C", group: "Home & Garden", stock: 5, stockValue: 6495, status: "Low Stock", hsnCode: "9403", gstPercentage: 28 },
  { id: "4", name: "Product D", group: "Electronics", stock: 0, stockValue: 0, status: "Out of Stock", hsnCode: "8518", gstPercentage: 18 },
  { id: "5", name: "Product E", group: "Clothing", stock: 75, stockValue: 44925, status: "In Stock", hsnCode: "6204", gstPercentage: 5 },
]

interface ProductTableProps {
  searchTerm: string
  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
}

export function ProductTable({ searchTerm, sorting, setSorting }: ProductTableProps) {
  const [filteredData, setFilteredData] = useState(data)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const filtered = data.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.group.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredData(filtered)
  }, [searchTerm])

  const viewProduct = (product: Product) => {
    setSelectedProduct(product)
    setViewModalOpen(true)
  }

  const editProduct = (product: Product) => {
    setSelectedProduct(product)
    setEditModalOpen(true)
  }

  const handleSaveEdit = (updatedProduct: Product) => {
    // Update the product in the data array
    const updatedData = filteredData.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    )
    setFilteredData(updatedData)
    toast({
      title: "Product Updated",
      description: `${updatedProduct.name} has been updated successfully.`,
    })
  }

  const deleteProduct = (product: Product) => {
    toast({
      title: "Delete Product",
      description: `Are you sure you want to delete ${product.name}?`,
      variant: "destructive",
    })
    // Implement delete logic here
  }

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "group",
      header: "Group",
    },
    {
      accessorKey: "hsnCode",
      header: "HSN Code",
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"))
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(price)
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "stockValue",
      header: "Stock Value",
      cell: ({ row }) => {
        const value = parseFloat(row.getValue("stockValue"))
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(value)
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "gstPercentage",
      header: "GST %",
      cell: ({ row }) => {
        const gst = parseFloat(row.getValue("gstPercentage"))
        return <div className="font-medium">{gst}%</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div className={`font-medium ${
            status === "In Stock" ? "text-green-600" :
            status === "Low Stock" ? "text-yellow-600" :
            "text-red-600"
          }`}>
            {status}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original
        return (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => viewProduct(product)}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => editProduct(product)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => deleteProduct(product)}>
              <Trash className="h-4 w-4" />
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  return (
    <div>
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <ViewProductModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        product={selectedProduct}
      />
      <EditProductModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        product={selectedProduct}
        onSave={handleSaveEdit}
      />
    </div>
  )
}

