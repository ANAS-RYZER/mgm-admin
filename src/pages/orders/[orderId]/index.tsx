import { AdminLayout } from "@/components/layout/AdminLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import useGetOrder from "@/hooks/orders/useGetOrder";
import UserProfileCard from "@/pages/appointments/components/UserProfileCard";
import { format } from "date-fns";
import React from "react";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import InvoiceSummary from "../components/Invoice";
import { formatINR } from "@/lib/global";
import { Package, Wallet } from "lucide-react";
import AppointmentCard from "../components/Appointment";

const OrderdetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isFetching: isOrderLoading } = useGetOrder(id as string);
  const orderData = order?.data;
  return (
    <AdminLayout
      title="Order Details"
      description="View and manage the details of this order."
      className="space-y-8"
      searchBar={false}
    >
      {isOrderLoading && (
        <div className="p-4 mt-10 text-sm text-muted-foreground">
          <LoadingSpinner label={"Loading Order Details..."} />
        </div>
      )}
      {!isOrderLoading && order && (
        <>
          <AppointmentCard appointment={orderData?.appointmentDetails} />
          <div className="grid grid-cols-3 gap-3  ">
            <div className="col-span-1 space-y-3">
              <UserProfileCard
                title="Customer Info"
                name={orderData.user.fullName}
                email={orderData.user.email}
                role="customer"
                id={
                  <>
                    User Id:
                    <span className="text-black ml-1">
                      {orderData?.user?._id}
                    </span>
                  </>
                }
              />
              <UserProfileCard
                title="Partner Info"
                name={orderData.agent.name}
                email={orderData.agent.email}
                phone={orderData.agent.phoneNumber}
                role="partner"
                id={
                  <>
                    Parnter Id:
                    <span className="text-black ml-1">
                      {orderData?.agent?.agentId}
                    </span>
                  </>
                }
              />
            </div>
            <div className="col-span-2  border rounded-lg shadow-md p-5 bg-white/50 overflow-hidden">
              <div className="flex gap-2 items-center mb-2">
                <Package size={18} className="text-gold" />
                <h1 className="font-semibold ">Products</h1>
              </div>
              <hr />
              <div className="overflow-y-auto max-h-[400px] mt-2 space-y-4">
                {orderData?.productDetails &&
                orderData?.productDetails.length > 0 ? (
                  orderData?.productDetails?.map(
                    (product: any, index: number) => (
                      <>
                        <Product
                          key={product._id}
                          name={product.name}
                          url={product.image}
                          qty={product.qty}
                          price={product.mrpPrice}
                          sku={product.sku}
                        />
                        {index < orderData?.productDetails.length - 1 && (
                          <hr className="my-4" />
                        )}
                      </>
                    ),
                  )
                ) : (
                  <p className="text-muted-foreground">No products found.</p>
                )}
                {/* <ProductCard/> */}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-2">
              <InvoiceSummary breakdown={orderData?.breakdown} />
            </div>
            <div className="col-span-2 rounded-lg shadow-md bg-gradient-mgm p-5 space-y-8">
              <div className="flex items-center gap-2">
                <Wallet size={18} className="text-gold" />
                <h1 className="text-gold text-lg font-semibold">
                  Internal Ledger
                </h1>
              </div>

              <div className="space-y-3">
                <h1 className="text-gold text-sm font-medium">
                  Partner Commission(2%)
                </h1>
                {/* if dynamic get value from dynamic */}
                <p className="text-white text-xl font-semibold">
                  {formatINR(orderData?.breakdown?.commission || 0)}
                </p>
              </div>
              <hr className="border border-muted-foreground" />
              <div className="space-y-3">
                <h1 className="text-gold text-sm font-medium">
                  Net Admin Revenue
                </h1>
                {/* if dynamic get value from dynamic */}
                <div>
                  <p className="text-white text-xl font-semibold">
                    {formatINR(orderData?.breakdown?.adminRevenue || 0)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                    <p className="text-sm italic text-muted-foreground">
                      Calculated after commisions and taxes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default OrderdetailsPage;
