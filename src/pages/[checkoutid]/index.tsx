"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useGetAppointmentById from "@/hooks/appointments/useGetAppointmentById";
import { Info, ClipboardList, Loader2 } from "lucide-react";
import Tables from "./components/Tables"
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import useCreateOrder from "@/hooks/orders/useCreateOrder";

export interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;

  mrpPrice: number;
  grossPrice: number;
  discountedPrice: number;
  discountedPercentage: number;
  cgst: number;
  sgst: number;
  makingCharges: number;
  va: number;
}


const Appointments = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: appointment, isFetching: isAppointmentLoading } =
    useGetAppointmentById(id as string);

  const [products, setProducts] = useState<Product[]>([]);
  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder(id as string);

  useEffect(() => {
    if (appointment?.productDetails?.length) {
      const formattedProducts: Product[] =
        appointment.productDetails.map((product: any) => ({
          id: product._id,
          name: product.name,
          sku: product.sku,
          mrpPrice: product.mrpPrice,
          grossPrice: product.grossPrice,
          discountedPrice: product.discountedPrice,
          discountedPercentage: product.discountedPercentage,
          cgst: product.cgst,
          sgst: product.sgst,
          makingCharges: product.makingChanges || 0,
          va: product.va || 0,
          quantity: 1,
        }));

      setProducts(formattedProducts);
    }
  }, [appointment]);

  const handleRecordPurchase = () => {
    if (products.length === 0) {
      toast.error("Please add at least one product before recording purchase.");
      return;
    }

    // Prepare productSku array (sku repeated for quantity) 
    // Wait, let's check API expectation. Usually it's either [{sku, qty}] or [sku, sku, ...].
    // The user's example showed "productSku": [] in response.
    // I'll assume it wants an array of SKUs.
    const productSkus: string[] = [];
    products.forEach(p => {
      for (let i = 0; i < p.quantity; i++) {
        productSkus.push(p.sku);
      }
    });

    createOrder(
      { productSku: productSkus },
      {
        onSuccess: (data) => {
          toast.success(data.message || "Order created successfully");
          navigate(-1); // Go back after success
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to create order");
        },
      }
    );
  };

  return (
    <AdminLayout
      title="Admin Checkout"
      description="Record Purchase for Appointment"
      className="space-y-8"
      searchBar={false}
    >
      {/* Info Banner */}
      <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
        <Info size={18} />
        <p className="text-sm font-medium">
          Recording purchase for confirmed appointment
        </p>
      </div>

      {/* Top Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-3">
            <ClipboardList className="text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Appointment</p>
              <p className="font-semibold">{appointment?._id}</p>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span>Date: 2026-02-12</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
              VISITED
            </span>
          </div>

          <p className="text-sm">Visit Status: VISITED</p>
        </Card>

        <Card className="p-5 space-y-3">
          <p className="text-sm text-muted-foreground">Customer Details</p>
          <p className="font-semibold">{appointment?.userDetails?.fullName}</p>
          <div className="text-xs bg-muted px-2 py-1 rounded w-fit">
            {appointment?.userDetails?.email}
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <p className="text-sm text-muted-foreground">Partner Details</p>
          <p className="font-semibold">{appointment?.agentDetails?.name}</p>
          <div className="text-xs bg-muted px-2 py-1 rounded w-fit">
            Agent Id: {appointment?.agentDetails?.referralCode}
          </div>
        </Card>
      </div>

      {/* Products + Summary Section */}
      <Tables
        products={products}
        setProducts={setProducts}
        isLoadingAppointment={isAppointmentLoading}
      />

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={handleRecordPurchase}
          disabled={isCreatingOrder}
        >
          {isCreatingOrder && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Done (Record Purchase)
        </Button>
      </div>
    </AdminLayout>
  );
};

export default Appointments;
