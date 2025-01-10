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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

interface JournalVoucherModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  voucher?: {
    referenceNo: string
    jvNo: string
    date: string
    currency: string
    entries: JournalEntry[]
    narration: string
    importantNotes: string
  } | null
}

interface JournalEntry {
  accountCode: string
  particulars: string
  debitRs: number
  creditRs: number
  type: "by" | "to"
}

const defaultEntry: JournalEntry = {
  accountCode: "",
  particulars: "",
  debitRs: 0,
  creditRs: 0,
  type: "by"
}

export function JournalVoucherModal({ open, onOpenChange, voucher }: JournalVoucherModalProps) {
  const [formData, setFormData] = useState({
    referenceNo: "",
    jvNo: "",
    date: "",
    currency: "INR",
    entries: [defaultEntry],
    narration: "",
    importantNotes: "All entries must be supported by valid documents"
  })

  useEffect(() => {
    if (voucher) {
      setFormData(voucher)
    }
  }, [voucher])


  const removeEntry = (index: number) => {
    setFormData(prev => ({
      ...prev,
      entries: prev.entries.filter((_, i) => i !== index)
    }))
  }

  const updateEntry = (index: number, field: keyof JournalEntry, value: string | number) => {
    setFormData(prev => {
      const updatedEntries = prev.entries.map((entry, i) => {
        if (i === index) {
          if (field === 'type') {
            const newType = value as "by" | "to"
            return {
              ...entry,
              type: newType,
              debitRs: newType === "by" ? entry.debitRs : 0,
              creditRs: newType === "to" ? entry.creditRs : 0
            }
          }
          if (field === 'debitRs' && entry.type === "by") {
            return { ...entry, [field]: value, creditRs: 0 }
          }
          if (field === 'creditRs' && entry.type === "to") {
            return { ...entry, [field]: value, debitRs: 0 }
          }
          return { ...entry, [field]: value }
        }
        return entry
      })

      // Check if the last row is filled and add a new row if necessary
      const lastEntry = updatedEntries[updatedEntries.length - 1]
      if (
        lastEntry.accountCode &&
        lastEntry.particulars &&
        (lastEntry.debitRs > 0 || lastEntry.creditRs > 0)
      ) {
        updatedEntries.push(defaultEntry)
      }

      return { ...prev, entries: updatedEntries }
    })
  }

  const calculateTotals = () => {
    return formData.entries.reduce(
      (acc, entry) => ({
        debitTotal: acc.debitTotal + (entry.debitRs || 0),
        creditTotal: acc.creditTotal + (entry.creditRs || 0)
      }),
      { debitTotal: 0, creditTotal: 0 }
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { debitTotal, creditTotal } = calculateTotals()
    
    if (debitTotal !== creditTotal) {
      toast({
        title: "Validation Error",
        description: "Total debit must equal total credit. Please check your entries.",
        variant: "destructive"
      })
      return
    }
    
    console.log(formData)
    onOpenChange(false)
  }

  const { debitTotal, creditTotal } = calculateTotals()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-red-600 pb-4">
            Journal Voucher
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Reference No:</Label>
              <Input
                value={formData.referenceNo}
                onChange={(e) => setFormData(prev => ({ ...prev, referenceNo: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>JV NO:</Label>
              <Input
                value={formData.jvNo}
                onChange={(e) => setFormData(prev => ({ ...prev, jvNo: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Date:</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Currency:</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Account Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Particulars</TableHead>
                  <TableHead className="text-right">Debit Rs.</TableHead>
                  <TableHead className="text-right">Credit Rs.</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.entries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={entry.accountCode}
                        onChange={(e) => updateEntry(index, 'accountCode', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={entry.type}
                        onValueChange={(value: "by" | "to") => updateEntry(index, 'type', value)}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="by">By</SelectItem>
                          <SelectItem value="to">To</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.particulars}
                        onChange={(e) => updateEntry(index, 'particulars', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="text-right"
                        value={entry.debitRs || ''}
                        onChange={(e) => updateEntry(index, 'debitRs', parseFloat(e.target.value) || 0)}
                        disabled={entry.type === "to"}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="text-right"
                        value={entry.creditRs || ''}
                        onChange={(e) => updateEntry(index, 'creditRs', parseFloat(e.target.value) || 0)}
                        disabled={entry.type === "by"}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEntry(index)}
                        className="hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {debitTotal.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {creditTotal.toFixed(2)}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {debitTotal !== creditTotal && (
            <div className="text-red-600 text-center mt-2">
              Total debit must equal total credit (Difference: {Math.abs(debitTotal - creditTotal).toFixed(2)})
            </div>
          )}


          <div className="space-y-2">
            <Label>Narration:</Label>
            <Textarea
              value={formData.narration}
              onChange={(e) => setFormData(prev => ({ ...prev, narration: e.target.value }))}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Important Notes:</Label>
            <Textarea
              value={formData.importantNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, importantNotes: e.target.value }))}
              className="resize-none bg-yellow-50"
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <div>
              <div>For - M/s ABC & Co</div>
              <div className="mt-4">Authorized Person</div>
            </div>
            <div className="space-x-2">
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                {voucher ? "Update" : "Save"}
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

