"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowRight } from 'lucide-react'

interface Account {
  name: string
  balance: string
  type: string
  status: string
}

export function AccountsList({ data }: { data: Account[] }) {
  return (
    <div className="space-y-4">
      {data.map((account) => (
        <Card key={account.name} className="relative">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{account.name}</h3>
                <p className="text-sm text-muted-foreground">{account.type}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Transactions</DropdownMenuItem>
                  <DropdownMenuItem>Edit Account</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-2xl font-bold">₹{account.balance}</div>
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                account.status === 'Active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {account.status}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

