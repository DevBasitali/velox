"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Building2, IndianRupee, Package, BanknoteIcon as Bank, Search, FileEdit } from 'lucide-react'
import { EditBusinessModal } from "./components/edit-business-modal"
import Image from "next/image"

export default function BusinessMaster() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Business Master</h1>
        <Button 
          onClick={() => setIsEditModalOpen(true)} 
          className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
        >
          <FileEdit className="h-4 w-4" />
          Edit Business Details
        </Button>
      </div>
      
      {/* Company Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-[250px,1fr] gap-6">
            <div className="space-y-4">
              <div className="aspect-square relative rounded-lg border overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=250"
                  alt="Company Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsEditModalOpen(true)}
              >
                Change Logo
              </Button>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Morrison Industries Ltd</h2>
                <p className="text-gray-600">Excellence in Manufacturing</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-1 text-sm">
                    <p>123 Business Street</p>
                    <p>Mumbai, Maharashtra 400001</p>
                    <p>India</p>
                    <p>Contact: +91 22 1234 5678</p>
                    <p>Email: info@morrison.com</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Business Details</h3>
                  <div className="space-y-1 text-sm">
                    <p>GST No: 27AADCB2230M1Z2</p>
                    <p>PAN: AADCB2230M</p>
                    <p>CIN: U12345MH2020PLC123456</p>
                    <p>Business Type: Manufacturing</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Bank Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1 text-sm">
                    <p>Bank Name: HDFC Bank</p>
                    <p>Account No: XXXX-XXXX-XXXX-1234</p>
                    <p>IFSC Code: HDFC0001234</p>
                    <p>Branch: Mumbai Main Branch</p>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>UPI ID: morrison@hdfcbank</p>
                    <p>Swift Code: HDFCINBB</p>
                    <p>Account Type: Current</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Business Value" 
          value="₹3.76M" 
          description="+14.2% from last month"
          icon={Building2}
          className="bg-purple-50 border-purple-100"
          iconClassName="text-purple-600"
        />
        <MetricCard 
          title="Revenue" 
          value="₹892.5K" 
          description="Current Month"
          icon={IndianRupee}
          className="bg-blue-50 border-blue-100"
          iconClassName="text-blue-600"
        />
        <MetricCard 
          title="Stock Value" 
          value="₹235.2K" 
          description="In hand"
          icon={Package}
          className="bg-green-50 border-green-100"
          iconClassName="text-green-600"
        />
        <MetricCard 
          title="Bank Balance" 
          value="₹523.8K" 
          description="Available"
          icon={Bank}
          className="bg-amber-50 border-amber-100"
          iconClassName="text-amber-600"
        />
      </div>

      {/* Search and Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Business Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search documents..." className="pl-8" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-gray-500">{doc.date}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{doc.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      doc.status === 'Valid' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {doc.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      Expires: {doc.expires}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <EditBusinessModal 
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
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
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

const documents = [
  {
    id: 1,
    name: "GST Registration Certificate",
    date: "Issued: Jan 15, 2024",
    description: "Certificate of Registration under Goods and Services Tax Act",
    status: "Valid",
    expires: "N/A"
  },
  {
    id: 2,
    name: "PAN Card",
    date: "Issued: Dec 10, 2023",
    description: "Permanent Account Number Card issued by Income Tax Department",
    status: "Valid",
    expires: "N/A"
  },
  {
    id: 3,
    name: "Trade License",
    date: "Issued: Mar 01, 2024",
    description: "Municipal Corporation Trade License",
    status: "Valid",
    expires: "Feb 28, 2025"
  },
  {
    id: 4,
    name: "Factory License",
    date: "Issued: Jan 01, 2024",
    description: "License under Factories Act",
    status: "Valid",
    expires: "Dec 31, 2024"
  },
  {
    id: 5,
    name: "ISO 9001:2015",
    date: "Issued: Jun 15, 2023",
    description: "Quality Management System Certification",
    status: "Valid",
    expires: "Jun 14, 2026"
  },
  {
    id: 6,
    name: "Environmental Clearance",
    date: "Issued: Apr 01, 2023",
    description: "Environmental Compliance Certificate",
    status: "Renewal Required",
    expires: "Mar 31, 2024"
  }
]

