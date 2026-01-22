import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RevenueTrendChart } from "@/components/charts/RevenueTrendChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {  revenueTrend, productCatalogue } from "@/data/sample-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download } from "lucide-react";

const Analytics = () => {
  return (
    <AdminLayout
      title="Intelligence & Insights"
      description="Decode MGM Jewels performance across commerce, craftsmanship, and concierge engagement."
      className="space-y-8"
    >
      {/* <section className="grid gap-4 md:grid-cols-4">
        {kpiMetrics.map((metric) => (
          <Card key={metric.id} className="border-border/60 bg-background/85">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                {metric.label}
              </CardTitle>
              <Badge className={`border-gold/30 ${metric.trend >= 0 ? "bg-gold/15 text-gold" : "bg-destructive/15 text-destructive"}`}>
                {metric.trend >= 0 ? "Growth" : "Dip"}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-foreground">{metric.value}</p>
              <p className={`mt-2 text-xs font-medium ${metric.trend >= 0 ? "text-gold" : "text-destructive"}`}>
                {metric.trend >= 0 ? "+" : ""}
                {metric.trend}% vs last cycle
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </section> */}

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueTrendChart data={revenueTrend} />
        </div>
        <Card className="border-border/60 bg-gradient-mgm text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Highlights</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Key momentum signals from the past quarter.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-primary-foreground/80">
            <p>• Bridal Polki collections driving <span className="font-semibold text-primary-foreground">18% uplift</span> in South India.</p>
            <p>• Concierge diamond upgrades increased average ticket size by <span className="font-semibold text-primary-foreground">₹28K</span>.</p>
            <p>• Festival omnichannel pushes contributed <span className="font-semibold text-primary-foreground">₹4.2L</span> incremental revenue.</p>
            <Button variant="outline" className="w-full border-primary-foreground/40 text-black">
              View Detailed Report
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-border/60 bg-background/85">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Contributing Pieces</CardTitle>
              <CardDescription>Identify inventory powering revenue velocity.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Piece</TableHead>
                  <TableHead>Collection</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Conversion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productCatalogue.slice(0, 4).map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <Badge className="border-gold/30 bg-gold/10 text-[0.65rem] text-gold">{product.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-foreground">{Math.round(Math.random() * 10 + 18)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/60 bg-gradient-mgm text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Channel Mix</CardTitle>
            <CardDescription className="text-primary-foreground/80">Balance omnichannel investments to sustain demand.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-primary-foreground/85">
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-4">
              <span>Showroom Experiences</span>
              <span className="font-semibold text-gold">42%</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-4">
              <span>Digital Commerce</span>
              <span className="font-semibold text-gold">33%</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-4">
              <span>Concierge & VIP</span>
              <span className="font-semibold text-gold">25%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-gradient-mgm text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Strategic Signals</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Insight-driven prompts for leadership.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-primary-foreground/85">
            {["Accelerate omni-channel bridal journeys", "Scale storytelling around temple craftsmanship", "Expand concierge upgrades in tier-1 metros"].map((signal) => (
              <div key={signal} className="flex items-start gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-4">
                <TrendingUp className="mt-1 h-4 w-4 text-gold" />
                <p>{signal}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default Analytics;
