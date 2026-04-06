import { Card, CardContent } from "@/components/ui/card";
import React, { useMemo } from "react";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);

interface OrderBreakdownProps {
  baseValue?: number;
  valueAddition?: number;
  makingCharges?: number;
  discountAmount?: number; // backend can send 593 or -593, both handled as discount
  commissionRate?: number; // can be 10 (percent) or 0.1
  commissionAmount?: number; // use this directly when backend provides final amount
}

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const OrderBreakdown = ({
  baseValue,
  valueAddition,
  makingCharges,
  discountAmount,
  commissionRate,
  commissionAmount,
}: OrderBreakdownProps) => {
  const normalizedDiscount = useMemo(
    () => -Math.abs(toNumber(discountAmount)),
    [discountAmount],
  );

  const breakdownItems = useMemo(
    () => [
      { label: "Base Value", amount: toNumber(baseValue) },
      { label: "Value Addition", amount: toNumber(valueAddition) },
      { label: "Making Charges", amount: toNumber(makingCharges) },
      { label: "Discount Amount", amount: normalizedDiscount },
    ],
    [baseValue, valueAddition, makingCharges, normalizedDiscount],
  );

  const totalAmount = useMemo(
    () => breakdownItems.reduce((sum, item) => sum + item.amount, 0),
    [breakdownItems],
  );
  const partnerCommission = useMemo(() => {
    const normalizedCommissionAmount = toNumber(commissionAmount);
    if (normalizedCommissionAmount > 0) {
      return normalizedCommissionAmount;
    }

    const normalizedRate = toNumber(commissionRate);
    const rate = normalizedRate > 1 ? normalizedRate / 100 : normalizedRate;
    return totalAmount * rate;
  }, [totalAmount, commissionRate, commissionAmount]);

  return (
    <div className="p-2 rounded-lg shadow-md border bg-white">
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-primary">Order Breakdown</h2>

          <div className="space-y-3">
            {breakdownItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <p className="text-base text-muted-foreground">{item.label}</p>
                <p
                  className={`text-lg font-medium ${
                    item.amount < 0 ? "text-red-500" : "text-primary"
                  }`}
                >
                  {formatCurrency(item.amount)}
                </p>
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-border" />

          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-primary">Total Amount</p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(totalAmount)}
            </p>
          </div>

          <div className="h-px w-full bg-border" />

          <div className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-primary">
                Partner Commission
              </p>
              <p className="text-2xl font-bold text-gold">
                {formatCurrency(partnerCommission)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBreakdown;