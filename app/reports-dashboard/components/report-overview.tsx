"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { cn } from "@/lib/utils"

const events = [
  {
    id: 1,
    title: "GST Filing Due",
    date: "2024-01-15",
    time: "10:00 AM - 11:00 AM",
    category: "Tax",
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: 2,
    title: "Annual Audit Meeting",
    date: "2024-01-08",
    time: "2:00 PM - 4:00 PM",
    category: "Audit",
    color: "bg-purple-100 text-purple-700"
  },
  {
    id: 3,
    title: "TDS Return Filing",
    date: "2024-01-07",
    time: "1:00 PM",
    category: "Tax",
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: 4,
    title: "Financial Review",
    date: "2024-01-20",
    time: "11:00 AM - 12:00 PM",
    category: "Review",
    color: "bg-green-100 text-green-700"
  }
]

const categories = [
  { name: "Tax Filings", color: "bg-blue-100" },
  { name: "Audit", color: "bg-purple-100" },
  { name: "Review", color: "bg-green-100" },
  { name: "Misc", color: "bg-gray-100" }
]

export function ReportOverview() {
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
  const currentYear = currentDate.getFullYear()

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Calendar</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{currentMonth} {currentYear}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex items-center gap-2"
              >
                <div className={cn("w-3 h-3 rounded-full", category.color)} />
                <span className="text-sm text-gray-600">{category.name}</span>
              </div>
            ))}
            <Button variant="link" className="text-purple-600 p-0">
              +Add New
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium">
              {day}
            </div>
          ))}
          
          {previousMonthDays.map((_, index) => (
            <div key={`prev-${index}`} className="bg-white p-2 min-h-[100px] text-gray-400">
              {new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInMonth - firstDayOfMonth + index + 1).getDate()}
            </div>
          ))}

          {days.map((day) => (
            <div key={day} className="bg-white p-2 min-h-[100px] relative">
              <span className={cn(
                "text-sm",
                currentDate.getDate() === day ? "h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center" : ""
              )}>
                {day}
              </span>
              <div className="mt-1 space-y-1">
                {events
                  .filter(event => new Date(event.date).getDate() === day)
                  .map(event => (
                    <div
                      key={event.id}
                      className={cn(
                        "text-xs p-1 rounded truncate",
                        event.color
                      )}
                    >
                      {event.time}
                      <div className="font-medium">{event.title}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline" size="sm">Month</Button>
          <Button variant="outline" size="sm">Week</Button>
          <Button variant="outline" size="sm">Day</Button>
        </div>
      </CardContent>
    </Card>
  )
}

