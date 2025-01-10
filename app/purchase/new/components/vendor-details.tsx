import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function VendorDetails() {
  return (
    <div className="p-6 border-b">
      <div className="space-y-4">
        <h3 className="font-medium">Details of Supplier / Billed from:</h3>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Name</Label>
          <Input defaultValue="XYZ Suppliers Co." className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Address</Label>
          <Input defaultValue="789 Vendor Street, Suppliertown" className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">GSTIN</Label>
          <Input defaultValue="29ABCDE1234F1Z5" className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">State</Label>
          <Input defaultValue="Karnataka (Code: 29)" className="bg-gray-50" />
        </div>
      </div>
    </div>
  )
}

