import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PaymentDetails() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Total Invoice Amount in Words:</h3>
        <p className="text-sm">Seventy Thousand Three Hundred Twenty Eight Only</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Payment Details:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Amount received in Cash</Label>
            <Input defaultValue="₹59600.00" className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Amount received in bank account</Label>
            <Input defaultValue="ABCD Bank" className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">UPI/NEFT/RTGS/CARD</Label>
            <Input defaultValue="₹23456.00" className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Balance Outstanding</Label>
            <Input defaultValue="₹12345.00" className="bg-gray-50" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Bank Details:</h3>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Bank Name</Label>
              <Input defaultValue="ABCD" className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Account Number</Label>
              <Input defaultValue="XXXXXXXX" className="bg-gray-50" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">IFSC Code</Label>
            <Input defaultValue="ABCD00001234" className="bg-gray-50" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Terms and Conditions:</h3>
        <ol className="list-decimal list-inside text-sm space-y-1 text-gray-600">
          <li>Payment is due within 30 days</li>
          <li>Goods once sold cannot be returned</li>
          <li>Subject to local jurisdiction</li>
        </ol>
      </div>
    </div>
  )
}

