export interface ProductOption {
  id: string;
  name: string;
  hsn: string;
  uom: string;
  rate: number;
}

export const productOptions: ProductOption[] = [
  { id: "1", name: "Product A", hsn: "1234", uom: "PCS", rate: 100 },
  { id: "2", name: "Product B", hsn: "5678", uom: "KG", rate: 200 },
  { id: "3", name: "Product C", hsn: "9101", uom: "MTR", rate: 150 },
  { id: "4", name: "Product D", hsn: "1121", uom: "BOX", rate: 300 },
  { id: "5", name: "Product E", hsn: "3141", uom: "LTR", rate: 250 },
];

