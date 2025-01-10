"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./data-table"

interface Transaction {
  docNumber: string
  customer: string
  date: string
  dueDate: string
  lastUpdated: string
  currency: string
  amount: string
  balance: string
}

const columns: ColumnDef<Transaction>[] = [
  { accessorKey: "docNumber", header: "Doc Number" },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "dueDate", header: "Due Date" },
  { accessorKey: "lastUpdated", header: "Last Updated" },
  { accessorKey: "currency", header: "Currency" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "balance", header: "Balance" },
]

const transactions: Transaction[] = [
  {
    docNumber: "2225",
    customer: "Pacific Ventures",
    date: "Jul 1, 2024",
    dueDate: "Jul 16, 2024",
    lastUpdated: "2023-06-30 2:54:05",
    currency: "USD",
    amount: "10600",
    balance: "10600"
  },
  {
    docNumber: "1015",
    customer: "United Solutions",
    date: "Nov 15, 2024",
    dueDate: "Nov 30, 2024",
    lastUpdated: "2023-06-30 3:28:48",
    currency: "USD",
    amount: "10000",
    balance: "10000"
  }
]

export function TransactionsTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <input
          type="search"
          placeholder="Search"
          className="px-4 py-2 border rounded-md w-[300px]"
        />
        <div className="flex gap-4">
          <button className="px-4 py-2 border rounded-md">Filters</button>
          <button className="px-4 py-2 border rounded-md">Sort by</button>
        </div>
      </div>
      <DataTable columns={columns} data={transactions} />
    </div>
  )
}

