"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart2, TrendingUp, Truck, Store, PieChart, ClipboardList, History, UserCheck, Download, Filter, Calendar, DollarSignIcon as MoneyIcon, FileTextIcon, IndianRupee } from 'lucide-react'
import { ReportOverview } from "./components/report-overview"
import { ReportsList } from "./components/reports-list"
import { DateRangePicker } from "./components/date-range-picker"

export default function ReportsDashboard() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports Dashboard</h1>
        <div className="flex items-center gap-4">
          <DateRangePicker />
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Sales" 
          value="₹12,45,000" 
          description="+14.2% from last month"
          icon={BarChart2}
          className="bg-blue-50 border-blue-100"
          iconClassName="text-blue-600"
        />
        <MetricCard 
          title="Total Purchases" 
          value="₹8,32,500" 
          description="+5.1% from last month"
          icon={TrendingUp}
          className="bg-green-50 border-green-100"
          iconClassName="text-green-600"
        />
        <MetricCard 
          title="Net Profit" 
          value="₹4,12,500" 
          description="+18.4% from last month"
          icon={PieChart}
          className="bg-purple-50 border-purple-100"
          iconClassName="text-purple-600"
        />
        <MetricCard 
          title="Active Users" 
          value="156" 
          description="12 new this month"
          icon={UserCheck}
          className="bg-amber-50 border-amber-100"
          iconClassName="text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportsList reports={reports} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Report Overview</CardTitle>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              View Calendar
            </Button>
          </CardHeader>
          <CardContent>
            <ReportOverview />
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
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

const reports = [
  {
    title: "Sales Report",
    description: "Detailed analysis of sales transactions",
    icon: BarChart2,
    href: "/reports/sales",
    color: "text-blue-600"
  },
  {
    title: "Purchase Report",
    description: "Summary of all purchase transactions",
    icon: TrendingUp,
    href: "/reports/purchase",
    color: "text-green-600"
  },
  {
    title: "E-Invoice",
    description: "Electronic invoicing report",
    icon: FileTextIcon,
    href: "/reports/e-invoice",
    color: "text-orange-600"
  },
  {
    title: "E-way Bills Report",
    description: "Track and manage e-way bills",
    icon: Truck,
    href: "/reports/e-way-bills",
    color: "text-amber-600"
  },
  {
    title: "Trading Account",
    description: "Trading performance analysis",
    icon: Store,
    href: "/reports/trading",
    color: "text-purple-600"
  },
  {
    title: "Profit & Loss Account",
    description: "Financial performance overview",
    icon: PieChart,
    href: "/reports/profit-loss",
    color: "text-indigo-600"
  },
  {
    title: "Capital Account ",
    description: "Overview of owner's equity and capital",
    icon: IndianRupee,
    href: "/reports/capital-account",
    color: "text-cyan-600"
  },
  {
    title: "Balance Sheet",
    description: "Complete financial position",
    icon: ClipboardList,
    href: "/reports/balance-sheet",
    color: "text-teal-600"
  },
  {
    title: "Edit Log Report",
    description: "Track all system modifications",
    icon: History,
    href: "/reports/edit-log",
    color: "text-red-600"
  },
  {
    title: "Login Report",
    description: "User access and activity logs",
    icon: UserCheck,
    href: "/reports/login",
    color: "text-gray-600"
  }
]

