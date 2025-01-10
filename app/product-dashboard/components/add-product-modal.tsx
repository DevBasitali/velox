"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AddProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    itemType: "product",
    name: "",
    description: "",
    barcode: "",
    hsnCode: "",
    uom: "",
    conversion: "",
    productType: "taxable",
    gstPercentage: "",
    cessPercentage: "",
    cessAmount: "",
    inputCreditIneligible: false,
    manageStock: "normal",
    availableQty: "",
    sellPrice: "",
    sellPriceIncTax: "",
    purchasePrice: "",
    purchasePriceIncTax: "",
    lowStockAlert: "",
    productGroup: "",
    discount: "",
    nonSalable: false,
    enabled: true,
    openingStockValue: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Handle form submission logic here
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow">

          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="tax">Tax & Pricing</TabsTrigger>
                <TabsTrigger value="stock">Stock</TabsTrigger>
                <TabsTrigger value="additional">Additional</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Item Type</Label>
                    <RadioGroup
                      defaultValue="product"
                      onValueChange={(value) => setFormData(prev => ({ ...prev, itemType: value }))}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="product" id="product" />
                        <Label htmlFor="product">Product</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="service" id="service" />
                        <Label htmlFor="service">Service</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Product/Service Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Product Description</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter product description" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode/Serial No.</Label>
                    <Input id="barcode" name="barcode" value={formData.barcode} onChange={handleInputChange} placeholder="Enter/Scan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hsnCode">HSN/SAC Code</Label>
                    <div className="flex space-x-2">
                      <Input id="hsnCode" name="hsnCode" value={formData.hsnCode} onChange={handleInputChange} placeholder="Enter your HSN code" />
                      <Button type="button">Find</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="uom">Unit of Measurement</Label>
                    <Select
                      value={formData.uom}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, uom: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit of measurement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BAG">BAG-BAGS</SelectItem>
                        <SelectItem value="BAL">BAL-BALE</SelectItem>
                        <SelectItem value="BDL">BDL-BUNDLES</SelectItem>
                        <SelectItem value="BKL">BKL-BUCKLES</SelectItem>
                        <SelectItem value="BOU">BOU-BILLIONS OF UNITS</SelectItem>
                        <SelectItem value="BOX">BOX-BOX</SelectItem>
                        <SelectItem value="BTL">BTL-BOTTLES</SelectItem>
                        <SelectItem value="BUN">BUN-BUNCHES</SelectItem>
                        <SelectItem value="CAN">CAN-CANS</SelectItem>
                        <SelectItem value="CBM">CBM-CUBIC METER</SelectItem>
                        <SelectItem value="CCM">CCM-CUBIC CENTIMETER</SelectItem>
                        <SelectItem value="CMS">CMS-CENTIMETER</SelectItem>
                        <SelectItem value="CTN">CTN-CARTONS</SelectItem>
                        <SelectItem value="DOZ">DOZ-DOZEN</SelectItem>
                        <SelectItem value="DRM">DRM-DRUM</SelectItem>
                        <SelectItem value="GGR">GGR-GREAT GROSS</SelectItem>
                        <SelectItem value="GMS">GMS-GRAMS</SelectItem>
                        <SelectItem value="GRS">GRS-GROSS</SelectItem>
                        <SelectItem value="GYD">GYD-GROSS YARDS</SelectItem>
                        <SelectItem value="KGS">KGS-KILOGRAMS</SelectItem>
                        <SelectItem value="KLR">KLR-KILOLITER</SelectItem>
                        <SelectItem value="KME">KME-KILOMETRE</SelectItem>
                        <SelectItem value="MLT">MLT-MILLILITRE</SelectItem>
                        <SelectItem value="MTR">MTR-METERS</SelectItem>
                        <SelectItem value="MTS">MTS-METRIC TONS</SelectItem>
                        <SelectItem value="NOS">NOS-NUMBERS</SelectItem>
                        <SelectItem value="PAC">PAC-PACKS</SelectItem>
                        <SelectItem value="PCS">PCS-PIECES</SelectItem>
                        <SelectItem value="PRS">PRS-PAIRS</SelectItem>
                        <SelectItem value="QTL">QTL-QUINTAL</SelectItem>
                        <SelectItem value="ROL">ROL-ROLLS</SelectItem>
                        <SelectItem value="SET">SET-SETS</SelectItem>
                        <SelectItem value="SQF">SQF-SQUARE FEET</SelectItem>
                        <SelectItem value="SQM">SQM-SQUARE METERS</SelectItem>
                        <SelectItem value="SQY">SQY-SQUARE YARDS</SelectItem>
                        <SelectItem value="TBS">TBS-TABLETS</SelectItem>
                        <SelectItem value="TGM">TGM-TEN GROSS</SelectItem>
                        <SelectItem value="THD">THD-THOUSANDS</SelectItem>
                        <SelectItem value="TON">TON-TONNES</SelectItem>
                        <SelectItem value="TUB">TUB-TUBES</SelectItem>
                        <SelectItem value="UGS">UGS-US GALLONS</SelectItem>
                        <SelectItem value="UNT">UNT-UNITS</SelectItem>
                        <SelectItem value="YDS">YDS-YARDS</SelectItem>
                        <SelectItem value="OTH">OTH-OTHERS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="conversion">Conversion</Label>
                    <Input id="conversion" name="conversion" value={formData.conversion} onChange={handleInputChange} placeholder="Enter conversion" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tax" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Product Type</Label>
                    <Select
                      value={formData.productType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, productType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="taxable">Taxable</SelectItem>
                        <SelectItem value="nil-rated">Nil Rated</SelectItem>
                        <SelectItem value="exempt">Exempt</SelectItem>
                        <SelectItem value="non-gst">Non-GST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gstPercentage">GST %</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gstPercentage: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select GST" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0%</SelectItem>
                        <SelectItem value="0.1">0.1%</SelectItem>
                        <SelectItem value="0.25">0.25%</SelectItem>
                        <SelectItem value="0.5">0.5%</SelectItem>
                        <SelectItem value="1">1%</SelectItem>
                        <SelectItem value="1.5">1.5%</SelectItem>
                        <SelectItem value="3">3%</SelectItem>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="6">6%</SelectItem>
                        <SelectItem value="7.5">7.5%</SelectItem>
                        <SelectItem value="12">12%</SelectItem>
                        <SelectItem value="18">18%</SelectItem>
                        <SelectItem value="28">28%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cessPercentage">CESS %</Label>
                    <Input id="cessPercentage" name="cessPercentage" value={formData.cessPercentage} onChange={handleInputChange} placeholder="Enter your CESS" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cessAmount">CESS Amount</Label>
                    <Input id="cessAmount" name="cessAmount" value={formData.cessAmount} onChange={handleInputChange} placeholder="Enter your CESS Amount" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inputCreditIneligible"
                      checked={formData.inputCreditIneligible}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inputCreditIneligible: checked as boolean }))}
                    />
                    <Label htmlFor="inputCreditIneligible">Is Product Ineligible for Input Credit?</Label>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="stock" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Manage Stock</Label>
                    <RadioGroup
                      defaultValue="normal"
                      onValueChange={(value) => setFormData(prev => ({ ...prev, manageStock: value }))}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="normal" id="normal" />
                        <Label htmlFor="normal">Normal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="batch" id="batch" />
                        <Label htmlFor="batch">Batch</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="serialNo" id="serialNo" />
                        <Label htmlFor="serialNo">Serial No.</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availableQty">Available Qty</Label>
                    <Input id="availableQty" name="availableQty" value={formData.availableQty} onChange={handleInputChange} type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="openingStockValue">Opening Stock Value</Label>
                    <Input 
                      id="openingStockValue" 
                      name="openingStockValue" 
                      value={formData.openingStockValue} 
                      onChange={handleInputChange} 
                      type="number" 
                      placeholder="Enter opening stock value"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellPrice">Sell Price</Label>
                    <Input id="sellPrice" name="sellPrice" value={formData.sellPrice} onChange={handleInputChange} type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellPriceIncTax">Sell Price (Incl. Tax)</Label>
                    <Input id="sellPriceIncTax" name="sellPriceIncTax" value={formData.sellPriceIncTax} onChange={handleInputChange} type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purchasePrice">Purchase Price</Label>
                    <Input id="purchasePrice" name="purchasePrice" value={formData.purchasePrice} onChange={handleInputChange} type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purchasePriceIncTax">Purchase Price (Incl. Tax)</Label>
                    <Input id="purchasePriceIncTax" name="purchasePriceIncTax" value={formData.purchasePriceIncTax} onChange={handleInputChange} type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lowStockAlert">Low Stock Alert</Label>
                    <Input id="lowStockAlert" name="lowStockAlert" value={formData.lowStockAlert} onChange={handleInputChange} type="number" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="additional" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productGroup">Product Group</Label>
                    <div className="flex space-x-2">
                      <Input id="productGroup" name="productGroup" value={formData.productGroup} onChange={handleInputChange} />
                      <Button type="button">Add Product Group</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount</Label>
                    <Input id="discount" name="discount" value={formData.discount} onChange={handleInputChange} placeholder="Rs%" />
                  </div>
                  <div className="space-y-2">
                    <Label>Product Images</Label>
                    <Button type="button">Upload</Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="nonSalable"
                      checked={formData.nonSalable}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, nonSalable: checked as boolean }))}
                    />
                    <Label htmlFor="nonSalable">Non-Salable Product</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enabled"
                      checked={formData.enabled}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enabled: checked }))}
                    />
                    <Label htmlFor="enabled">Enable</Label>
                  </div>
                  <p className="text-sm text-gray-500">Product will be visible on all documents.</p>
                </div>
              </TabsContent>
            </Tabs>
          </form>
          
        </ScrollArea>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

