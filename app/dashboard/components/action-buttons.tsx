import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, ShoppingCart, Receipt, CreditCard, BookOpen, Package, FileText, FileUp, BookOpenCheck } from 'lucide-react'

const actions = [
  { title: "Sales", href: "/sales-dashboard", color: "bg-blue-500 hover:bg-blue-600", icon: BarChart3 },
  { title: "Purchases", href: "/purchase-dashboard", color: "bg-amber-500 hover:bg-amber-600", icon: ShoppingCart },
  { title: "Receipt", href: "/receipt-dashboard", color: "bg-indigo-500 hover:bg-indigo-600", icon: Receipt },
  { title: "Payment", href: "/payment-dashboard", color: "bg-emerald-500 hover:bg-emerald-600", icon: CreditCard },
  { title: "Journal Voucher", href: "/journal-voucher-dashboard", color: "bg-red-500 hover:bg-red-600", icon: BookOpen },
  { title: "Products", href: "/product-dashboard", color: "bg-pink-500 hover:bg-pink-600", icon: Package },
  { title: "Reports", href: "/reports-dashboard", color: "bg-teal-500 hover:bg-teal-600", icon: FileText },
  { title: "Ledgers", href: "/ledger", color: "bg-gray-500 hover:bg-gray-600", icon: BookOpenCheck },
]

export function ActionButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <Button
          key={action.title}
          asChild
          className={action.color}
        >
          <Link href={action.href} className="flex items-center gap-2">
            <action.icon className="h-4 w-4" />
            {action.title}
          </Link>
        </Button>
      ))}
    </div>
  )
}

