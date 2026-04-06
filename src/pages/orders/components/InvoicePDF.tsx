import { formatDate } from "date-fns";

export const transformOrderToInvoice = (order: any) => {
  const round = (n: number) => Number(n.toFixed(2));

  return {
    logo: "public/assets/logo.png",

    invoiceNumber: order._id.slice(-6).toUpperCase(),
    date: formatDate(new Date(order.createdAt), "dd/MM/yyyy"),
    orderId: order._id,

    company: {
      name: "MGM Mega Gold Mart",
      address: "xxxxx address",
      email: "xxxxx@mail.com",
      gst: "27XXXXXXX",
    },

    customer: {
      name: order.user.fullName,
      email: order.user.email,
      address: "N/A",
    },

    agent: {
      name: order.agent?.name,
      phone: order.agent?.phoneNumber,
    },

    items: order.productDetails.map((p: any) => ({
      name: p.name,
      sku: p.sku,
      qty: 1,
      weight: "-",
      va: round(order.breakdown.vaTotal),
      making: round(order.breakdown.makingTotal),
      price: round(p.discountedPrice),
      total: round(p.discountedPrice),
    })),

    subtotal: round(order.breakdown.basePriceTotal),
    discount: round(order.breakdown.discountTotal),
    cgst: round(order.breakdown.cgstTotal),
    sgst: round(order.breakdown.sgstTotal),
    total: round(order.breakdown.grandTotal),
  };
};

const format = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(n);

export const Invoice = ({ data }: any) => {
  return (
    <div
      id="invoice"
      className="bg-white text-black w-[794px] h-[1123px] relative"
    >
      {/* Header */}
      <div className="border-b-4 border-gold pb-4 flex justify-between items-center bg-gradient-mgm p-10">
        <div className="flex items-center gap-3">
          <img src={"/mgm.png"} className="h-14" alt="MGM Logo" />
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500 uppercase">Sale Invoice</p>
          <p className="font-semibold text-white">{data.invoiceNumber}</p>
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-2 gap-8 mt-6 text-sm px-10">
        <div>
          <p className="font-semibold text-gray-700">Bill To</p>
          <p>{data.customer.name}</p>
          <p>{data.customer.email}</p>
          <p>{data.customer.address}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Company</p>
          <p>{data.company.address}</p>
          <p>{data.company.email}</p>
          <p>GSTIN: {data.company.gst}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-3 gap-6 mt-6 text-sm px-10">
        <div>
          <p className="text-gray-500">Date</p>
          <p>{data.date}</p>
        </div>
        {/* <div>
          <p className="text-gray-500">Order ID</p>
          <p>{data.orderId}</p>
        </div> */}
        <div>
          <p className="text-gray-500">Handled By</p>
          <p>{data.agent?.name}</p>
          <p>{data.agent?.phone}</p>
        </div>
      </div>

      {/* Table */}
      <div className="px-10">
        <table className="w-full mt-8 text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Product</th>
              <th>Qty</th>
              <th>VA</th>
              <th>Making</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((item: any, i: number) => (
              <tr key={i} className="border-t break-inside-avoid">
                <td className="p-2">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                </td>
                <td className="text-center font-semibold">{item.qty}</td>
                <td className="text-center font-semibold">{format(item.va)}</td>
                <td className="text-center font-semibold">
                  {format(item.making)}
                </td>
                <td className="text-center font-semibold">
                  {format(item.price)}
                </td>
                <td className="text-right pr-2  font-semibold">
                  {format(item.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-8 flex justify-end px-10">
        <div className="w-[280px] text-md space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">{format(data.subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <span className="font-semibold">{format(data.discount)}</span>
          </div>

          <div className="flex justify-between">
            <span>CGST</span>
            <span className="font-semibold">{format(data.cgst)}</span>
          </div>

          <div className="flex justify-between">
            <span>SGST</span>
            <span className="font-semibold">{format(data.sgst)}</span>
          </div>

          <div className="border-t pt-2 flex justify-between font-bold text-lg text-gold">
            <span>Total</span>
            <span className="font-semibold">{format(data.total)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10  pt-4 text-xs text-gray-500 px-10">
        <p>This is a computer-generated invoice.</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <img src="/mgm-2.png" className="h-40 -translate-y-20 -translate-x-3" />
      </div>
    </div>
  );
};
