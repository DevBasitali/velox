import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Business Master",
  description: "Manage your business details and documents",
}

export default function BusinessMasterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

