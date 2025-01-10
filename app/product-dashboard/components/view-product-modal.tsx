import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Product } from "./product-table"

interface ViewProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
}

export function ViewProductModal({ open, onOpenChange, product }: ViewProductModalProps) {
  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Name:</span>
            <span className="col-span-3">{product.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Group:</span>
            <span className="col-span-3">{product.group}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">HSN Code:</span>
            <span className="col-span-3">{product.hsnCode}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Stock:</span>
            <span className="col-span-3">{product.stock}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Stock Value:</span>
            <span className="col-span-3">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(product.stockValue)}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">GST %:</span>
            <span className="col-span-3">{product.gstPercentage}%</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Status:</span>
            <span className="col-span-3">{product.status}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

