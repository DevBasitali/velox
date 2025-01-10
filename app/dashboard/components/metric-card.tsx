interface MetricCardProps {
  title: string
  value: string
  icon: string
  iconBg: string
  iconColor: string
}

export function MetricCard({ title, value, icon, iconBg, iconColor }: MetricCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${iconBg}`}>
          <span className={`text-xl ${iconColor}`}>{icon}</span>
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  )
}

