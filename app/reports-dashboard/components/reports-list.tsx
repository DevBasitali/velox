import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'

interface Report {
  title: string
  description: string
  icon: any
  href: string
  color: string
}

export function ReportsList({ reports }: { reports: Report[] }) {
  return (
    <div className="space-y-4">
      {reports.map((report) => {
        const Icon = report.icon
        return (
          <div
            key={report.title}
            className="flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <Icon className={`h-5 w-5 ${report.color} mt-0.5 flex-shrink-0`} />
            <div className="flex-1 space-y-1">
              <h3 className="font-medium">{report.title}</h3>
              <p className="text-sm text-muted-foreground">
                {report.description}
              </p>
              <Button variant="link" size="sm" asChild className="p-0">
                <Link href={report.href} className="flex items-center">
                  View Report
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

