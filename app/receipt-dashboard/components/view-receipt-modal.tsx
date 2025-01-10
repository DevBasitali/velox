import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Printer, Download, Share2 } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

interface ViewReceiptModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  receipt: {
    id: string
    customer: string
    customerAddress: string
    customerContact: string
    date: string
    amount: string
    mode: string
    narration: string
    invoiceNo: string
    invoiceDate: string
    balanceDue: string
    companyName: string
    companyAddress: string
    companyContact: string
    companyLogo: string
  } | null
}

export function ViewReceiptModal({ open, onOpenChange, receipt }: ViewReceiptModalProps) {
  const printRef = useRef<HTMLDivElement>(null)

  if (!receipt) {
    receipt = {
      id: "RCP-001",
      customer: "John Doe",
      customerAddress: "123 Main St, Anytown, USA",
      customerContact: "+1 234-567-8900",
      date: "2024-01-15",
      amount: "5,000.00",
      mode: "Bank Transfer",
      narration: "Payment for Invoice INV-2024-001",
      invoiceNo: "INV-2024-001",
      invoiceDate: "2024-01-10",
      balanceDue: "5,000.00",
      companyName: "Morrison Industries Ltd",
      companyAddress: "456 Business Ave, Metropolis, USA",
      companyContact: "info@morrison.com | +91 22 1234 5678",
      companyLogo: "/placeholder.svg?height=64&width=64"
    }
  }

  const handlePrint = () => {
    const printContent = printRef.current
    if (printContent) {
      const originalContents = document.body.innerHTML
      document.body.innerHTML = printContent.innerHTML
      window.print()
      document.body.innerHTML = originalContents
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left sidebar */}
          <div className="w-64 bg-purple-700 p-6 text-white">
            <div className="mb-8">
              <Image
                src={receipt.companyLogo}
                alt="Company Logo"
                width={80}
                height={80}
                className="mb-4"
              />
              <h2 className="text-2xl font-bold">{receipt.companyName}</h2>
              <p className="text-sm opacity-75">Excellence in Manufacturing</p>
            </div>
            <nav className="space-y-4">
              <Button variant="ghost" className="w-full justify-start text-white hover:text-purple-200 hover:bg-purple-600" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" /> Print Receipt
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:text-purple-200 hover:bg-purple-600">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:text-purple-200 hover:bg-purple-600">
                <Share2 className="mr-2 h-4 w-4" /> Share Receipt
              </Button>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8" ref={printRef}>
              {/* Company Information Header */}
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-purple-700 mb-2">{receipt.companyName}</h2>
                    <p className="text-sm text-gray-600">{receipt.companyAddress}</p>
                    <p className="text-sm text-gray-600">{receipt.companyContact}</p>
                  </div>
                  <Button
                    onClick={() => onOpenChange(false)}
                    variant="ghost"
                    className="rounded-full p-2 hover:bg-gray-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Receipt</h1>
                  <p className="text-sm text-gray-500">#{receipt.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Issued To</h3>
                  <p className="font-medium">{receipt.customer}</p>
                  <p className="text-sm text-gray-600">{receipt.customerAddress}</p>
                  <p className="text-sm text-gray-600">{receipt.customerContact}</p>
                </div>
                <div className="text-right">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Receipt Details</h3>
                  <p className="font-medium">Date: {receipt.date}</p>
                  <p className="text-sm text-gray-600">Invoice: {receipt.invoiceNo}</p>
                  <p className="text-sm text-gray-600">Invoice Date: {receipt.invoiceDate}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Payment Details</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Paid
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
                    <p className="text-2xl font-bold text-gray-900">₹{receipt.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                    <p className="font-medium">{receipt.mode}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Narration</p>
                    <p className="text-sm">{receipt.narration}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8 mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Balance Due</p>
                    <p className="text-xl font-bold text-red-600">₹{receipt.balanceDue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Next Payment Due</p>
                    <p className="font-medium">February 15, 2024</p>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500 mt-8">
                <p>This is a computer-generated receipt and does not require a signature.</p>
                <p className="mt-2">
                  For any queries, please contact us at {receipt.companyContact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

