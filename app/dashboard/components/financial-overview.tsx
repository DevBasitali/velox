import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface FinancialData {
  category: string
  lastMonth: number
  monthToDate: number
  yearToDate: number
}

interface FinancialOverviewProps {
  title: string
  data: FinancialData[]
}

function FinancialOverview({ title, data }: FinancialOverviewProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">in home currency</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Last month</TableHead>
            <TableHead>Month to date</TableHead>
            <TableHead>Year to date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.category}>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.lastMonth.toLocaleString()}</TableCell>
              <TableCell>{row.monthToDate.toLocaleString()}</TableCell>
              <TableCell>{row.yearToDate.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const profitLossData: FinancialData[] = [
  {
    category: "01 Income",
    lastMonth: 20000,
    monthToDate: 15000,
    yearToDate: 125000,
  },
  {
    category: "02 COGS",
    lastMonth: 2000,
    monthToDate: 2000,
    yearToDate: 20000,
  },
]

const balanceSheetData: FinancialData[] = [
  {
    category: "01 Current Assets",
    lastMonth: 40000,
    monthToDate: 45000,
    yearToDate: 45000,
  },
  {
    category: "02 Long-term Assets",
    lastMonth: 80000,
    monthToDate: 70000,
    yearToDate: 70000,
  },
]

export function ProfitLossOverview() {
  return <FinancialOverview title="Profit and Loss Overview" data={profitLossData} />
}

export function BalanceSheetOverview() {
  return <FinancialOverview title="Balance Sheet Overview" data={balanceSheetData} />
}

