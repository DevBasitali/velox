"use client"

import { useState } from "react"
import { DatePicker } from "@/components/ui/date-picker"

export default function Example() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="p-4">
      <DatePicker date={date} onSelect={setDate} />
    </div>
  )
}

