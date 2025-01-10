"use client"

import * as React from "react"
import Link from "next/link"
import { Bell, ChevronDown, User, Building2, Users, BookOpen, Package, Landmark, KeyRound, Receipt, FileText, CreditCard, ScrollText, BookOpenCheck, BarChart3, TrendingUp, Truck, Store, PieChart, ClipboardList, History, UserCheck, Database, FileUp, FileDown, PackageSearch, ShoppingCart } from 'lucide-react'

import { Logo } from "@/components/ui/logo"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigationItems = [
  {
    title: "Masters",
    items: [
      { title: "Business Masters", href: "/masters/business", icon: Building2 },
      { title: "User Profile Masters", href: "/masters/user-profile", icon: Users },
      { title: "Ledger Masters", href: "/masters/ledger", icon: BookOpen },
      { title: "Product Masters", href: "/masters/product", icon: Package },
      { title: "Bank Masters", href: "/masters/bank", icon: Landmark },
      { title: "Credentials Diary", href: "/masters/credentials", icon: KeyRound },
    ],
  },
  {
    title: "Vouchers",
    items: [
      { title: "Sales Invoice", href: "/vouchers/sales-invoice", icon: Receipt },
      { title: "Purchase Voucher", href: "/vouchers/purchase", icon: FileText },
      { title: "Payment Voucher", href: "/vouchers/payment", icon: CreditCard },
      { title: "Receipt Voucher", href: "/vouchers/receipt", icon: ScrollText },
      { title: "Journal Voucher", href: "/vouchers/journal", icon: BookOpenCheck },
      { title: "Purchase Dashboard", href: "/purchase-dashboard", icon: ShoppingCart },
    ],
  },
  {
    title: "Data Import/Export",
    items: [
      { title: "Import Masters", href: "/data/import-masters", icon: Database },
      { title: "Import Transactions", href: "/data/import-transactions", icon: FileUp },
      { title: "Export Masters", href: "/data/export-masters", icon: PackageSearch },
      { title: "Export Transactions", href: "/data/export-transactions", icon: FileDown },
    ],
  },
  {
    title: "Reports",
    items: [
      
      { title: "Sales Report", href: "/reports/sales", icon: BarChart3 },
      { title: "Purchase Report", href: "/reports/purchase", icon: TrendingUp },
      { title: "E-way Bills Report", href: "/reports/e-way-bills", icon: Truck },
      { title: "Trading Account", href: "/reports/trading", icon: Store },
      { title: "Profit & Loss Account", href: "/reports/profit-loss", icon: PieChart },
      { title: "Balance Sheet", href: "/reports/balance-sheet", icon: ClipboardList },
      { title: "Edit Log Report", href: "/reports/edit-log", icon: History },
      { title: "Login Report", href: "/reports/login", icon: UserCheck },
    ],
  },
]

export function MainNav() {
  const NavigationMenuItems = React.useMemo(() => (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.title} className="relative">
            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[220px] p-2 bg-white rounded-md shadow-md absolute left-0 top-[calc(100%+3rem)]">
                {item.items.map((subItem) => (
                  <ListItem
                    key={subItem.title}
                    title={subItem.title}
                    href={subItem.href}
                    icon={subItem.icon}
                  />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  ), [])

  const NotificationsDropdown = React.useMemo(() => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
            3
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex flex-col">
            <span className="font-medium">New order received</span>
            <span className="text-sm text-gray-500">2 minutes ago</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col">
            <span className="font-medium">Payment successful</span>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col">
            <span className="font-medium">Inventory low alert</span>
            <span className="text-sm text-gray-500">3 hours ago</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ), [])

  const ProfileDropdown = React.useMemo(() => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ), [])

  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-8">
        <Logo />
        {NavigationMenuItems}
      </div>
      <div className="flex items-center gap-4">
        {NotificationsDropdown}
        {ProfileDropdown}
      </div>
    </div>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string
  icon: React.ComponentType<{ className?: string }>
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  ListItemProps
>(({ className, title, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-center gap-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none transition-colors",
            className
          )}
          {...props}
        >
          <Icon className="h-4 w-4" />
          <span className="text-sm font-medium">{title}</span>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

