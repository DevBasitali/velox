"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: number
  productId: string
  name: string
  remarks: string
  hsn: string
  uom: string
  qty: string
  rate: string
  amount: string
  discounts: string
  taxableValue: string
  taxRate: string
  igst: string
  cgst: string
  sgst: string
  total: string
}

const defaultProduct: Product = {
  id: 0,
  productId: "",
  name: "",
  remarks: "",
  hsn: "",
  uom: "",
  qty: "",
  rate: "",
  amount: "",
  discounts: "",
  taxableValue: "",
  taxRate: "18",
  igst: "",
  cgst: "",
  sgst: "",
  total: ""
}

export function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([{ ...defaultProduct, id: 1 }])

  const hasData = (product: Product) => {
    return product.productId !== "" || 
           parseFloat(product.qty) !== 0 || 
           parseFloat(product.total) !== 0
  }

  const calculateValues = (product: Product): Product => {
    let updatedProduct = { ...product }
    const qty = parseFloat(updatedProduct.qty) || 0
    const rate = parseFloat(updatedProduct.rate) || 0
    const total = parseFloat(updatedProduct.total) || 0
    const discounts = parseFloat(updatedProduct.discounts) || 0
    const taxRate = parseFloat(updatedProduct.taxRate) || 0

    if (total > 0) {
      // Reverse calculation starting from total
      const taxableValue = (total * 100) / (100 + taxRate)
      updatedProduct.taxableValue = taxableValue.toFixed(2)
      updatedProduct.amount = (taxableValue + discounts).toFixed(2)
      
      if (qty > 0) {
        updatedProduct.rate = (parseFloat(updatedProduct.amount) / qty).toFixed(2)
      }
      
      const gst = total - taxableValue
      updatedProduct.igst = gst.toFixed(2)
      updatedProduct.cgst = (gst / 2).toFixed(2)
      updatedProduct.sgst = (gst / 2).toFixed(2)
    } else {
      // Forward calculation
      const amount = qty * rate
      updatedProduct.amount = amount.toFixed(2)
      const taxableValue = amount - discounts
      updatedProduct.taxableValue = taxableValue.toFixed(2)
      const gst = (taxableValue * taxRate) / 100
      updatedProduct.igst = gst.toFixed(2)
      updatedProduct.cgst = (gst / 2).toFixed(2)
      updatedProduct.sgst = (gst / 2).toFixed(2)
      updatedProduct.total = (taxableValue + gst).toFixed(2)
    }

    return updatedProduct
  }

  const updateProduct = (index: number, field: keyof Product, value: string) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts]
      let updatedProduct = { ...updatedProducts[index], [field]: value }
      updatedProduct = calculateValues(updatedProduct)
      updatedProducts[index] = updatedProduct

      if (index === updatedProducts.length - 1 && hasData(updatedProduct)) {
        updatedProducts.push({ ...defaultProduct, id: updatedProducts.length + 1 })
      }

      return updatedProducts
    })
  }

  const removeProduct = (id: number) => {
    if (products.length > 1 && id !== products[products.length - 1].id) {
      setProducts(products.filter(product => product.id !== id))
    }
  }

  const calculateTotals = () => {
    return products.reduce((acc, product) => ({
      amount: acc.amount + (parseFloat(product.amount) || 0),
      discounts: acc.discounts + (parseFloat(product.discounts) || 0),
      taxableValue: acc.taxableValue + (parseFloat(product.taxableValue) || 0),
      igst: acc.igst + (parseFloat(product.igst) || 0),
      cgst: acc.cgst + (parseFloat(product.cgst) || 0),
      sgst: acc.sgst + (parseFloat(product.sgst) || 0),
      total: acc.total + (parseFloat(product.total) || 0)
    }), {
      amount: 0,
      discounts: 0,
      taxableValue: 0,
      igst: 0,
      cgst: 0,
      sgst: 0,
      total: 0
    })
  }

  const totals = calculateTotals()

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Sr. No.</TableHead>
            <TableHead>Name of Product/Service</TableHead>
            <TableHead>HSN/SAC</TableHead>
            <TableHead>UOM</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Discounts</TableHead>
            <TableHead>Taxable Value</TableHead>
            <TableHead>Tax Rate</TableHead>
            <TableHead>IGST</TableHead>
            <TableHead>CGST</TableHead>
            <TableHead>SGST</TableHead>
            <TableHead>Total</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Select
                  value={product.productId}
                  onValueChange={(value) => updateProduct(index, 'productId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product1">Product 1</SelectItem>
                    <SelectItem value="product2">Product 2</SelectItem>
                    <SelectItem value="product3">Product 3</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Input
                  value={product.hsn}
                  onChange={(e) => updateProduct(index, 'hsn', e.target.value)}
                  className="w-20"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={product.uom}
                  onChange={(e) => updateProduct(index, 'uom', e.target.value)}
                  className="w-20"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={product.qty}
                  onChange={(e) => updateProduct(index, 'qty', e.target.value)}
                  className="w-20"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={product.rate}
                  onChange={(e) => updateProduct(index, 'rate', e.target.value)}
                  className="w-24"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={product.amount}
                  readOnly
                  className="w-24 bg-gray-100"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={product.discounts}
                  onChange={(e) => updateProduct(index, 'discounts', e.target.value)}
                  className="w-24"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={product.taxableValue}
                  readOnly
                  className="w-24 bg-gray-100"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={product.taxRate}
                  onChange={(e) => updateProduct(index, 'taxRate', e.target.value)}
                  className="w-20"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={product.igst}
                  readOnly
                  className="w-24 bg-gray-100"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={product.cgst}
                  readOnly
                  className="w-24 bg-gray-100"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={product.sgst}
                  readOnly
                  className="w-24 bg-gray-100"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={product.total}
                  onChange={(e) => updateProduct(index, 'total', e.target.value)}
                  className="w-24"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProduct(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="font-medium">
            <TableCell colSpan={6} className="text-right">Total:</TableCell>
            <TableCell>₹{totals.amount.toFixed(2)}</TableCell>
            <TableCell>₹{totals.discounts.toFixed(2)}</TableCell>
            <TableCell>₹{totals.taxableValue.toFixed(2)}</TableCell>
            <TableCell></TableCell>
            <TableCell>₹{totals.igst.toFixed(2)}</TableCell>
            <TableCell>₹{totals.cgst.toFixed(2)}</TableCell>
            <TableCell>₹{totals.sgst.toFixed(2)}</TableCell>
            <TableCell>₹{totals.total.toFixed(2)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

