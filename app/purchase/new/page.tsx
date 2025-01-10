"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Plus } from 'lucide-react'
import { ProductsTable } from "./components/products-table"
import { VendorSearch } from "./components/vendor-search"
import { VendorDetails } from "./components/vendor-details"
import { PaymentDetails } from "./components/payment-details"
import { TaxSummary } from "./components/tax-summary"
import { InvoiceHeader } from "./components/invoice-header"
import { InvoiceDetails } from "./components/invoice-details"

export default function NewPurchaseInvoice() {
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardContent className="p-6">
          <InvoiceHeader title="Purchase Invoice" />
          <InvoiceDetails />
          <VendorSearch />
          <VendorDetails />
          <ProductsTable />

          <div className="grid grid-cols-2 gap-8 mt-8"> {/* Moved Tax Summary here */}
            <PaymentDetails />
            <TaxSummary 
              totals={{
                taxableValue: 59600.00,
                igst: 10728.00,
                cgst: 0.00,
                sgst: 0.00,
                total: 70328.00
              }}
            /> {/* Removed justify-self-end */}
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            <Button variant="outline">
              Save as Draft
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Create Purchase Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

