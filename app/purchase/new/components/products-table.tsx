"use client"

import { useState, useEffect } from "react"
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

const defaultProduct: Product = {
  id: 0,
  productId: "",
  name: "",
  remarks: "",
  hsn: "",
  uom: "",
  qty: 0,
  rate: 0,
  amount: 0,
  discounts: 0,
  taxableValue: 0,
  taxRate: 18,
  igst: 0,
  cgst: 0,
  sgst: 0,
  total: 0
}

export function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([{ ...defaultProduct, id: 1 }])

  // Check if a row has data entered
  const hasData = (product: Product) => {
    return product.productId !== "" || 
           product.qty !== 0 || 
           product.rate !== 0 ||
           product.discounts !== 0
  }

  // Monitor the last row for data entry
  useEffect(() => {
    const lastProduct = products[products.length - 1]
    if (hasData(lastProduct)) {
      addProduct()
    }
  }, [products])

  const calculateValues = (product: Product): Product => {
    const amount = product.qty * product.rate
    const taxableValue = amount - product.discounts
    const igst = (taxableValue * product.taxRate) / 100
    const total = taxableValue + igst

    return {
      ...product,
      amount,
      taxableValue,
      igst,
      total
    }
  }

  const updateProduct = (index: number, field: keyof Product, value: string | number) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts]
      const updatedProduct = { ...updatedProducts[index], [field]: value }
      updatedProducts[index] = calculateValues(updatedProduct)
      return updatedProducts
    })
  }

  const addProduct = () => {
    // Only add a new row if one doesn't already exist
    const lastProduct = products[products.length - 1]
    if (hasData(lastProduct)) {
      setProducts(prevProducts => [...prevProducts, { ...defaultProduct, id: prevProducts.length + 1 }])
    }
  }

  const removeProduct = (id: number) => {
    // Prevent removing if it's the last row or only row
    if (products.length > 1 && id !== products[products.length - 1].id) {
      setProducts(products.filter(product => product.id !== id))
    }
  }

  const calculateTotals = () => {
    return products.reduce((acc, product) => ({
      amount: acc.amount + product.amount,
      discounts: acc.discounts + product.discounts,
      taxableValue: acc.taxableValue + product.taxableValue,
      igst: acc.igst + product.igst,
      cgst: acc.cgst + product.cgst,
      sgst: acc.sgst + product.sgst,
      total: acc.total + product.total
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

  // Filter out the last row from totals if it's empty
  const displayProducts = products.filter((product, index) => {
    if (index === products.length - 1) {
      return hasData(product)
    }
    return true
  })

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
                  type="number"
                  value={product.qty}
                  onChange={(e) => updateProduct(index, 'qty', parseFloat(e.target.value))}
                  className="w-20"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={product.rate}
                  onChange={(e) => updateProduct(index, 'rate', parseFloat(e.target.value))}
                  className="w-24"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={product.amount.toFixed(2)}
                  readOnly
                  className="w-24 bg-gray-100"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={product.discounts}
                  onChange={(e) => updateProduct(index, 'discounts', parseFloat(e.target.value))}
                  className="w-24"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={product.taxableValue.toFixed(2)}
                  readOnly
                  className="w-24 bg-gray-100"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={product.taxRate}
                  onChange={(e) => updateProduct(index, 'taxRate', parseFloat(e.target.value))}
                  className="w-20"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={product.igst.toFixed(2)}
                  readOnly
                  className="w-24 bg-gray-100"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={product.cgst.toFixed(2)}
                  readOnly
                  className="w-24 bg-gray-100"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={product.sgst.toFixed(2)}
                  readOnly
                  className="w-24 bg-gray-100"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={product.total.toFixed(2)}
                  readOnly
                  className="w-24 bg-gray-100"
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

