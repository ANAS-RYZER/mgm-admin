import { Receipt } from "lucide-react";
import Row from "./Row";

const InvoiceSummary = ({ breakdown }: { breakdown: any }) => {
  return (
    <div className=" rounded-lg shadow-md border p-5 space-y-3 w-full ">
      <div className="flex items-center gap-2">
        <Receipt size={18} className="text-gold" />
        <h2 className="text-lg font-semibold">Invoice Summary</h2>
      </div>

      <Row label="Base Price" value={breakdown.basePriceTotal} />
      <Row label="Value Addition (VA)" value={breakdown.vaTotal} />
      <Row label="Making Charges (MA)" value={breakdown.makingTotal} />

      <hr className="border-dashed border-muted-foreground/50" />

      <Row label="Gross Price" value={breakdown.grossTotal} />

      {/* 🔥 Handle negative discount properly */}
      <Row
        label="Discount"
        value={Math.abs(breakdown.discountTotal)}
        isNegative={breakdown.discountTotal > 0}
      />

      <Row label="Taxable Amount" value={breakdown.taxableTotal} />
      <Row label="CGST" value={breakdown.cgstTotal} />
      <Row label="SGST" value={breakdown.sgstTotal} />

      <hr className="border-dashed border-muted-foreground/50" />

      <Row label="Customer Paid" value={breakdown.grandTotal} bold />

      {/* <hr />

      <p className="text-sm text-muted-foreground font-medium">Admin Only</p>

      <Row label="Partner Commission (2%)" value={breakdown.commission} />

      <Row label="Admin Revenue" value={breakdown.adminRevenue} bold /> */}
    </div>
  );
};

export default InvoiceSummary;
