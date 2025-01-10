"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, BadgeDollarSign, ArrowDownRight, Wallet, BanknoteIcon as BankIcon, Receipt, Plus } from 'lucide-react'
import { LedgerTable } from "./components/ledger-table"
import { AccountsList } from "./components/accounts-list"
import Link from "next/link"

export default function LedgerDashboard() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ledger Dashboard</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/ledger/new">New Entry</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Assets" 
          value="₹2,85,000" 
          description="+14.2% from last month"
          trend="up"
          icon={Wallet}
          className="bg-blue-50 border-blue-100"
          iconClassName="text-blue-600"
        />
        <MetricCard 
          title="Total Liabilities" 
          value="₹98,500" 
          description="+5.1% from last month"
          trend="up"
          icon={BankIcon}
          className="bg-red-50 border-red-100"
          iconClassName="text-red-600"
        />
        <MetricCard 
          title="Net Position" 
          value="₹1,86,500" 
          description="+18.4% from last month"
          trend="up"
          icon={BadgeDollarSign}
          className="bg-green-50 border-green-100"
          iconClassName="text-green-600"
        />
        <MetricCard 
          title="Pending Entries" 
          value="12" 
          description="-3 since yesterday"
          trend="down"
          icon={Receipt}
          className="bg-purple-50 border-purple-100"
          iconClassName="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <LedgerTable data={transactionsData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Accounts</CardTitle>
            <Button size="icon" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <AccountsList data={accountsData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({ 
  title, 
  value, 
  description, 
  trend,
  icon: Icon,
  className = "",
  iconClassName = ""
}: { 
  title: string
  value: string
  description: string
  trend: "up" | "down"
  icon: any
  className?: string
  iconClassName?: string
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconClassName}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {trend === "up" ? (
            <ArrowUpRight className="h-3 w-3 text-green-600" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-red-600" />
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

const transactionsData = [
  {
    id: "TR-001",
    date: "2024-01-15",
    account: "Sales Revenue",
    description: "Invoice payment received",
    debit: "12,500",
    credit: "0",
    balance: "12,500"
  },
  {
    id: "TR-002",
    date: "2024-01-14",
    account: "Office Supplies",
    description: "Stationery purchase",
    debit: "0",
    credit: "2,500",
    balance: "10,000"
  },
  {
    id: "TR-003",
    date: "2024-01-14",
    account: "Bank Charges",
    description: "Monthly maintenance fee",
    debit: "0",
    credit: "500",
    balance: "9,500"
  },
  {
    id: "TR-004",
    date: "2024-01-13",
    account: "Accounts Receivable",
    description: "Client payment",
    debit: "15,000",
    credit: "0",
    balance: "24,500"
  },
  {
    id: "TR-005",
    date: "2024-01-13",
    account: "Utilities",
    description: "Electricity bill payment",
    debit: "0",
    credit: "3,500",
    balance: "21,000"
  }
]

const accountsData = [
  {
    name: "Cash Account",
    balance: "45,000",
    type: "Asset",
    status: "Active"
  },
  {
    name: "Accounts Receivable",
    balance: "78,500",
    type: "Asset",
    status: "Active"
  },
  {
    name: "Accounts Payable",
    balance: "32,000",
    type: "Liability",
    status: "Active"
  },
  {
    name: "Sales Revenue",
    balance: "1,25,000",
    type: "Revenue",
    status: "Active"
  },
  {
    name: "Office Expenses",
    balance: "18,500",
    type: "Expense",
    status: "Active"
  }
]

