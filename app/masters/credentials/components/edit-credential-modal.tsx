"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from 'lucide-react'

interface Credential {
  id: string
  userId: string
  password: string
  type: "gst" | "eway" | "einvoice"
}

interface EditCredentialModalProps {
  credential: Credential | null
  onOpenChange: (open: boolean) => void
}

const CREDENTIAL_TITLES = {
  gst: "GST Login Credentials",
  eway: "E-Way Bill Credentials",
  einvoice: "E-Invoice Credentials"
}

export function EditCredentialModal({ credential, onOpenChange }: EditCredentialModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    userId: "",
    password: ""
  })

  useEffect(() => {
    if (credential) {
      setFormData({
        userId: credential.userId,
        password: credential.password
      })
    }
  }, [credential])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving credential:", formData)
    onOpenChange(false)
  }

  if (!credential) return null

  return (
    <Dialog open={!!credential} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {CREDENTIAL_TITLES[credential.type]}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              value={formData.userId}
              onChange={(e) => setFormData(prev => ({ ...prev, userId: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

