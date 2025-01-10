import { Button } from "@/components/ui/button"
import Image from "next/image"

export function InvoiceHeader() {
  return (
    <div className="flex justify-between items-start p-6 border-b">
      <div className="flex items-center space-x-4">
        <Image
          src="/placeholder.svg?height=40&width=40"
          alt="Logo"
          width={40}
          height={40}
          className="text-blue-600"
        />
      </div>
      <div>
        <h1 className="text-xl font-semibold text-center">Tax Invoice</h1>
        <p className="text-sm text-gray-600 text-center">123 Business Street</p>
        <p className="text-sm text-gray-600 text-center">Mumbai, Maharashtra 400001</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700">
          Original for Recipient
        </Button>
        <Button variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">
          Duplicate for Transporter
        </Button>
        <Button variant="outline" className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700">
          Triplicate for Supplier
        </Button>
      </div>
    </div>
  )
}

