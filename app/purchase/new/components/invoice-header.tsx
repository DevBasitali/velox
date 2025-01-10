import { Button } from "@/components/ui/button"

interface InvoiceHeaderProps {
  title: string
}

export function InvoiceHeader({ title }: InvoiceHeaderProps) {
  return (
    <div className="p-6 border-b">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  )
}

