import { ActionButtons } from "./components/action-buttons"
import { BalanceSheetOverview, ProfitLossOverview } from "./components/financial-overview"
import { CompanyInfo } from "./components/company-info"
import { Metrics } from "./components/metrics"
import { MainNav } from "@/components/main-nav"
import { TransactionsTable } from "./components/transactions-table"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 space-y-6">
       
        
        <div className="grid grid-cols-[300px,1fr] gap-6">
          <CompanyInfo />
          <div className="space-y-6">
            <Metrics />
            <ActionButtons />
          </div>
        </div>
        
        <TransactionsTable />
        
        <div className="grid grid-cols-2 gap-6">
          <ProfitLossOverview />
          <BalanceSheetOverview />
        </div>
      </div>
    </div>
  )
}

