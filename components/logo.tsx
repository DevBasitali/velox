import Link from "next/link"

interface LogoProps {
  variant?: "light" | "dark"
}

export function Logo({ variant = "dark" }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className={`w-8 h-8 ${variant === "light" ? "bg-white" : "bg-purple-600"} rounded flex items-center justify-center`}>
        <div className={`w-4 h-4 ${variant === "light" ? "bg-purple-600" : "bg-white"} rounded`} />
      </div>
      <span className={`text-xl font-bold ${variant === "light" ? "text-white" : "text-gray-900"}`}>
        VELOX
      </span>
    </Link>
  )
}

