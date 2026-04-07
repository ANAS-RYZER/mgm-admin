import TableComponent from "@/components/TableComponent";
import { recentOrderCols } from "../schema/recentOrderCols";

interface RecentOrder {
  orderId: string;
  amount: number;
  date: string;
}
const RecentOrders = ({ recentOrders }: { recentOrders: RecentOrder[] }) => {
  const cols = recentOrderCols();
  return (
    <div className="bg-white shadow-md p-5 rounded-md space-y-5 col-span-1 border ">
      <h1 className="text-lg font-medium mb-3">Recent Orders</h1>
      {recentOrders.length > 0 ? (
        <div>
          <TableComponent border={false} columns={cols} data={recentOrders} />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No recent orders to display.
        </p>
      )}
    </div>
  );
};

export default RecentOrders;
