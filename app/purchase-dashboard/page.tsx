"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, BadgeDollarSign, BarChart2, Package, TrendingUp, Users2 } from 'lucide-react'
import { PurchaseTable } from "./components/purchase-table"
import Link from "next/link"

export default function PurchaseDashboard() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Purchase Dashboard</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/purchase/new">New Purchase</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Purchases" 
          value="₹985,000" 
          description="+8.5% from last month"
          icon={BadgeDollarSign}
          className="bg-blue-50 border-blue-100"
          iconClassName="text-blue-600"
        />
        <MetricCard 
          title="Total Orders" 
          value="72" 
          description="9 orders today"
          icon={Package}
          className="bg-green-50 border-green-100"
          iconClassName="text-green-600"
        />
        <MetricCard 
          title="Purchase Growth" 
          value="18.2%" 
          description="Increased by 2.1%"
          icon={TrendingUp}
          className="bg-amber-50 border-amber-100"
          iconClassName="text-amber-600"
        />
        <MetricCard 
          title="Active Suppliers" 
          value="843" 
          description="15 new this month"
          icon={Users2}
          className="bg-purple-50 border-purple-100"
          iconClassName="text-purple-600"
        />
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Purchases</CardTitle>
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            View Reports
          </Button>
        </CardHeader>
        <CardContent>
          <PurchaseTable data={purchaseData} />
        </CardContent>
      </Card>
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

const purchaseData = [
  {
    invoiceNumber: "PUR-001",
    invoiceDate: "2024-01-15",
    supplierName: "Tech Supplies Inc.",
    gstinNo: "29ABCDE1234F1Z5",
    taxableValue: 75000.00,
    quantity: 15,
    uom: "PCS"
  },
  {
    invoiceNumber: "PUR-002",
    invoiceDate: "2024-01-14",
    supplierName: "Office Essentials Co.",
    gstinNo: "27FGHIJ5678K1Z8",
    taxableValue: 52500.00,
    quantity: 30,
    uom: "BOX"
  },
  {
    invoiceNumber: "PUR-003",
    invoiceDate: "2024-01-14",
    supplierName: "Industrial Parts Ltd.",
    gstinNo: "24KLMNO9012P1Z1",
    taxableValue: 98000.00,
    quantity: 50,
    uom: "KG"
  },
  {
    invoiceNumber: "PUR-004",
    invoiceDate: "2024-01-13",
    supplierName: "Global Traders",
    gstinNo: "19PQRST3456U1Z4",
    taxableValue: 36000.00,
    quantity: 100,
    uom: "MTR"
  },
  {
    invoiceNumber: "PUR-005",
    invoiceDate: "2024-01-13",
    supplierName: "Quality Goods Pvt. Ltd.",
    gstinNo: "32UVWXY7890Z1Z7",
    taxableValue: 64500.00,
    quantity: 25,
    uom: "LTR"
  }
]

