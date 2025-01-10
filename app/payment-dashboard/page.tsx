"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, BadgeDollarSign, BarChart2, Calendar, CreditCard, Users2 } from 'lucide-react'
import { PaymentTable } from "./components/payment-table"
import { PaymentModal } from "./components/payment-modal"

export default function PaymentDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payment Dashboard</h1>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          New Payment
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Payments" 
          value="₹3,75,000" 
          description="+8.1% from last month"
          icon={CreditCard}
          className="bg-emerald-50 border-emerald-100"
          iconClassName="text-emerald-600"
        />
        <MetricCard 
          title="Today's Payments" 
          value="₹42,500" 
          description="15 payments today"
          icon={BadgeDollarSign}
          className="bg-blue-50 border-blue-100"
          iconClassName="text-blue-600"
        />
        <MetricCard 
          title="Scheduled Payments" 
          value="₹1,28,500" 
          description="Due this week"
          icon={Calendar}
          className="bg-amber-50 border-amber-100"
          iconClassName="text-amber-600"
        />
        <MetricCard 
          title="Active Vendors" 
          value="156" 
          description="12 new this month"
          icon={Users2}
          className="bg-purple-50 border-purple-100"
          iconClassName="text-purple-600"
        />
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Payments</CardTitle>
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            View Reports
          </Button>
        </CardHeader>
        <CardContent>
          <PaymentTable data={paymentData} />
        </CardContent>
      </Card>

      <PaymentModal 
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

const paymentData = [
  {
    voucherNo: "PV-001",
    vendor: "Office Supplies Co.",
    date: "2024-01-15",
    amount: "12,500",
    paymentMode: "Bank Transfer",
    narration: "Payment for office supplies - January"
  },
  {
    voucherNo: "PV-002",
    vendor: "Tech Hardware Inc",
    date: "2024-01-14",
    amount: "28,750",
    paymentMode: "Cheque",
    narration: "IT equipment purchase"
  },
  {
    voucherNo: "PV-003",
    vendor: "Logistics Partners",
    date: "2024-01-14",
    amount: "15,200",
    paymentMode: "UPI",
    narration: "Shipping charges for Q4 2023"
  },
  {
    voucherNo: "PV-004",
    vendor: "Marketing Agency",
    date: "2024-01-13",
    amount: "36,300",
    paymentMode: "Credit Card",
    narration: "Digital marketing campaign - January"
  },
  {
    voucherNo: "PV-005",
    vendor: "Utility Services Ltd",
    date: "2024-01-13",
    amount: "9,800",
    paymentMode: "Bank Transfer",
    narration: "Electricity bill payment"
  }
]

