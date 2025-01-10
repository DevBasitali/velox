"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

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
  const [tdsPercentage, setTdsPercentage] = useState(0)
  const [othersPercentage, setOthersPercentage] = useState(0)

  const calculateTdsAmount = () => {
    return (totals.total * tdsPercentage) / 100
  }

  const calculateOthersAmount = () => {
    return (totals.total * othersPercentage) / 100
  }

  const calculateGrossTotal = () => {
    return totals.total + calculateTdsAmount() + calculateOthersAmount()
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Tax Summary</h3>
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
        <div className="flex justify-between items-center">
          <span>Add: TDS/TCS</span>
          <div className="flex items-center gap-2">
            <select
              value={tdsPercentage}
              onChange={(e) => setTdsPercentage(Number(e.target.value))}
              className={cn(
                "h-9 w-[80px] rounded-md border border-input bg-background px-3 py-1",
                "text-sm shadow-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              )}
            >
              <option value="0">0%</option>
              <option value="0.1">0.1%</option>
              <option value="1">1%</option>
              <option value="2">2%</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
            </select>
            <span>₹{calculateTdsAmount().toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>Add: Others</span>
          <div className="flex items-center gap-2">
            <select
              value={othersPercentage}
              onChange={(e) => setOthersPercentage(Number(e.target.value))}
              className={cn(
                "h-9 w-[80px] rounded-md border border-input bg-background px-3 py-1",
                "text-sm shadow-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              )}
            >
              <option value="0">0%</option>
              <option value="1">1%</option>
              <option value="2">2%</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
            </select>
            <span>₹{calculateOthersAmount().toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between pt-2 border-t">
          <span className="font-medium">Gross Total</span>
          <span className="font-medium">₹{calculateGrossTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

