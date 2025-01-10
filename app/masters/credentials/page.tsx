"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, KeyRound, FileText, Truck } from 'lucide-react'
import { EditCredentialModal } from "./components/edit-credential-modal"

interface Credential {
  id: string
  userId: string
  password: string
  type: "gst" | "eway" | "einvoice"
}

export default function CredentialsDiary() {
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null)
  const [credentials] = useState<Credential[]>([
    { id: "gst", userId: "XXXXXXXXXXXXX", password: "••••••••", type: "gst" },
    { id: "eway", userId: "XXXXXXXXXXXXX", password: "••••••••", type: "eway" },
    { id: "einvoice", userId: "XXXXXXXXXXXXX", password: "••••••••", type: "einvoice" },
  ])

  const togglePasswordVisibility = (id: string) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleEdit = (credential: Credential) => {
    setEditingCredential(credential)
  }

  const handleSave = () => {
    console.log("Saving credentials...")
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Credential&apos;s Diary</h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* GST Credentials */}
        <Card className="bg-blue-50/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              GST Login Credentials
            </CardTitle>
            <Button 
              variant="default" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => console.log("Login to GST")}
            >
              Login
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-[100px] font-medium">User ID</div>
                <div className="flex-1 relative">
                  <Input 
                    value={credentials[0].userId} 
                    readOnly 
                    className="pr-20"
                  />
                  <Button
                    variant="ghost"
                    className="absolute right-0 top-0 text-orange-500 hover:text-orange-600"
                    onClick={() => handleEdit(credentials[0])}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-[100px] font-medium">Password</div>
                <div className="flex-1 relative">
                  <Input 
                    type={showPassword.gst ? "text" : "password"}
                    value={credentials[0].password}
                    readOnly
                    className="pr-20"
                  />
                  <div className="absolute right-0 top-0 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePasswordVisibility("gst")}
                      className="text-gray-500"
                    >
                      {showPassword.gst ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-orange-500 hover:text-orange-600"
                      onClick={() => handleEdit(credentials[0])}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* E-Way Bill Credentials */}
        <Card className="bg-blue-50/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              E-Way Bill Credentials
            </CardTitle>
            <Button 
              variant="default" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => console.log("Login to E-Way Bill")}
            >
              Login
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-[100px] font-medium">User ID</div>
                <div className="flex-1 relative">
                  <Input 
                    value={credentials[1].userId} 
                    readOnly 
                    className="pr-20"
                  />
                  <Button
                    variant="ghost"
                    className="absolute right-0 top-0 text-orange-500 hover:text-orange-600"
                    onClick={() => handleEdit(credentials[1])}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-[100px] font-medium">Password</div>
                <div className="flex-1 relative">
                  <Input 
                    type={showPassword.eway ? "text" : "password"}
                    value={credentials[1].password}
                    readOnly
                    className="pr-20"
                  />
                  <div className="absolute right-0 top-0 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePasswordVisibility("eway")}
                      className="text-gray-500"
                    >
                      {showPassword.eway ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-orange-500 hover:text-orange-600"
                      onClick={() => handleEdit(credentials[1])}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* E-Invoice Credentials */}
        <Card className="bg-blue-50/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              E-Invoice Credentials
            </CardTitle>
            <Button 
              variant="default" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => console.log("Login to E-Invoice")}
            >
              Login
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-[100px] font-medium">User ID</div>
                <div className="flex-1 relative">
                  <Input 
                    value={credentials[2].userId} 
                    readOnly 
                    className="pr-20"
                  />
                  <Button
                    variant="ghost"
                    className="absolute right-0 top-0 text-orange-500 hover:text-orange-600"
                    onClick={() => handleEdit(credentials[2])}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-[100px] font-medium">Password</div>
                <div className="flex-1 relative">
                  <Input 
                    type={showPassword.einvoice ? "text" : "password"}
                    value={credentials[2].password}
                    readOnly
                    className="pr-20"
                  />
                  <div className="absolute right-0 top-0 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePasswordVisibility("einvoice")}
                      className="text-gray-500"
                    >
                      {showPassword.einvoice ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-orange-500 hover:text-orange-600"
                      onClick={() => handleEdit(credentials[2])}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-4">
          <Button 
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 w-[200px]"
            onClick={handleSave}
          >
            SAVE
          </Button>
        </div>
      </div>

      <EditCredentialModal
        credential={editingCredential}
        onOpenChange={(open) => !open && setEditingCredential(null)}
      />
    </div>
  )
}

