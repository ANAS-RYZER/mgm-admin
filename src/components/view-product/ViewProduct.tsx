import React from 'react'
import { Button } from '../ui/button';
import { Package, Star, X } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: string;
  status: string;
  rating: number;
  updatedAt: string;
  description?: string;
  images?: string[];
  sku?: string;
  weight?: string;
  material?: string;
  dimensions?: string;
}

function ViewProduct() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); 
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  
  return (
    <div>
       <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Product Details
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                //   onClick={() => setIsViewModalOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-50">
                    <Package className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {selectedProduct.name}
                    </h4>
                    <p className="text-sm text-white/60">
                      SKU: {selectedProduct.id}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/60">Category</p>
                    <p className="text-sm font-medium text-white">
                      {selectedProduct.category}
                    </p>
                  </div>
                 
                  <div>
                    <p className="text-xs text-white/60">Stock</p>
                    <p className="text-sm font-medium text-white">
                      {selectedProduct.stock} units
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Price</p>
                    <p className="text-sm font-medium text-white">
                      {selectedProduct.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-white">
                        {selectedProduct.rating}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Last Updated</p>
                    <p className="text-sm text-white">
                      {selectedProduct.updatedAt}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    // onClick={() => setIsViewModalOpen(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button
                    // onClick={() => {
                    //   setIsViewModalOpen(false);
                    //   handleEditProduct(selectedProduct);
                    // }}
                    className="flex-1"
                  >
                    Edit Product
                  </Button>
                </div>
              </div>
    </div>
  )
}

export default ViewProduct
