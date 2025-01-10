"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, BadgeDollarSign, BarChart2, Calendar, Receipt, Users2 } from 'lucide-react'
import { ReceiptTable } from "./components/receipt-table"
import { ReceiptModal } from "./components/receipt-modal"

export default function ReceiptDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Receipt Dashboard</h1>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          New Receipt
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Receipts" 
          value="₹2,85,000" 
          description="+14.2% from last month"
          icon={Receipt}
          className="bg-indigo-50 border-indigo-100"
          iconClassName="text-indigo-600"
        />
        <MetricCard 
          title="Today's Collection" 
          value="₹32,500" 
          description="12 receipts today"
          icon={BadgeDollarSign}
          className="bg-green-50 border-green-100"
          iconClassName="text-green-600"
        />
        <MetricCard 
          title="Pending Collections" 
          value="₹98,500" 
          description="Due this week"
          icon={Calendar}
          className="bg-yellow-50 border-yellow-100"
          iconClassName="text-yellow-600"
        />
        <MetricCard 
          title="Active Customers" 
          value="843" 
          description="21 new this month"
          icon={Users2}
          className="bg-purple-50 border-purple-100"
          iconClassName="text-purple-600"
        />
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Receipts</CardTitle>
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            View Reports
          </Button>
        </CardHeader>
        <CardContent>
          <ReceiptTable data={receiptData} />
        </CardContent>
      </Card>

      <ReceiptModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
}

function MetricCard({ 
  title, 
  value, 
  description, 
  icon: Icon,
  className = "",
  iconClassName = ""
}: { 
  title: string
  value: string
  description: string
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
          <ArrowUpRight className="h-3 w-3" />
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

const receiptData = [
  {
    id: "RCP-001",
    customer: "Acme Corp",
    date: "2024-01-15",
    amount: "12,500",
    mode: "Bank Transfer",
    narration: "Invoice payment for Jan 2024"
  },
  {
    id: "RCP-002",
    customer: "TechStart Inc",
    date: "2024-01-14",
    amount: "8,750",
    mode: "Cheque",
    narration: "Advance payment for services"
  },
  {
    id: "RCP-003",
    customer: "Global Solutions",
    date: "2024-01-14",
    amount: "15,200",
    mode: "UPI",
    narration: "Project completion payment"
  },
  {
    id: "RCP-004",
    customer: "Local Shop",
    date: "2024-01-13",
    amount: "6,300",
    mode: "Cash",
    narration: "Monthly subscription fee"
  },
  {
    id: "RCP-005",
    customer: "Metro Retail",
    date: "2024-01-13",
    amount: "9,800",
    mode: "Bank Transfer",
    narration: "Quarterly maintenance charges"
  }
]

