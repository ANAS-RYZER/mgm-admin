import TableComponent from "@/components/TableComponent";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import OrderBreakdown from "../components/orderBreakdown";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "@/pages/appointments/components/ProductCard";
import { useGetCommissionById } from "../hooks/useGetCommissionById";
import LoadingSpinner from "@/components/LoadingSpinner";

const index = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: commission, isFetching: isCommissionLoading } =
    useGetCommissionById(id as string);

  return (
    <AdminLayout
      title={`${isCommissionLoading ? "Loading" : commission?.agent?.name}'s Commission Details`}
      description="Breakdown of the agent’s commission, including earnings and calculation details."
      searchBar={false}
      isBack={true}
    >
      {isCommissionLoading && (
        <div className="p-4 mt-10 text-sm text-muted-foreground">
          <LoadingSpinner label={"Loading Commission..."} />
        </div>
      )}
      {!isCommissionLoading && (
        <div className="space-y-6">
          {/* <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">Commission Details</h1>
        </div> */}
          <div className="p-2 rounded-lg shadow-md border">
            <div className="p-4">
              <div className="flex items-center gap-4 w-full">
                <div className="w-14 h-14 rounded-full bg-gold text-primary flex items-center justify-center">
                  <p className="text-2xl font-semibold text-center">
                    {commission?.agent?.name.charAt(0)}
                  </p>
                </div>
                <div className="flex gap-2 justify-between items-center w-full">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold">
                      {commission?.agent?.name}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {commission?.agent?.email}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        Partner ID:
                      </p>
                      <p className="text-sm text-primary">
                        {commission?.agent?.agentId}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        Bank Account Number:
                      </p>
                      <p className="text-sm text-primary">
                        {commission?.agent?.accountNumber}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        Bank Name:
                      </p>
                      <p className="text-sm text-primary">
                        {commission?.agent?.bankName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-5 gap-2">
              <div className="grid col-span-3 rounded-lg shadow-md border bg-white">
                <div className=" p-4 space-y-2 ">
                  <h1 className="text-lg font-semibold">Products Ordered</h1>
                  <div className=" grid grid-cols-3 gap-2 overflow-y-auto max-h-[400px]">
                    {commission?.products?.map((product: any) => (
                      <ProductCard
                        image={product.image}
                        name={product.name}
                        sku={product.sku}
                        price={product.mrpPrice}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid col-span-2 ">
                <OrderBreakdown
                  baseValue={commission?.breakdown?.baseValue}
                  valueAddition={commission?.breakdown?.valueAddition}
                  makingCharges={commission?.breakdown?.makingCharges}
                  discountAmount={commission?.breakdown?.discount}
                  commissionAmount={commission?.commissionAmount}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default index;
