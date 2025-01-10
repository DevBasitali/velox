import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CustomerDetails() {
  return (
    <div className="grid grid-cols-2 gap-6 p-6 border-b">
      <div className="space-y-4">
        <h3 className="font-medium">Details of Receiver / Billed to:</h3>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Name</Label>
          <Input defaultValue="ABC Trading Co." className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Address</Label>
          <Input defaultValue="456 Market Road, Delhi" className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">GSTIN</Label>
          <Input defaultValue="07AADFV2345R1Z5" className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">State</Label>
          <Input defaultValue="Delhi (Code: 07)" className="bg-gray-50" />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-medium">Details of Consignee / Shipped to:</h3>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Name</Label>
          <Input defaultValue="ABC Trading Co." className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Address</Label>
          <Input defaultValue="456 Market Road, Delhi" className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">GSTIN</Label>
          <Input defaultValue="07AADFV2345R1Z5" className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">State</Label>
          <Input defaultValue="Delhi (Code: 07)" className="bg-gray-50" />
        </div>
      </div>
    </div>
  )
}

