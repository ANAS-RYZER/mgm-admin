import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { productCatalogue } from "@/data/sample-data";
import {
  Sparkles,
  Plus,
  Upload,
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  MoreVertical,
  Image,
  Package,
  DollarSign,
  Star,
  Calendar,
  ChevronDown,
  X,
  Save,
} from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const Products = () => {
  const [products, setProducts] = useState<Product[]>(productCatalogue);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productCatalogue);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, 
    setSelectedStatus] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const categories = [
    "all",
    "Bridal",
    "Temple",
    "Contemporary",
    "Royal",
    "Classics",
  ];
  const statuses = [
    "all",
    "In Production",
    "Low Stock",
    "Ready to Ship",
    "New Launch",
    "Best Seller",
  ];

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (product) => product.status === selectedStatus,
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedStatus]);

  const handleAddProduct = () => {
    setFormData({
      name: "",
      category: "Bridal",
      stock: 0,
      price: "",
      status: "In Production",
      rating: 0,
      description: "",
      sku: "",
      weight: "",
      material: "",
      dimensions: "",
      images: [],
    });
    setProductImages([]);
    setImageFiles([]);
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData(product);
    setProductImages(product.images || []);
    setImageFiles([]);
    setIsEditModalOpen(true);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

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
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setFormData({});
    setProductImages([]);
    setImageFiles([]);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
    }
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImageFiles = [...imageFiles, ...files];
    setImageFiles(newImageFiles);

    // Create preview URLs for the images
    const newImages = files.map((file) => URL.createObjectURL(file));
    setProductImages([...productImages, ...newImages]);
  };

  const removeImage = (index: number) => {
    const newImages = productImages.filter((_, i) => i !== index);
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setProductImages(newImages);
    setImageFiles(newFiles);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Production":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Low Stock":
        return "bg-red-100 text-red-800 border-red-200";
      case "Ready to Ship":
        return "bg-green-100 text-green-800 border-green-200";
      case "New Launch":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Best Seller":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleBulkUpload = () => {
    if (!uploadFile) return;

    // Simulate file upload with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // Parse CSV and add products
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          const lines = text.split("\n");
          const newProducts: Product[] = [];

          lines.slice(1).forEach((line, index) => {
            if (line.trim()) {
              const [name, category, stock, price, status] = line
                .split(",")
                .map((item) => item.trim());
              if (name && category && stock && price && status) {
                newProducts.push({
                  id: `prd-bulk-${Date.now()}-${index}`,
                  name,
                  category,
                  stock: parseInt(stock) || 0,
                  price,
                  status,
                  rating: 4.5,
                  updatedAt: "Just now",
                });
              }
            }
          });

          setProducts([...products, ...newProducts]);
          setUploadFile(null);
          setUploadProgress(0);
          setIsBulkUploadOpen(false);
        };
        reader.readAsText(uploadFile);
      }
    }, 200);
  };

  return (
    <AdminLayout
      title="Product Catalogue"
      description="Curate inventory, manage artisanship pipelines, and govern MGM Jewels collections."
      className="space-y-8"
    >
      <section className="">
        <Card className="border-border/60 bg-background/85 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Featured Inventory</CardTitle>
              <CardDescription>
                Monitor stock posture across hero SKUs.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsBulkUploadOpen(true)}
                variant="outline"
                className="gap-2"
              >
                <Upload className="h-4 w-4" /> Bulk Upload
              </Button>
              <Button onClick={handleAddProduct} className="gap-2">
                <Plus className="h-4 w-4" /> Add Product
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48 rounded-xl  bg-white/5 text-black backdrop-blur-sm hover:bg-white/10">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent className="z-50 w-56 rounded-2xl border border-white/10 bg-gradient-to-b from-[#2a0f1c] to-[#1f0a14] p-2 shadow-2xl backdrop-blur-xl">
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="
          rounded-lg px-3 py-2 text-sm text-white/80
          transition hover:bg-white/5 hover:text-white
          focus:bg-white/10 focus:text-white
          cursor-pointer
        "
                    >
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <SelectTrigger className="w-48 rounded-xl  bg-white/5 text-black backdrop-blur-sm hover:bg-white/10">
                  <SelectValue
                    placeholder="Select status"
                    className="text-white"
                  />
                </SelectTrigger>

                <SelectContent
                  side="bottom"
                  align="start"
                  sideOffset={8}
                  className="z-50 w-56 rounded-2xl border border-white/10 bg-gradient-to-b from-[#2a0f1c] to-[#1f0a14] p-2 shadow-2xl backdrop-blur-xl text-white"
                >
                  {statuses.map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                      className="rounded-lg px-3 py-2 text-sm !text-white/90 transition hover:bg-white/5 hover:text-white focus:bg-white/10 focus:text-white cursor-pointer"
                    >
                      {status === "all" ? "All Statuses" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Enhanced Product Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-50">
                            <Package className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              SKU: {product.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          {product.category}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-semibold",
                              product.stock < 10
                                ? "text-red-600"
                                : "text-green-600",
                            )}
                          >
                            {product.stock}
                          </span>
                          {product.stock < 10 && (
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800 border-red-200">
                              Low
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {product.price}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{product.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewProduct(product)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        {/* <Card className="border-border/60 bg-gradient-mgm text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Artisan Brief</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Share craftsmanship intent with studio leads.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Collection Name" className="bg-primary-foreground/10 border-primary-foreground/30" />
            <Textarea
              placeholder="Describe gemstone palette, motifs, and finishing standards for this launch."
              className="min-h-[180px] bg-primary-foreground/10 border-primary-foreground/30"
            />
            <Button variant="outline" className="w-full border-primary-foreground/40 text-primary-foreground">
              Dispatch to Design Studio
            </Button>
          </CardContent>
        </Card> */}
      </section>

      <section>
        <Card className="border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Custom Request Pipeline</CardTitle>
              <CardDescription>
                Map bespoke commissions to specialist ateliers.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsWorkflowModalOpen(true)}
            >
              <Sparkles className="h-4 w-4" /> Configure Workflow
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Concierge Diamonds",
                description: "4 active commissions awaiting 3D renders.",
                status: "On track",
              },
              {
                title: "Heritage Revivals",
                description: "2 antique restorations in hallmarking phase.",
                status: "QC",
              },
              {
                title: "Bridal Heirlooms",
                description: "3 multi-piece bridal sets under karigar review.",
                status: "Design review",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-card"
              >
                <p className="text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-3 text-xs font-semibold text-gold">
                  Status: {item.status}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Bulk Upload Modal */}
      <AnimatePresence>
        {isBulkUploadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsBulkUploadOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-xl border border-white/20 bg-gradient-to-b from-[#2a0f1c] to-[#1f0a14] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Bulk Upload Products
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBulkUploadOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-white/60" />
                  <p className="text-sm text-white/80 mb-2">
                    Upload CSV file with product data
                  </p>
                  <p className="text-xs text-white/60 mb-4">
                    Format: Name, Category, Stock, Price, Status
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Choose File
                    </Button>
                  </label>
                  {uploadFile && (
                    <p className="mt-2 text-xs text-yellow-400">
                      Selected: {uploadFile.name}
                    </p>
                  )}
                </div>

                {uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white/80">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsBulkUploadOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBulkUpload}
                    disabled={!uploadFile || uploadProgress > 0}
                    className="flex-1"
                  >
                    {uploadProgress > 0 ? "Uploading..." : "Upload"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-5xl rounded-3xl border border-white/15 bg-gradient-to-br from-[#2a0f1c]/90 via-[#301028]/85 to-[#15070f]/90 p-6 shadow-[0_26px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl max-h-[88vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Add New Product
                  </h3>
                  <p className="text-sm text-white/60">
                    Capture the essential details to craft a new catalogue
                    highlight.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="h-4 w-4" />
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
                      Weight
                    </label>
                    <Input
                      placeholder="Enter weight"
                      value={formData.weight || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                      className="h-11 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus-visible:border-white/60 focus-visible:ring-2 focus-visible:ring-[#f7e49b] focus-visible:ring-opacity-40 transition-colors"
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
                      className="h-11 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus-visible:border-white/60 focus-visible:ring-2 focus-visible:ring-[#f7e49b] focus-visible:ring-opacity-40 transition-colors"
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
                      className="h-11 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus-visible:border-white/60 focus-visible:ring-2 focus-visible:ring-[#f7e49b] focus-visible:ring-opacity-40 transition-colors"
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
                        onChange={handleImageUpload}
                        className="hidden"
                        id="product-image-upload"
                      />
                      <label htmlFor="product-image-upload">
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
                              onClick={() => removeImage(index)}
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
                    onClick={() => setIsAddModalOpen(false)}
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
                    Save Product
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Product Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsViewModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg rounded-xl border border-white/20 bg-gradient-to-b from-[#2a0f1c] to-[#1f0a14] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Product Details
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsViewModalOpen(false)}
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
                  {/* <div>
                    <p className="text-xs text-white/60">Status</p>
                    <div className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                      getStatusColor(selectedProduct.status)
                    )}>
                      {selectedProduct.status}
                    </div>
                  </div> */}
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
                    onClick={() => setIsViewModalOpen(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      handleEditProduct(selectedProduct);
                    }}
                    className="flex-1"
                  >
                    Edit Product
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-5xl rounded-3xl border border-white/15 bg-gradient-to-br from-[#2a0f1c]/90 via-[#301028]/85 to-[#15070f]/90 p-6 shadow-[0_26px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl max-h-[88vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
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
                  <X className="h-4 w-4" />
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
                        onChange={handleImageUpload}
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
                              onClick={() => removeImage(index)}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Product Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-xl border border-white/20 bg-gradient-to-b from-[#2a0f1c] to-[#1f0a14] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Delete Product
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100/20 mb-4">
                    <Trash2 className="h-6 w-6 text-red-400" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">
                    Delete {selectedProduct.name}?
                  </h4>
                  <p className="text-sm text-white/60">
                    This action cannot be undone. This product will be
                    permanently removed from your inventory.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    Delete Product
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Configure Workflow Modal */}
      <AnimatePresence>
        {isWorkflowModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsWorkflowModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl rounded-xl border border-white/20 bg-gradient-to-b from-[#2a0f1c] to-[#1f0a14] p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Configure Custom Request Workflow
                  </h3>
                  <p className="text-sm text-white/60 mt-1">
                    Define stages and assign specialist ateliers for bespoke
                    commissions
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsWorkflowModalOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Workflow Stages */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                    Workflow Stages
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        stage: "Initial Consultation",
                        description:
                          "Client requirements gathering and design brief",
                        duration: "1-2 days",
                      },
                      {
                        stage: "Design Sketch",
                        description: "Initial concept development and approval",
                        duration: "3-5 days",
                      },
                      {
                        stage: "3D Rendering",
                        description: "Digital modeling and visualization",
                        duration: "5-7 days",
                      },
                      {
                        stage: "Material Sourcing",
                        description: "Gemstone and metal procurement",
                        duration: "7-10 days",
                      },
                      {
                        stage: "Artisan Assignment",
                        description: "Matching with specialist karigar",
                        duration: "1-2 days",
                      },
                      {
                        stage: "Production",
                        description: "Handcrafting and assembly",
                        duration: "14-21 days",
                      },
                      {
                        stage: "Quality Assurance",
                        description: "Final inspection and certification",
                        duration: "2-3 days",
                      },
                      {
                        stage: "Delivery Coordination",
                        description: "Packaging and shipping arrangement",
                        duration: "1-2 days",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/20 border border-yellow-500/30">
                            <span className="text-xs font-semibold text-yellow-400">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {item.stage}
                            </p>
                            <p className="text-xs text-white/60">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-white/60">
                            {item.duration}
                          </span>
                          <select className="px-2 py-1 text-xs border border-white/20 rounded bg-white/10 text-white">
                            <option className="bg-[#2a0f1c]">
                              Auto-assign
                            </option>
                            <option className="bg-[#2a0f1c]">
                              Manual review
                            </option>
                            <option className="bg-[#2a0f1c]">
                              Client approval
                            </option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialist Ateliers */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5 text-yellow-400" />
                    Specialist Ateliers
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      {
                        name: "Heritage Craft Studio",
                        specialty: "Traditional Temple Jewelry",
                        capacity: "Active",
                      },
                      {
                        name: "Contemporary Design Lab",
                        specialty: "Modern Bridal Sets",
                        capacity: "Available",
                      },
                      {
                        name: "Royal Atelier",
                        specialty: "High-Value Custom Pieces",
                        capacity: "Limited",
                      },
                      {
                        name: "Diamond Workshop",
                        specialty: "Precision Stone Setting",
                        capacity: "Available",
                      },
                    ].map((atelier, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg border border-white/10 bg-white/5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-white">
                            {atelier.name}
                          </p>
                          <div
                            className={cn(
                              "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold",
                              atelier.capacity === "Active"
                                ? "bg-green-100/20 text-green-400 border-green-400/30"
                                : atelier.capacity === "Available"
                                  ? "bg-blue-100/20 text-blue-400 border-blue-400/30"
                                  : "bg-yellow-100/20 text-yellow-400 border-yellow-400/30",
                            )}
                          >
                            {atelier.capacity}
                          </div>
                        </div>
                        <p className="text-xs text-white/60">
                          {atelier.specialty}
                        </p>
                        <div className="mt-2 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-white/20 text-white hover:bg-white/10"
                          >
                            Assign
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs text-white/60 hover:text-white"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Automation Rules */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Filter className="h-5 w-5 text-yellow-400" />
                    Automation Rules
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-white/20 bg-white/10"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            Auto-assign based on value
                          </p>
                          <p className="text-xs text-white/60">
                            Orders above ₹50,000 go to Royal Atelier
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/60 hover:text-white"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-white/20 bg-white/10"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            Priority client routing
                          </p>
                          <p className="text-xs text-white/60">
                            VIP clients get dedicated artisan assignment
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/60 hover:text-white"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="rounded border-white/20 bg-white/10"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            Weekend processing
                          </p>
                          <p className="text-xs text-white/60">
                            Enable weekend workflow for urgent requests
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/60 hover:text-white"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <Button
                    variant="outline"
                    onClick={() => setIsWorkflowModalOpen(false)}
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setIsWorkflowModalOpen(false)}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Workflow Configuration
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default Products;
