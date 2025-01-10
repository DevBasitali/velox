import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function CustomerSearch() {
  return (
    <div className="p-6 border-b flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input placeholder="Search customers..." className="pl-8" />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-purple-600 hover:bg-purple-700">+ Add New Customer</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Add a new customer to your database
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Input />
            </div>
            <div className="space-y-2">
              <Label>GSTIN</Label>
              <Input />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>State</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label>State Code</Label>
                <Input />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="bg-purple-600 hover:bg-purple-700">Add Customer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

