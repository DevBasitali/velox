"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Plus } from 'lucide-react'
import Image from "next/image"
import { ProductsTable } from "./components/products-table"
import { Badge } from "@/components/ui/badge"

export default function NewSaleInvoice() {

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardContent className="p-6">

          {/* Invoice Details Section */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Invoice No</Label>
                <Input defaultValue="INV/2024-001" />
              </div>
              <div className="space-y-2">
                <Label>Invoice Date</Label>
                <Input type="date" defaultValue="2024-01-01" />
              </div>
              <div className="space-y-2">
                <Label>GSTIN</Label>
                <Input defaultValue="27AADCB2230M1Z2" />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input defaultValue="Maharashtra (Code: 27)" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Transportation Mode</Label>
                <Input defaultValue="Road" />
              </div>
              <div className="space-y-2">
                <Label>Vehicle Number</Label>
                <Input defaultValue="XX XX XX XXXX" />
              </div>
              <div className="space-y-2">
                <Label>Place of Supply</Label>
                <Input defaultValue="City Name" />
              </div>
            </div>
          </div>

          {/* Customer Search Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search customers..." className="pl-8" />
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" /> Add New Customer
              </Button>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Billed To */}
            <div className="space-y-4">
              <h3 className="font-medium">Details of Receiver / Billed to:</h3>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue="ABC Trading Co." />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input defaultValue="456 Market Road, Delhi" />
              </div>
              <div className="space-y-2">
                <Label>GSTIN</Label>
                <Input defaultValue="07AADFV2345R1Z5" />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input defaultValue="Delhi (Code: 07)" />
              </div>
            </div>
            {/* Shipped To */}
            <div className="space-y-4">
              <h3 className="font-medium">Details of Consignee / Shipped to:</h3>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue="ABC Trading Co." />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input defaultValue="456 Market Road, Delhi" />
              </div>
              <div className="space-y-2">
                <Label>GSTIN</Label>
                <Input defaultValue="07AADFV2345R1Z5" />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input defaultValue="Delhi (Code: 07)" />
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="mb-8">
            <ProductsTable />
          </div>

          {/* Footer Section */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Total Invoice Amount in Words:</h3>
                <p className="text-sm">Seventy Thousand Three Hundred Twenty Eight Only</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Payment Details:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amount received in Cash</Label>
                    <Input defaultValue="₹59600.00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Amount received in bank account</Label>
                    <Input defaultValue="ABCD Bank" />
                  </div>
                  <div className="space-y-2">
                    <Label>UPI/NEFT/RTGS/CARD</Label>
                    <Input defaultValue="₹23456.00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Balance Outstanding</Label>
                    <Input defaultValue="₹12345.00" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Bank Details:</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bank Name</Label>
                      <Input defaultValue="ABCD" />
                    </div>
                    <div className="space-y-2">
                      <Label>Account Number</Label>
                      <Input defaultValue="XXXXXXXX" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>IFSC Code</Label>
                    <Input defaultValue="ABCD00001234" />
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

            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-4">Tax Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Taxable Value</span>
                    <span>₹59600.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Add: IGST</span>
                    <span>₹10728.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Add: CGST</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Add: SGST</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Invoice Value</span>
                    <span>₹70328.00</span>
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
                    <span>₹70328.00</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                This is a computer generated invoice
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            <Button variant="outline">
              Save as Draft
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Create Invoice
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              Generate E-Invoice
              <Badge variant="secondary" className="ml-1 bg-green-100 text-green-800">E</Badge>
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2">
              Generate E-way Bill
              <Badge variant="secondary" className="ml-1 bg-orange-100 text-orange-800">EWB</Badge>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

