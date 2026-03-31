import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Loader2, Plus } from "lucide-react";
import React, { useMemo, useState } from "react";
import api from "@/lib/httpClient";
import { toast } from "sonner";
import { Product } from "../index";
import { Row } from "./Row";
import { Breakdown } from "@/hooks/orders/useCreateOrder";

interface TablesProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isLoadingAppointment?: boolean;
  breakdown: Breakdown;
}

const Tables = ({
  products,
  setProducts,
  isLoadingAppointment,
  breakdown,
}: TablesProps) => {
  const [skuInput, setSkuInput] = useState("");
  const [isSearchingSku, setIsSearchingSku] = useState(false);

  const handleAddProduct = async () => {
    if (!skuInput.trim()) {
      toast.error("Please enter a SKU");
      return;
    }

    setIsSearchingSku(true);
    try {
      const response = await api.get(`/products/sku/${skuInput.trim()}`);
      const productData = response.data;

      if (productData) {
        const formattedProduct: Product = {
          id: productData._id,
          name: productData.name,
          sku: productData.sku,
          quantity: 1,

          mrpPrice: productData.mrpPrice,
          grossPrice: productData.grossPrice,
          discountedPrice: productData.discountedPrice,
          discountedPercentage: productData.discountedPercentage,
          cgst: productData.cgst,
          sgst: productData.sgst,
          makingCharges: productData.makingChanges || 0,
          va: productData.va || 0,
        };

        setProducts((prev) => {
          const existingProductIndex = prev.findIndex(
            (p) => p.sku === formattedProduct.sku,
          );
          if (existingProductIndex > -1) {
            const newProducts = [...prev];
            newProducts[existingProductIndex] = {
              ...newProducts[existingProductIndex],
              quantity: newProducts[existingProductIndex].quantity + 1,
            };
            toast.success(`Increased quantity for ${formattedProduct.name}`);
            return newProducts;
          } else {
            toast.success(`${formattedProduct.name} added to list`);
            return [...prev, formattedProduct];
          }
        });
        setSkuInput("");
      } else {
        toast.error("Product not found");
      }
    } catch (error: any) {
      console.error("Error fetching product by SKU:", error);
      toast.error(error.response?.data?.message || "Failed to fetch product");
    } finally {
      setIsSearchingSku(false);
    }
  };

  const increaseQty = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)),
    );
  };

  const decreaseQty = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p,
      ),
    );
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const grandTotal = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + product.mrpPrice * product.quantity,
      0,
    );
  }, [products]);

  if (isLoadingAppointment) {
    return (
      <Card className="p-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Products */}
      <Card className="lg:col-span-2 p-6 space-y-6">
        <h3 className="text-lg font-semibold">Products Purchased</h3>

        <div className="flex gap-3">
          <Input
            placeholder="Enter SKU..."
            value={skuInput}
            onChange={(e) => setSkuInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddProduct()}
          />
          <Button onClick={handleAddProduct} disabled={isSearchingSku}>
            {isSearchingSku ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Add Product
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground ">
              <tr>
                <th className="text-left p-3 font-semibold">Product</th>
                <th className="text-left p-3 font-semibold">SKU</th>
                <th className="text-left p-3 font-semibold">Price</th>
                <th className="text-left p-3 font-semibold">Qty</th>
                <th className="text-left p-3 font-semibold">Subtotal</th>
                <th className="text-left p-3 font-semibold1.">Remove</th>
              </tr>
            </thead>
            <tbody>
              {products?.length > 0 ? (
                products?.map((product) => {
                  const subtotal = product.mrpPrice * product.quantity;

                  return (
                    <tr key={product.id} className="border-t">
                      <td className="p-3 font-medium">{product.name}</td>
                      <td className="p-3">{product.sku}</td>
                      <td className="p-3">
                        ₹ {product?.mrpPrice?.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center border rounded w-fit">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-1 hover:bg-muted"
                          >
                            -
                          </button>
                          <span className="px-3">{product.quantity}</span>
                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-1 hover:bg-muted"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-3 font-medium">
                        ₹ {subtotal.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3">
                        <Trash2
                          size={16}
                          onClick={() => removeProduct(product.id)}
                          className="text-red-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-muted-foreground"
                  >
                    No products added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Total */}
        {/* <div className="flex justify-end text-lg font-semibold">
          Total Amount: ₹ {grandTotal.toLocaleString("en-IN")}
        </div> */}
      </Card>

      {/* Right Summary Card */}
      <Card className="p-6 space-y-3 h-fit">
        <h3 className="text-lg font-semibold">Invoice Summary</h3>

        <Row label="Base Price" value={breakdown.basePriceTotal} />

        <Row label="Value Addition (VA)" value={breakdown.vaTotal} />

        <Row label="Making Charges (MA)" value={breakdown.makingTotal} />

        <Row label="Gross Price" value={breakdown.grossTotal} />

        <Row label="Discount" value={breakdown.discountTotal} />

        <Row label="Taxable Amount" value={breakdown.taxableTotal} />

        <Row label="CGST" value={breakdown.cgstTotal} />

        <Row label="SGST" value={breakdown.sgstTotal} />

        <hr />

        <Row label="Customer Pays" value={breakdown.grandTotal} bold />

        <hr />

        <div className="pt-2 text-sm text-muted-foreground font-medium">
          Admin Only
        </div>

        <Row label="Partner Commission (2%)" value={breakdown.commission} />

        <Row label="Admin Revenue" value={breakdown.adminRevenue} bold />
      </Card>
    </div>
  );
};

export default Tables;
