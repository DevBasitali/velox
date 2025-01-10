"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment?: {
    id: string
    vendor: string
    date: string
    amount: string
    mode: string
    reference: string
    status: string
  } | null
}

interface Vendor {
  id: string;
  name: string;
  address: string;
}

const vendors: Vendor[] = [
  { id: "1", name: "Office Supplies Co.", address: "123 Main St, Anytown, USA" },
  { id: "2", name: "Tech Hardware Inc", address: "456 Elm St, Othertown, USA" },
  { id: "3", name: "Logistics Partners", address: "789 Oak St, Biztown, USA" },
];

export function PaymentModal({ open, onOpenChange, payment }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    id: "",
    modeOfPayment: "",
    voucherDate: "",
    paidTo: "",
    address: "",
    invoiceNo: "",
    invoiceDate: "",
    particulars: "",
    amount: "",
    reference: "",
    totalPaid: "",
    balanceDue: "",
    importantNotes: "",
  })

  useEffect(() => {
    if (payment) {
      setFormData({
        ...formData,
        id: payment.id,
        modeOfPayment: payment.mode,
        voucherDate: payment.date,
        paidTo: payment.vendor,
        amount: payment.amount,
        reference: payment.reference,
      })
    }
  }, [payment])

  useEffect(() => {
    const selectedVendor = vendors.find(v => v.id === formData.paidTo);
    if (selectedVendor) {
      setFormData(prev => ({ ...prev, address: selectedVendor.address }));
    }
  }, [formData.paidTo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="w-full text-center bg-emerald-600 text-white py-2 rounded-t-lg">
            {payment ? "Edit Payment" : "New Payment"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Mode of Payment</Label>
              <Select
                value={formData.modeOfPayment}
                onValueChange={(value) => setFormData(prev => ({ ...prev, modeOfPayment: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank">Bank</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Vch. Date</Label>
              <Input 
                type="date"
                value={formData.voucherDate}
                onChange={(e) => setFormData(prev => ({ ...prev, voucherDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Paid to</Label>
              <Select
                value={formData.paidTo}
                onValueChange={(value) => setFormData(prev => ({ ...prev, paidTo: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>{vendor.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Inv. No:</Label>
              <Input 
                placeholder="Prefix/__/Suffix"
                value={formData.invoiceNo}
                onChange={(e) => setFormData(prev => ({ ...prev, invoiceNo: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Inv. Date</Label>
              <Input 
                type="date"
                value={formData.invoiceDate}
                onChange={(e) => setFormData(prev => ({ ...prev, invoiceDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea 
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="resize-none"
              readOnly
            />
          </div>

          <div className="grid grid-cols-[1fr,auto] gap-4 bg-emerald-600 text-white p-2">
            <div>Particulars</div>
            <div>Amount</div>
          </div>

          <div className="grid grid-cols-[1fr,auto] gap-4">
            <Input 
              value={formData.particulars}
              onChange={(e) => setFormData(prev => ({ ...prev, particulars: e.target.value }))}
            />
            <Input 
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="w-[200px]"
            />
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="grid grid-cols-[1fr,auto] gap-4">
            <div className="space-y-2">
              <Label>Reference:</Label>
              <Input 
                value={formData.reference}
                onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>TOTAL PAID:</Label>
              <Input 
                type="number"
                value={formData.totalPaid}
                onChange={(e) => setFormData(prev => ({ ...prev, totalPaid: e.target.value }))}
                className="w-[200px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-red-500">BALANCE DUE:</Label>
            <Input 
              type="number"
              value={formData.balanceDue}
              onChange={(e) => setFormData(prev => ({ ...prev, balanceDue: e.target.value }))}
              className="w-[200px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Important Notes:</Label>
            <Textarea 
              value={formData.importantNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, importantNotes: e.target.value }))}
              className="resize-none h-24 bg-yellow-50"
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <div>
              <div>For - M/s ABC & Co</div>
              <div className="mt-4">Authorised Person</div>
            </div>
            <div className="space-x-2">
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                {payment ? "Update" : "Save"}
              </Button>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

