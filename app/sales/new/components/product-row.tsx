import { useState, useEffect } from "react"
import { TableCell, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from 'lucide-react'
import { ProductOption } from "../data/products"

interface Product {
  id: number
  productId: string
  name: string
  remarks: string
  hsn: string
  uom: string
  qty: number
  rate: number
  amount: number
  discounts: number
  taxableValue: number
  taxRate: number
  igst: number
  cgst: number
  sgst: number
  total: number
}

interface ProductRowProps {
  product: Product
  index: number
  productOptions: ProductOption[]
  onUpdate: (product: Product) => void
  onRemove: () => void
}

export function ProductRow({ product, index, productOptions, onUpdate, onRemove }: ProductRowProps) {
  const [localProduct, setLocalProduct] = useState(product)

  useEffect(() => {
    calculateValues()
  }, [localProduct.qty, localProduct.rate, localProduct.discounts, localProduct.taxRate, localProduct.total])

  const calculateValues = () => {
    let amount = localProduct.qty * localProduct.rate
    let taxableValue = amount - localProduct.discounts

    // If total is changed, recalculate rate and amount
    if (localProduct.total !== 0 && localProduct.total !== amount + (taxableValue * localProduct.taxRate / 100)) {
      const totalBeforeTax = localProduct.total / (1 + localProduct.taxRate / 100)
      taxableValue = totalBeforeTax
      amount = taxableValue + localProduct.discounts
      localProduct.rate = Math.round(amount / localProduct.qty)
    }

    const tax = Math.round((taxableValue * localProduct.taxRate) / 100)
    const total = taxableValue + tax

    setLocalProduct(prev => ({
      ...prev,
      amount: Number(amount.toFixed(2)),
      taxableValue: Number(taxableValue.toFixed(2)),
      igst: Math.round(tax),
      cgst: 0,
      sgst: 0,
      total: Number(total.toFixed(2)),
      rate: Math.round(prev.rate),
      qty: Math.round(prev.qty),
      taxRate: Math.round(prev.taxRate)
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'remarks' || name === 'hsn' || name === 'uom') {
      setLocalProduct(prev => ({ ...prev, [name]: value }))
    } else {
      const numValue = parseFloat(value)
      setLocalProduct(prev => ({ 
        ...prev, 
        [name]: isNaN(numValue) ? 0 : 
          ['taxRate', 'igst', 'cgst', 'sgst', 'rate', 'qty'].includes(name) ? 
          Math.round(numValue) : 
          Number(numValue.toFixed(2))
      }))
    }
  }

  const handleProductSelect = (productId: string) => {
    const selectedProduct = productOptions.find(p => p.id === productId)
    if (selectedProduct) {
      setLocalProduct(prev => ({
        ...prev,
        productId,
        name: selectedProduct.name,
        hsn: selectedProduct.hsn,
        uom: selectedProduct.uom,
        rate: Number(selectedProduct.rate.toFixed(2))
      }))
    }
  }

  useEffect(() => {
    onUpdate(localProduct)
  }, [localProduct])

  return (
    <TableRow>
      <TableCell className="align-top">{index + 1}</TableCell>
      <TableCell>
        <div className="space-y-2">
          <Select value={localProduct.productId} onValueChange={handleProductSelect} className="w-full h-8">
            <SelectTrigger>
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {productOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            name="remarks"
            value={localProduct.remarks}
            onChange={handleInputChange}
            placeholder="Item Note..."
            className="min-h-[40px] bg-yellow-50 w-full py-1 px-2"
          />
        </div>
      </TableCell>
      <TableCell className="align-top">
        <Input name="hsn" value={localProduct.hsn} onChange={handleInputChange} className="w-full h-8 px-2 min-w-[100px]" />
      </TableCell>
      <TableCell className="align-top">
        <Input name="uom" value={localProduct.uom} onChange={handleInputChange} className="w-full h-8 px-2 min-w-[100px]" />
      </TableCell>
      <TableCell className="align-top">
        <Input type="number" name="qty" value={Math.round(localProduct.qty)} onChange={handleInputChange} className="w-full h-8 px-2 min-w-[100px]" />
      </TableCell>
      <TableCell className="align-top">
        <Input type="number" name="rate" value={Math.round(localProduct.rate)} onChange={handleInputChange} className="w-full h-8 px-2 min-w-[100px]" />
      </TableCell>
      <TableCell className="align-top">
        <Input type="number" name="amount" value={localProduct.amount.toFixed(2)} onChange={handleInputChange} className="w-full h-8 px-2 min-w-[100px]" step="0.01" />
      </TableCell>
      <TableCell className="align-top">
        <Input type="number" name="discounts" value={localProduct.discounts.toFixed(2)} onChange={handleInputChange} className="w-full h-8 px-2 min-w-[100px]" step="0.01" />
      </TableCell>
      <TableCell className="align-top">
        <Input type="number" name="taxableValue" value={localProduct.taxableValue.toFixed(2)} onChange={handleInputChange} className="w-full h-8 px-2 min-w-[100px]" step="0.01" />
      </TableCell>
      <TableCell className="align-top">
        <Input type="number" name="taxRate" value={Math.round(localProduct.taxRate)} onChange={handleInputChange} className="w-full h-8 px-2 min-w-[100px]" />
      </TableCell>
      <TableCell className="align-top">
        <Input type="number" name="igst" value={Math.round(localProduct.igst)} onChange={handleInputChange} className="w-full h-8 px-2 min-w-[100px]" />
      </TableCell>
      <TableCell className="align-top">
        <Input type="number" name="cgst" value={Math.round(localProduct.cgst)} onChange={handleInputChange} className="w-full h-8 px-2 min-w-[100px]" />
      </TableCell>
      <TableCell className="align-top">
        <Input type="number" name="sgst" value={Math.round(localProduct.sgst)} onChange={handleInputChange} className="w-full h-8 px-2 min-w-[100px]" />
      </TableCell>
      <TableCell className="align-top">
        <Input type="number" name="total" value={localProduct.total.toFixed(2)} onChange={handleInputChange} className="w-full h-8 px-2 min-w-[100px]" step="0.01" />
      </TableCell>
      <TableCell className="align-top">
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

