import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Printer, Download, Share2 } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

interface ViewJournalVoucherModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  voucher: {
    referenceNo: string
    jvNo: string
    date: string
    currency: string
    entries: {
      accountCode: string
      particulars: string
      debitRs: number
      creditRs: number
      type: "by" | "to"
    }[]
    narration: string
    importantNotes: string
  } | null
}

export function ViewJournalVoucherModal({ open, onOpenChange, voucher }: ViewJournalVoucherModalProps) {
  const printRef = useRef<HTMLDivElement>(null)

  if (!voucher) return null

  const handlePrint = () => {
    const printContent = printRef.current
    if (printContent) {
      const originalContents = document.body.innerHTML
      document.body.innerHTML = printContent.innerHTML
      window.print()
      document.body.innerHTML = originalContents
    }
  }

  const totalDebit = voucher.entries.reduce((sum, entry) => sum + entry.debitRs, 0)
  const totalCredit = voucher.entries.reduce((sum, entry) => sum + entry.creditRs, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left sidebar */}
          <div className="w-64 bg-red-700 p-6 text-white">
            <div className="mb-8">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Company Logo"
                width={80}
                height={80}
                className="mb-4"
              />
              <h2 className="text-2xl font-bold">ABC & Co</h2>
              <p className="text-sm opacity-75">Business Management</p>
            </div>
            <nav className="space-y-4">
              <Button variant="ghost" className="w-full justify-start text-white hover:text-red-200 hover:bg-red-600" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" /> Print Voucher
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:text-red-200 hover:bg-red-600">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:text-red-200 hover:bg-red-600">
                <Share2 className="mr-2 h-4 w-4" /> Share Voucher
              </Button>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8" ref={printRef}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-red-600 mb-2">Journal Voucher</h1>
                  <p className="text-sm text-gray-500">#{voucher.jvNo}</p>
                </div>
                <Button
                  onClick={() => onOpenChange(false)}
                  variant="ghost"
                  className="rounded-full p-2 hover:bg-gray-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden mb-8">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Account Code</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Type</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Particulars</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Debit Rs.</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Credit Rs.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {voucher.entries.map((entry, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">{entry.accountCode}</td>
                        <td className="px-4 py-2">{entry.type}</td>
                        <td className="px-4 py-2">{entry.particulars}</td>
                        <td className="px-4 py-2 text-right">{entry.debitRs.toFixed(2)}</td>
                        <td className="px-4 py-2 text-right">{entry.creditRs.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-medium">
                      <td className="px-4 py-2" colSpan={3}>Total</td>
                      <td className="px-4 py-2 text-right">{totalDebit.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right">{totalCredit.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {totalDebit !== totalCredit && (
                <div className="text-red-600 text-center mb-4">
                  Warning: Total debit does not equal total credit (Difference: {Math.abs(totalDebit - totalCredit).toFixed(2)})
                </div>
              )}

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Narration</h3>
                  <p className="text-sm">{voucher.narration}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Important Notes</h3>
                  <p className="text-sm text-red-600">{voucher.importantNotes}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-8 border-t">
                <div>
                  <p className="text-sm text-gray-500">Authorized Person</p>
                  <div className="mt-8 border-t border-dashed w-40"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Accountant</p>
                  <div className="mt-8 border-t border-dashed w-40"></div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500 mt-8">
                <p>This is a computer-generated document and does not require a signature.</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

