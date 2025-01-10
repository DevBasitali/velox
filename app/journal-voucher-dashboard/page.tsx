"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, BookOpen, BarChart2, Calendar, FileText, Users2 } from 'lucide-react'
import { JournalVoucherTable } from "./components/journal-voucher-table"
import { JournalVoucherModal } from "./components/journal-voucher-modal"

export default function JournalVoucherDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Journal Voucher Dashboard</h1>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-red-600 hover:bg-red-700"
        >
          New Journal Voucher
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Vouchers" 
          value="1,234" 
          description="+8.1% from last month"
          icon={BookOpen}
          className="bg-red-50 border-red-100"
          iconClassName="text-red-600"
        />
        <MetricCard 
          title="Today's Entries" 
          value="42" 
          description="15 vouchers created today"
          icon={FileText}
          className="bg-blue-50 border-blue-100"
          iconClassName="text-blue-600"
        />
        <MetricCard 
          title="Pending Approvals" 
          value="18" 
          description="5 high priority"
          icon={Calendar}
          className="bg-amber-50 border-amber-100"
          iconClassName="text-amber-600"
        />
        <MetricCard 
          title="Active Users" 
          value="56" 
          description="8 new this month"
          icon={Users2}
          className="bg-purple-50 border-purple-100"
          iconClassName="text-purple-600"
        />
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Journal Vouchers</CardTitle>
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            View Reports
          </Button>
        </CardHeader>
        <CardContent>
          <JournalVoucherTable data={journalVoucherData} />
        </CardContent>
      </Card>

      <JournalVoucherModal 
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

const journalVoucherData = [
  {
    voucherNo: "JV-001",
    date: "2024-01-15",
    accountCode: "1001",
    particulars: "Cash A/C",
    debitRs: "10,000",
    creditRs: "0",
    narration: "Being sales recorded for the day"
  },
  {
    voucherNo: "JV-002",
    date: "2024-01-14",
    accountCode: "2001",
    particulars: "Sales A/C",
    debitRs: "0",
    creditRs: "15,000",
    narration: "Monthly rent payment"
  },
  {
    voucherNo: "JV-003",
    date: "2024-01-14",
    accountCode: "3001",
    particulars: "Expense A/C",
    debitRs: "5,000",
    creditRs: "0",
    narration: "Office supplies purchase"
  },
  {
    voucherNo: "JV-004",
    date: "2024-01-13",
    accountCode: "4001",
    particulars: "Bank A/C",
    debitRs: "0",
    creditRs: "8,000",
    narration: "Utility bill payment"
  },
  {
    voucherNo: "JV-005",
    date: "2024-01-13",
    accountCode: "5001",
    particulars: "Interest A/C",
    debitRs: "2,500",
    creditRs: "0",
    narration: "Interest income recorded"
  }
]

