import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PaymentDetails() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Total Invoice Amount in Words:</h3>
        <p className="text-sm">Seventy Thousand Three Hundred Twenty Eight Only</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium">Terms and Conditions:</h3>
        <ol className="list-decimal list-inside text-sm space-y-1 text-gray-600">
          <li>Payment is due within 30 days</li>
          <li>Goods once received cannot be returned</li>
          <li>Subject to local jurisdiction</li>
        </ol>
      </div>
    </div>
  )
}

