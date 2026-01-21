import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { topCustomers } from "@/data/sample-data";
import { Sparkles, Gift, Mail, Phone } from "lucide-react";

const Customers = () => {
  return (
    <AdminLayout
      title="Clienteling & VIP"
      description="Delight patrons with bespoke concierge touchpoints and lifetime value insights."
      className="space-y-8"
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[{
          title: "Active Platinum",
          value: "128",
          insight: "Top-tier patrons engaged this quarter",
        },
        {
          title: "Bridal Concierge",
          value: "56",
          insight: "Personal shoppers handling bridal journeys",
        },
        {
          title: "Anniversary Outreach",
          value: "94",
          insight: "Upcoming milestone celebrations",
        }].map((item) => (
          <Card key={item.title} className="border-border/60 bg-background/85 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-foreground">{item.value}</p>
              <p className="mt-2 text-xs text-muted-foreground">{item.insight}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="">
        <Card className="border-border/60 bg-background/85">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Lifetime Value Clients</CardTitle>
              <CardDescription>Focus on relationship building with high repeat engagement.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Sparkles className="h-4 w-4" /> Concierge Board
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead className="text-right">Lifetime Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium text-foreground">{customer.name}</TableCell>
                    <TableCell>{customer.city}</TableCell>
                    <TableCell>
                      <Badge className="border-gold/30 bg-gold/10 text-[0.65rem] text-gold">{customer.tier}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-foreground">{customer.lifetimeValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* <Card className="border-border/60 bg-gradient-mgm text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Concierge Playbook</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Personalized gestures that uphold MGM heritage."
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-primary-foreground/80">
            <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-4">
              <p className="font-semibold text-primary-foreground">Design Reveal Evenings</p>
              <p className="mt-1 text-xs">
                Schedule intimate previews with artisans highlighting the story behind every piece.
              </p>
              <div className="mt-3 flex gap-2 text-xs">
                <Badge className="border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground">
                  <Gift className="mr-1 h-3 w-3" /> Invite-only
                </Badge>
              </div>
            </div>
            <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-4">
              <p className="font-semibold text-primary-foreground">Milestone Campaigns</p>
              <p className="mt-1 text-xs">
                Curate bespoke gifts for anniversaries with handcrafted notes from the design head.
              </p>
              <div className="mt-3 flex gap-2 text-xs">
                <Badge className="border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground">
                  <Mail className="mr-1 h-3 w-3" /> CRM
                </Badge>
                <Badge className="border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground">
                  <Phone className="mr-1 h-3 w-3" /> Concierge
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full border-primary-foreground/40 text-primary-foreground">
              View Clienteling Calendar
            </Button>
          </CardContent>
        </Card> */}
      </section>
    </AdminLayout>
  );
};

export default Customers;
