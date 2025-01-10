import { MetricCard } from "./metric-card"

const metrics = [
  {
    title: "Trade Debtors",
    value: "₹3.76M",
    icon: "💰",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Sales",
    value: "₹3.76M",
    icon: "📈",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Trade Creditors",
    value: "₹3.76M",
    icon: "💳",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Stock",
    value: "₹3.76M",
    icon: "📦",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Balance",
    value: "₹3.76M",
    icon: "💰",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Purchase",
    value: "₹3.76M",
    icon: "🛍️",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
]

export function Metrics() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  )
}

