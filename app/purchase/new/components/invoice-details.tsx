import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InvoiceDetails() {
  return (
    <div className="grid grid-cols-2 gap-8 p-6 border-b">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Invoice No</Label>
          <Input defaultValue="PUR/2024-001" className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Invoice Date</Label>
          <Input type="date" defaultValue="2024-01-01" className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">E-Way Bill No.</Label>
          <Input defaultValue="27AADCB2230M1Z2" className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">E-Way Bill  Date</Label>
          <Input type="date" defaultValue="2024-01-01" className="bg-gray-50" />
        </div>
      </div>
    </div>
  )
}

