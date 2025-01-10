"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, BadgeDollarSign, BarChart2, Package, TrendingUp, Users2 } from 'lucide-react'
import { SalesTable } from "./components/sales-table"
import Link from "next/link"

export default function SalesDashboard() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sales Dashboard</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/sales/new">New Sale</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Revenue" 
          value="₹125,000" 
          description="+12.5% from last month"
          icon={BadgeDollarSign}
          className="bg-blue-50 border-blue-100"
          iconClassName="text-blue-600"
        />
        <MetricCard 
          title="Total Orders" 
          value="87" 
          description="12 orders today"
          icon={Package}
          className="bg-green-50 border-green-100"
          iconClassName="text-green-600"
        />
        <MetricCard 
          title="Sales Growth" 
          value="24.5%" 
          description="Increased by 3.2%"
          icon={TrendingUp}
          className="bg-amber-50 border-amber-100"
          iconClassName="text-amber-600"
        />
        <MetricCard 
          title="Active Customers" 
          value="1,432" 
          description="134 new this month"
          icon={Users2}
          className="bg-purple-50 border-purple-100"
          iconClassName="text-purple-600"
        />
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Sales</CardTitle>
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            View Reports
          </Button>
        </CardHeader>
        <CardContent>
          <SalesTable data={salesData} />
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

const salesData = [
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
  }
]

