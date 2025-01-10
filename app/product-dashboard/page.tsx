"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, TrendingUp, AlertTriangle, IndianRupee, Search, Plus, Filter } from 'lucide-react';
import { ProductTable } from "./components/product-table";
import { AddProductModal } from "./components/add-product-modal";

// Define type for sorting state
type SortingState = {
  column: string;
  direction: 'asc' | 'desc';
}[];

// Define Product type
type Product = {
  name: string;
  stockValue: number;
  lowStockAlert: boolean;
  sold: number;
};

export default function ProductDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);  // Store fetched products

  // Fetch products when the component mounts
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products/fetch/all", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`  // Assuming the token is stored in localStorage
          }
        });
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          console.error("Failed to fetch products", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);  // Empty dependency array ensures it runs only once on mount

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Dashboard</h1>
        <Button 
          onClick={() => setIsAddProductModalOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Product
        </Button>
      </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Example metric cards */}
        <MetricCard 
          title="Total Products" 
          value={products.length.toString()} 
          description="+12 this week"
          icon={Package}
          className="bg-blue-50 border-blue-100"
          iconClassName="text-blue-600"
        />
        {/* Add other cards with similar structure */}
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
    
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductTable products={products} searchTerm={searchTerm} sorting={sorting} setSorting={setSorting} />
        </CardContent>
      </Card>

      <AddProductModal 
        open={isAddProductModalOpen} 
        onOpenChange={setIsAddProductModalOpen}
      />
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  description, 
  icon: Icon,
  className = "",
  iconClassName = ""
}: { 
  title: string
  value: string
  description: string
  icon: React.ElementType
  className?: string
  iconClassName?: string
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconClassName}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
