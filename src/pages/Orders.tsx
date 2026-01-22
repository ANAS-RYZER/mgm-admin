import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { orderTimeline } from "@/data/sample-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Truck, Workflow, X, Clock4, Sparkles, Users2 } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Orders = () => {
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  return (
    <AdminLayout
      title="Order Orchestration"
      description="Track production, hallmarking, and dispatch SLAs across every MGM Jewels order."
      className="space-y-8"
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[{ title: "In Production", value: "18", delta: "+3" }, { title: "QC & Hallmark", value: "9", delta: "-1" }, { title: "Ready to Dispatch", value: "11", delta: "+2" }].map((item) => (
          <Card key={item.title} className="border-border/60 bg-background/85 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <p className="text-3xl font-semibold text-foreground">{item.value}</p>
              <span className={`text-sm font-medium ${item.delta.startsWith("-") ? "text-destructive" : "text-gold"}`}>
                {item.delta} today
              </span>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-5">
        <Card className="border-border/60 bg-gradient-mgm text-primary-foreground lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Logistics Window</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Synchronise hallmarking, insurance, and delivery commitments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-primary-foreground">Hallmark Batches</p>
                <p className="text-xs text-primary-foreground/70">4 batches in queue • 3 hours turnaround</p>
              </div>
              <Badge className="border-primary-foreground/40 bg-primary-foreground/20 text-primary-foreground">
                Priority
              </Badge>
            </div>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <p>• Consolidate Chennai and Hyderabad consignments for overnight dispatch.</p>
              <p>• Confirm insurance appraisal for high-value Polki bridal sets.</p>
              <p>• Update concierge team with expected delivery windows for platinum patrons.</p>
            </div>
            <Button variant="outline" className="w-full">
              Manage Dispatch Board
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-background/85 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Order Production Timeline</CardTitle>
              <CardDescription>Live updates across jewellery manufacturing, polishing, and packaging.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setIsWorkflowModalOpen(true)}
              >
                <Workflow className="h-4 w-4" /> Workflow
              </Button>
              <Button
                variant="default"
                size="sm"
                className="gap-2"
                onClick={() => setIsCalendarModalOpen(true)}
              >
                <Calendar className="h-4 w-4" /> Manufacturing Calendar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderTimeline.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-foreground">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge className="border-gold/30 bg-gold/10 text-[0.65rem] text-gold">{order.status}</Badge>
                    </TableCell>
                    <TableCell>{order.channel}</TableCell>
                    <TableCell className="text-right font-semibold text-foreground">{order.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-border/60 bg-background/90">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Dispatch Checkpoints</CardTitle>
              <CardDescription>Audit shipment readiness before handover to logistics partners.</CardDescription>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsPartnerModalOpen(true)}
            >
              <Truck className="h-4 w-4" /> Partner Matrix
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {["Hallmark verified", "Insurance documents", "Packaging approved", "Concierge update", "Payment settled", "Dispatch window"].map((step) => (
              <div key={step} className="rounded-2xl border border-border/60 bg-background/85 p-4 shadow-card">
                <p className="text-sm font-semibold text-foreground">{step}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Ensure documentation is uploaded to the order workspace before greenlighting dispatch.
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <AnimatePresence>
        {isWorkflowModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setIsWorkflowModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-4xl rounded-3xl border border-white/15 bg-gradient-to-br from-[#1a0b14]/95 via-[#240f1e]/90 to-[#0f060b]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="flex items-center gap-2 text-2xl font-semibold text-white">
                    <Sparkles className="h-5 w-5 text-yellow-400" /> Production Workflow Snapshot
                  </h3>
                  <p className="text-sm text-white/60">
                    Monitor atelier handoffs, approvals, and QA checkpoints before dispatch readiness.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsWorkflowModalOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[{
                  stage: "Design Freeze",
                  owner: "Creative Studio",
                  notes: "Client-approved renders locked for production",
                  eta: "Completed"
                }, {
                  stage: "Casting & Stone Setting",
                  owner: "Heritage Workshop",
                  notes: "22k temple bangle casting with Polki setting",
                  eta: "Due in 18 hrs"
                }, {
                  stage: "Hallmark & QA",
                  owner: "Quality Cell",
                  notes: "BIS hallmark slot secured for morning batch",
                  eta: "Scheduled"
                }, {
                  stage: "Packaging & Concierge",
                  owner: "Client Experience",
                  notes: "Custom monogram boxes prepared, concierge briefing pending",
                  eta: "Pending assignment"
                }].map((item) => (
                  <div key={item.stage} className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-white">{item.stage}</p>
                      <span className="text-xs text-white/60">{item.eta}</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70">Owner: {item.owner}</p>
                    <p className="mt-2 text-xs text-white/50">{item.notes}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[{
                  label: "Average cycle time",
                  value: "6.5 days",
                  accent: "bg-emerald-400/20 text-emerald-300 border-emerald-300/40"
                }, {
                  label: "Orders awaiting QA",
                  value: "5",
                  accent: "bg-yellow-400/20 text-yellow-200 border-yellow-300/40"
                }, {
                  label: "Expedite requests",
                  value: "2",
                  accent: "bg-pink-400/20 text-pink-200 border-pink-300/40"
                }].map((metric) => (
                  <div key={metric.label} className={`rounded-2xl border ${metric.accent} px-4 py-3 text-sm font-medium`}> 
                    <p className="text-xs uppercase tracking-wide text-white/60">{metric.label}</p>
                    <p className="mt-2 text-xl">{metric.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCalendarModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCalendarModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-5xl rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c101d]/95 via-[#12162a]/92 to-[#060811]/95 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.55)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="flex items-center gap-2 text-2xl font-semibold text-white">
                    <Clock4 className="h-5 w-5 text-sky-300" /> Manufacturing Calendar
                  </h3>
                  <p className="text-sm text-white/60">
                    Align ateliers, hallmarking slots, and logistics pickups against capacity.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCalendarModalOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="grid grid-cols-7 gap-3 text-center text-xs text-white/60">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-7 gap-3 text-sm">
                    {[...Array(28)].map((_, index) => {
                      const day = index + 1;
                      const isBooked = [2, 5, 8, 12, 18, 19, 23, 26].includes(day);
                      return (
                        <div
                          key={day}
                          className={`flex h-16 flex-col items-center justify-center rounded-xl border ${
                            isBooked ? "border-sky-400/40 bg-sky-400/15 text-white" : "border-white/10 bg-white/5 text-white/60"
                          }`}
                        >
                          <span className="text-sm font-medium">{day}</span>
                          {isBooked && <span className="mt-1 text-[10px] uppercase tracking-wide">Booked</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  {[{
                    title: "Casting Line",
                    detail: "Scheduled downtime for maintenance on 19th",
                    tone: "border-orange-300/40 bg-orange-300/15 text-orange-200"
                  }, {
                    title: "Hallmarking",
                    detail: "Slots secured for platinum collection on 23rd",
                    tone: "border-green-300/40 bg-green-300/15 text-green-200"
                  }, {
                    title: "Logistics Pickup",
                    detail: "Hyderabad route consolidation on 26th",
                    tone: "border-sky-300/40 bg-sky-300/15 text-sky-200"
                  }].map((item) => (
                    <div key={item.title} className={`rounded-2xl border ${item.tone} p-4 text-sm`}> 
                      <p className="text-base font-semibold">{item.title}</p>
                      <p className="mt-2 text-xs opacity-80">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPartnerModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setIsPartnerModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-4xl rounded-3xl border border-white/15 bg-gradient-to-br from-[#14110f]/95 via-[#1d1916]/92 to-[#0c0a09]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="flex items-center gap-2 text-2xl font-semibold text-white">
                    <Users2 className="h-5 w-5 text-amber-300" /> Logistics Partner Matrix
                  </h3>
                  <p className="text-sm text-white/60">
                    Benchmark partner SLAs, insured value limits, and bespoke service tiers.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[{
                  name: "BlueDart Elite",
                  tier: "Concierge",
                  sla: "24 hr metro, insured up to ₹1.2 Cr",
                  notes: "White-glove delivery with jewellery specialist escort."
                }, {
                  name: "Sequel Logistics",
                  tier: "Secure",
                  sla: "36 hr tier-1, 48 hr tier-2",
                  notes: "High-value vault transfers with real-time telemetry."
                }, {
                  name: "Delhivery Luxe",
                  tier: "Express",
                  sla: "48 hr all-India",
                  notes: "Best suited for contemporary SKUs under ₹25L."
                }, {
                  name: "Regional Artisans Guild",
                  tier: "Special Route",
                  sla: "Custom",
                  notes: "Trusted for handcrafted shipments within Tamil Nadu."
                }].map((partner) => (
                  <div key={partner.name} className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-lg font-semibold text-white">{partner.name}</p>
                      <Badge className="border-white/20 bg-white/10 text-[0.65rem] text-white">{partner.tier}</Badge>
                    </div>
                    <p className="mt-2 text-xs text-white/60">
                      SLA: {partner.sla}
                    </p>
                    <p className="mt-3 text-sm text-white/70">{partner.notes}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[{
                  label: "Average damage claims",
                  value: "0.4%",
                  accent: "border-emerald-300/40 bg-emerald-300/15 text-emerald-200"
                }, {
                  label: "Active concierge deliveries",
                  value: "3",
                  accent: "border-amber-300/40 bg-amber-300/15 text-amber-200"
                }, {
                  label: "Routes pending confirmation",
                  value: "2",
                  accent: "border-red-300/40 bg-red-300/15 text-red-200"
                }].map((metric) => (
                  <div key={metric.label} className={`rounded-2xl border ${metric.accent} px-4 py-3 text-sm font-medium`}> 
                    <p className="text-xs uppercase tracking-wide text-white/60">{metric.label}</p>
                    <p className="mt-2 text-xl">{metric.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default Orders;
