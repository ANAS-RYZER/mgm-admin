import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RevenueTrendChart } from "@/components/charts/RevenueTrendChart";
import {
  revenueTrend,
  productCatalogue,
  orderTimeline,
} from "@/data/sample-data";
import { Link } from "react-router-dom";
import {
  Sparkles,
  PackageSearch,
  Users,
  Megaphone,
  TrendingUp,
  ShieldCheck,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const quickActions = [
  {
    title: "Launch Campaign",
    description: "Curate an omnichannel story for the festive window.",
    icon: Megaphone,
    tone: "bg-gold/15 text-gold",
    to: "/campaigns",
  },
  {
    title: "Orchestrate Orders",
    description: "Align hallmarking, QC, and logistics milestones.",
    icon: PackageSearch,
    tone: "bg-primary-foreground/10 text-primary-foreground",
    to: "/orders",
  },
  {
    title: "Delight VIP Clients",
    description: "Plan concierge gestures for platinum patrons.",
    icon: Users,
    tone: "bg-cream-dark/30 text-cream",
    to: "/customers",
  },
];

const statIconMap = [TrendingUp, ShieldCheck, Megaphone, Calendar];

const Overview = () => {
  // const statHighlights = kpiMetrics.slice(0, 4).map((metric, index) => ({
  //   ...metric,
  //   icon: statIconMap[index] ?? TrendingUp,
  // }));

  const spotlightPieces = productCatalogue.slice(0, 4);
  const priorityOrders = orderTimeline.slice(0, 4);

  return (
    <AdminLayout
      title="Executive Overview"
      description="Monitor MGM Jewels performance across revenue, operations, and concierge delight."
      className="space-y-10"
    >
      <div className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-gold/25 bg-gradient-mgm px-10 py-12 text-primary-foreground shadow-elegant"
          >
            <div className="relative z-10 max-w-xl space-y-4">
              <p className="text-xs uppercase tracking-[0.45em] text-primary-foreground/70">
                MGM Strategic Console
              </p>
              <h1 className="font-display text-4xl font-semibold leading-tight">
                Elevate every journey from artisan bench to bridal aisle.
              </h1>
              <p className="text-sm text-primary-foreground/80">
                Stay ahead of revenue pulses, production checkpoints, and concierge touchpoints across every MGM boutique.
              </p>
             
            </div>
            
            
          </motion.div>

          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3, ease: "easeOut" }}
              >
                <Card className="border-border/50 bg-background/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex items-center gap-4 px-5 py-5">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.tone}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{action.title}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                    <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <Link to={action.to}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

     

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <RevenueTrendChart data={revenueTrend} />
          <Card className="border-border/60 bg-background/90">
            <CardHeader>
              <CardTitle>Priority Orders</CardTitle>
              <CardDescription>Live commissions requiring leadership oversight.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {priorityOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-background/80 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer} • {order.channel}</p>
                  </div>
                  <div className="text-right text-xs">
                    <Badge className="border-gold/30 bg-gold/10 text-[0.65rem] text-gold">{order.status}</Badge>
                    <p className="mt-1 font-semibold text-foreground">{order.value}</p>
                  </div>
                </div>
              ))}
              <Button asChild variant="primary" className="w-full justify-center text-sm font-semibold ">
                <Link to="/orders">View full production board</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Overview;
