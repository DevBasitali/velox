interface TaxSummaryProps {
  totals: {
    taxableValue: number
    igst: number
    cgst: number
    sgst: number
    total: number
  }
}

export function TaxSummary({ totals }: TaxSummaryProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg w-full max-w-md">
      <h3 className="font-medium mb-4">Tax Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Taxable Value</span>
          <span>₹{totals.taxableValue.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Add: IGST</span>
          <span>₹{totals.igst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Add: CGST</span>
          <span>₹{totals.cgst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Add: SGST</span>
          <span>₹{totals.sgst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Invoice Value</span>
          <span>₹{totals.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Add: TDS/TCS</span>
          <span>₹0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Add: Others</span>
          <span>₹0.00</span>
        </div>
        <div className="flex justify-between font-medium pt-2 border-t">
          <span>Gross Total</span>
          <span>₹{totals.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

