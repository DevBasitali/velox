import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const topProducts = [
  { name: "Product X", sales: 150, percentage: 100 },
  { name: "Product Y", sales: 120, percentage: 80 },
  { name: "Product Z", sales: 90, percentage: 60 },
  { name: "Product W", sales: 75, percentage: 50 },
  { name: "Product V", sales: 60, percentage: 40 },
]

export function TopSellingProducts() {
  return (
    <div className="space-y-4">
      {topProducts.map((product) => (
        <Card key={product.name}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{product.name}</span>
              <span className="text-sm text-muted-foreground">{product.sales} sold</span>
            </div>
            <Progress value={product.percentage} className="h-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

