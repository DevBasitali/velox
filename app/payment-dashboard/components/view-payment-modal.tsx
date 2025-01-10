import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Printer, Download, Share2 } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

interface ViewPaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment: {
    id: string
    vendor: string
    vendorAddress: string
    vendorContact: string
    date: string
    amount: string
    mode: string
    reference: string
    invoiceNo: string
    invoiceDate: string
    balanceDue: string
    companyName: string
    companyAddress: string
    companyContact: string
    companyLogo: string
  } | null
}

export function ViewPaymentModal({ open, onOpenChange, payment }: ViewPaymentModalProps) {
  const printRef = useRef<HTMLDivElement>(null)

  if (!payment) {
    payment = {
      id: "PAY-001",
      vendor: "Office Supplies Co.",
      vendorAddress: "123 Main St, Anytown, USA",
      vendorContact: "+1 234-567-8900",
      date: "2024-01-15",
      amount: "12,500.00",
      mode: "Bank Transfer",
      reference: "UTR987654",
      invoiceNo: "INV-2024-001",
      invoiceDate: "2024-01-10",
      balanceDue: "0.00",
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
          <div className="w-64 bg-emerald-700 p-6 text-white">
            <div className="mb-8">
              <Image
                src={payment.companyLogo}
                alt="Company Logo"
                width={80}
                height={80}
                className="mb-4"
              />
              <h2 className="text-2xl font-bold">{payment.companyName}</h2>
              <p className="text-sm opacity-75">Excellence in Manufacturing</p>
            </div>
            <nav className="space-y-4">
              <Button variant="ghost" className="w-full justify-start text-white hover:text-emerald-200 hover:bg-emerald-600" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" /> Print Payment
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:text-emerald-200 hover:bg-emerald-600">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:text-emerald-200 hover:bg-emerald-600">
                <Share2 className="mr-2 h-4 w-4" /> Share Payment
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
                    <h2 className="text-2xl font-bold text-emerald-700 mb-2">{payment.companyName}</h2>
                    <p className="text-sm text-gray-600">{payment.companyAddress}</p>
                    <p className="text-sm text-gray-600">{payment.companyContact}</p>
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

              {/* Company Information Header */}
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-700 mb-2">Morrison Industries Ltd</h2>
                    <p className="text-sm text-gray-600">123 Business Street, Industrial Area</p>
                    <p className="text-sm text-gray-600">Mumbai, Maharashtra 400001</p>
                    <p className="text-sm text-gray-600">info@morrison.com | +91 22 1234 5678</p>
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment</h1>
                  <p className="text-sm text-gray-500">#{payment.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Paid To</h3>
                  <p className="font-medium">{payment.vendor}</p>
                  <p className="text-sm text-gray-600">{payment.vendorAddress}</p>
                  <p className="text-sm text-gray-600">{payment.vendorContact}</p>
                </div>
                <div className="text-right">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Payment Details</h3>
                  <p className="font-medium">Date: {payment.date}</p>
                  <p className="text-sm text-gray-600">Invoice: {payment.invoiceNo}</p>
                  <p className="text-sm text-gray-600">Invoice Date: {payment.invoiceDate}</p>
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
                    <p className="text-2xl font-bold text-gray-900">₹{payment.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                    <p className="font-medium">{payment.mode}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Reference</p>
                    <p className="text-sm">{payment.reference}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8 mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Balance Due</p>
                    <p className="text-xl font-bold text-red-600">₹{payment.balanceDue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Next Payment Due</p>
                    <p className="font-medium">N/A</p>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500 mt-8">
                <p>This is a computer-generated payment receipt and does not require a signature.</p>
                <p className="mt-2">
                  For any queries, please contact us at {payment.companyContact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

