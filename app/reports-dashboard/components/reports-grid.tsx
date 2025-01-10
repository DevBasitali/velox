"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    sales: 4000,
    purchases: 2400,
  },
  {
    name: "Feb",
    sales: 3000,
    purchases: 1398,
  },
  {
    name: "Mar",
    sales: 2000,
    purchases: 9800,
  },
  {
    name: "Apr",
    sales: 2780,
    purchases: 3908,
  },
  {
    name: "May",
    sales: 1890,
    purchases: 4800,
  },
  {
    name: "Jun",
    sales: 2390,
    purchases: 3800,
  },
]

export function ReportsGrid() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip />
          <Bar
            dataKey="sales"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
          <Bar
            dataKey="purchases"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-muted"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

