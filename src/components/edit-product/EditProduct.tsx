import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Save, Upload } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { Input} from '../ui/input'
import { X } from 'lucide-react'
import { Image } from 'lucide-react'
import { productCatalogue } from '@/data/sample-data'

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

function EditProduct() {
    const [formData, setFormData] = useState<Partial<Product>>({});
    const [productImages, setProductImages] = useState<string[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>(productCatalogue);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const categories = ["all", "Bridal", "Luxury", "Everyday", "Limited"];
    const statuses = ["all", "In Production", "Available", "Out of Stock", "Discontinued"];
    const handleSaveProduct = () => {
    if (isAddModalOpen) {
      const newProduct: Product = {
        id: `prd-${Date.now()}`,
        name: formData.name || "",
        category: formData.category || "Bridal",
        stock: formData.stock || 0,
        price: formData.price || "",
        status: formData.status || "In Production",
        rating: formData.rating || 0,
        updatedAt: "Just now",
        description: formData.description,
        sku: formData.sku,
        weight: formData.weight,
        material: formData.material,
        dimensions: formData.dimensions,
        images: productImages,
      };
      setProducts([...products, newProduct]);
    } else if (isEditModalOpen && selectedProduct) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                ...formData,
                updatedAt: "Just now",
                images: productImages,
              }
            : p,
        ),
      );
    }

  };
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Edit Product
                  </h3>
                  <p className="text-sm text-white/60">
                    Fine-tune catalogue details to keep inventory narratives
                    current.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X  className="h-4 w-4" /> 
                </Button>
              </div>

              <div className="space-y-5">
                <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white/80">
                      Product Name
                    </label>
                    <Input
                      placeholder="Enter product name"
                      value={formData.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-11 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus-visible:border-white/60 focus-visible:ring-2 focus-visible:ring-[#f7e49b] focus-visible:ring-opacity-40 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white/80">
                      Category
                    </label>
                    <select
                      value={formData.category || "Bridal"}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="h-11 w-full rounded-xl border border-white/20 bg-white/10 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#f7e49b] focus:ring-opacity-40 focus:border-white/60 transition-colors"
                    >
                      {categories
                        .filter((cat) => cat !== "all")
                        .map((category) => (
                          <option
                            key={category}
                            value={category}
                            className="bg-[#2a0f1c]"
                          >
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white/80">
                      SKU
                    </label>
                    <Input
                      placeholder="Enter SKU"
                      value={formData.sku || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, sku: e.target.value })
                      }
                      className="h-11 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus-visible:border-white/60 focus-visible:ring-2 focus-visible:ring-[#f7e49b] focus-visible:ring-opacity-40 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white/80">
                      Price
                    </label>
                    <Input
                      placeholder="Enter price"
                      value={formData.price || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="h-11 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus-visible:border-white/60 focus-visible:ring-2 focus-visible:ring-[#f7e49b] focus-visible:ring-opacity-40 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white/80">
                      Stock Quantity
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter stock quantity"
                      value={formData.stock || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: parseInt(e.target.value) || 0,
                        })
                      }
                      className="h-11 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus-visible:border-white/60 focus-visible:ring-2 focus-visible:ring-[#f7e49b] focus-visible:ring-opacity-40 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white/80">
                      Status
                    </label>
                    <select
                      value={formData.status || "In Production"}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="h-11 w-full rounded-xl border border-white/20 bg-white/10 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#f7e49b] focus:ring-opacity-40 focus;border-white/60 transition-colors"
                    >
                      {statuses
                        .filter((status) => status !== "all")
                        .map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="bg-[#2a0f1c]"
                          >
                            {status}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white/80">
                      Weight
                    </label>
                    <Input
                      placeholder="Enter weight"
                      value={formData.weight || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                      className="h-11 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus-visible;border-white/60 focus-visible:ring-2 focus-visible:ring-[#f7e49b] focus-visible:ring-opacity-40 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white/80">
                      Material
                    </label>
                    <Input
                      placeholder="Enter material"
                      value={formData.material || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, material: e.target.value })
                      }
                      className="h-11 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus-visible;border-white/60 focus-visible:ring-2 focus-visible:ring-[#f7e49b] focus-visible:ring-opacity-40 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white/80">
                      Dimensions
                    </label>
                    <Input
                      placeholder="Enter dimensions"
                      value={formData.dimensions || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, dimensions: e.target.value })
                      }
                      className="h-11 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus-visible;border-white/60 focus-visible:ring-2 focus-visible:ring-[#f7e49b] focus-visible:ring-opacity-40 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-white/80">
                      Rating
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      placeholder="Enter rating (0-5)"
                      value={formData.rating || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rating: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="h-11 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus-visible;border-white/60 focus-visible:ring-2 focus-visible:ring-[#f7e49b] focus-visible:ring-opacity-40 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2 xl:col-span-3">
                  <label className="block text-sm font-medium text-white/80">
                    Description
                  </label>
                  <Textarea 
                    placeholder="Describe craftsmanship, gem palette, and signature finish"
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="min-h-[96px] rounded-2xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus-visible:border-white/60 focus-visible:ring-2 focus-visible:ring-[#f7e49b] focus-visible:ring-opacity-40 transition-colors"
                  />
                </div>

                <div className="space-y-3 xl:col-span-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">
                        Product Images
                      </p>
                      <p className="text-xs text-white/50">
                        Showcase hero angles, detail macro shots, and artisan
                        signatures.
                      </p>
                    </div>
                    {productImages.length > 0 && (
                      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/60">
                        {productImages.length} image
                        {productImages.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-5 text-center backdrop-blur-xl">
                      <Image className="mx-auto mb-3 h-9 w-9 text-white/60" /> 
                      <p className="text-sm text-white/80">
                        Upload product visuals
                      </p>
                      <p className="text-xs text-white/50">
                        PNG or JPG up to 10MB • Multiple files allowed
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        // onChange={handleImageUpload}
                        className="hidden"
                        id="edit-product-image-upload"
                      />
                      <label htmlFor="edit-product-image-upload">
                        <Button
                          variant="outline"
                          className="mt-3 cursor-pointer rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Choose Images
                        </Button>
                      </label>
                    </div>

                    {productImages.length > 0 && (
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {productImages.map((image, index) => (
                          <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md"
                          >
                            <img
                              src={image}
                              alt={`Product image ${index + 1}`}
                              className="h-24 w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
                            <Button
                              variant="ghost"
                              size="sm"
                            //   onClick={() => removeImage(index)}
                              className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full border border-white/40 bg-white/20 text-white opacity-0 transition-all hover:bg-red-600/90 hover:border-red-400 group-hover:opacity-100"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-0 sm:flex-row sm:justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-2 text-white transition hover:bg-white/10 sm:flex-none"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProduct}
                    className="flex-1 rounded-full border border-white/30 bg-white/15 px-6 py-2 text-white backdrop-blur-2xl shadow-[0_16px_45px_rgba(8,7,18,0.3)] transition hover:bg-white/25 hover:shadow-[0_22px_55px_rgba(9,9,21,0.38)] sm:flex-none"
                  >
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/30 bg-white/10">
                      <Save className="h-3.5 w-3.5" />
                    </span>
                    Update Product
                  </Button>
                </div>
              </div>
    </div>
  )
}

export default EditProduct
