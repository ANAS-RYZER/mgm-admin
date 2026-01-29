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
import { useNavigate } from "react-router-dom";
import CustomRequest from "@/components/custom-request/custom-request";
import EditProduct from "@/components/edit-product/EditProduct";
import DeleteProduct from "@/components/delete-product/DeleteProduct";
import ViewProduct from "@/components/view-product/ViewProduct";


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

  const navigate = useNavigate();


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

  // const handleAddProduct = () => {
  //   setFormData({
  //     name: "",
  //     category: "Bridal",
  //     stock: 0,
  //     price: "",
  //     status: "In Production",
  //     rating: 0,
  //     description: "",
  //     sku: "",
  //     weight: "",
  //     material: "",
  //     dimensions: "",
  //     images: [],
  //   });
  //   setProductImages([]);
  //   setImageFiles([]);
  //   setIsAddModalOpen(true);
  // };
  const handleAddProduct = () => {
  navigate("/products/newProduct");
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
             <ViewProduct />
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
              <EditProduct />
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
             <DeleteProduct />
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
             <CustomRequest />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </AdminLayout>
  );
};

export default Products;
