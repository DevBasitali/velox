"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface EditBusinessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditBusinessModal({ open, onOpenChange }: EditBusinessModalProps) {
  const [formData, setFormData] = useState({
    // Company Details
    companyName: "Morrison Industries Ltd",
    tagline: "Excellence in Manufacturing",
    email: "info@morrison.com",
    phone: "+91 22 1234 5678",
    website: "www.morrison.com",
    
    // Address
    address: "123 Business Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India",
    
    // Business Details
    gstNo: "27AADCB2230M1Z2",
    panNo: "AADCB2230M",
    cin: "U12345MH2020PLC123456",
    businessType: "manufacturing",
    yearEstablished: "2020",
    
    // Bank Details - Primary
    bankName: "HDFC Bank",
    accountNo: "XXXX-XXXX-XXXX-1234",
    ifscCode: "HDFC0001234",
    branch: "Mumbai Main Branch",
    accountType: "current",
    swiftCode: "HDFCINBB",
    upiId: "morrison@hdfcbank",
    
    // Additional Info
    description: "Leading manufacturer of industrial equipment and solutions.",
    logo: "/placeholder.svg",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Business Details</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-grow">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <Tabs defaultValue="company" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="bank">Bank</TabsTrigger>
              </TabsList>
              
              <TabsContent value="company" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-[200px,1fr] gap-4 items-start">
                    <div>
                      <div className="aspect-square relative rounded-lg border overflow-hidden mb-2">
                        <Image
                          src={formData.logo}
                          alt="Company Logo"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button variant="outline" className="w-full">
                        Change Logo
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label>Company Name</Label>
                        <Input
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Tagline</Label>
                        <Input
                          name="tagline"
                          value={formData.tagline}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Email</Label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Phone</Label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Website</Label>
                      <Input
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="address" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Address</Label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>City</Label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>State</Label>
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>PIN Code</Label>
                      <Input
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Country</Label>
                      <Input
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="business" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>GST Number</Label>
                      <Input
                        name="gstNo"
                        value={formData.gstNo}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>PAN Number</Label>
                      <Input
                        name="panNo"
                        value={formData.panNo}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>CIN</Label>
                      <Input
                        name="cin"
                        value={formData.cin}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Year Established</Label>
                      <Input
                        name="yearEstablished"
                        value={formData.yearEstablished}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Business Type</Label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) => handleSelectChange("businessType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="trading">Trading</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bank" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Bank Name</Label>
                      <Input
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Account Number</Label>
                      <Input
                        name="accountNo"
                        value={formData.accountNo}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>IFSC Code</Label>
                      <Input
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Branch</Label>
                      <Input
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Account Type</Label>
                      <Select
                        value={formData.accountType}
                        onValueChange={(value) => handleSelectChange("accountType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="current">Current</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>SWIFT Code</Label>
                      <Input
                        name="swiftCode"
                        value={formData.swiftCode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>UPI ID</Label>
                      <Input
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Save Changes
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

