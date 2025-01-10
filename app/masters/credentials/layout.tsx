import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Credentials Diary",
  description: "Manage your GST, E-Way Bill, and E-Invoice credentials",
}

export default function CredentialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

