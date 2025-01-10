import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to GSTBILLS</h1>
        <p className="text-gray-600">Your complete business management solution</p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/dashboard">
            Go to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}

