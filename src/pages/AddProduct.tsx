import React from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, Save, Image } from "lucide-react";
import { addProductFormConfig } from "@/data/addProductFormConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddProduct() {
  return (
    <AdminLayout
      title="Product Catalogue"
      description="Curate inventory, manage artisanship pipelines, and govern MGM Jewels collections."
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex justify-between mb-8">
        <div>
          <h3 className="text-2xl font-semibold text-black">Add New Product</h3>
          <p className="text-sm text-[#505060]">
            Craft a new catalogue highlight
          </p>
        </div>
        <Button variant="ghost" size="sm" className="text-[#505060]">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Form */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {addProductFormConfig.fields
          .filter((f) => f.type !== "textarea")
          .map((field) => (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label className="text-sm text-[#505060]">{field.label}</label>

              {field.type === "select" ? (
                <Select>
                  <SelectTrigger
                    className="h-11 rounded-xl border border-[#303040] bg-white text-black
              focus:ring-2 focus:ring-[#303040] focus:border-[#505060]"
                  >
                    <SelectValue
                      placeholder={field.placeholder ?? field.label}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {(field.options ?? []).map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="h-11 rounded-xl border border-[#303040] bg-white text-black
            placeholder-[#404050] focus:ring-2 focus:ring-[#303040] focus:border-[#505060]"
                />
              )}
            </div>
          ))}
      </div>

      {/* Description */}
      <div className="mt-5">
        <label className="text-2xl text-black">Description</label>
        <Textarea
          placeholder="Describe craftsmanship..."
          className="mt-2 min-h-[100px] rounded-2xl border border-[#303040] 
              text-black placeholder-[#404050]"
        />
      </div>

      {/* Upload Block */}
      <div className="mt-6 rounded-2xl border border-dashed border-[#303040] p-6 text-center">
        <Image className="mx-auto mb-3 h-8 w-8 text-[#505060]" />
        <p className="text-sm text-black">Upload product visuals</p>
        <p className="text-xs text-[#404050]">PNG or JPG up to 10MB</p>
        <Button variant="outline" className="mt-4 rounded-full">
          <Upload className="mr-2 h-4 w-4" />
          Choose Images
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="outline"
          className="rounded-full border border-[#303040] bg-[#101010] text-white hover:bg-[#202030]"
        >
          Cancel
        </Button>
        <Button className="rounded-full border border-[#505060] bg-[#202030] text-white hover:bg-[#303040]">
          <Save className="mr-2 h-4 w-4" />
          Save Product
        </Button>
      </div>
    </AdminLayout>
  );
}

export default AddProduct;
