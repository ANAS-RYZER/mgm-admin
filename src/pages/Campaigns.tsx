import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { campaigns } from "@/data/sample-data";
import { Calendar, Megaphone, TrendingUp, Users } from "lucide-react";

const Campaigns = () => {
  return (
    <AdminLayout
      title="Campaign Command"
      description="Synchronize MGM Jewels storytelling across retail, digital, and high-touch experiences."
      className="space-y-8"
    >
      <section className="grid gap-4 md:grid-cols-4">
        {[{
          icon: Megaphone,
          title: "Active Campaigns",
          value: "8",
          insight: "Currently live across all channels",
        },
        {
          icon: Calendar,
          title: "Upcoming Launches",
          value: "5",
          insight: "Scheduled over the next 45 days",
        },
        {
          icon: TrendingUp,
          title: "Avg ROI",
          value: "+138%",
          insight: "Performance across digital acquisition",
        },
        {
          icon: Users,
          title: "VIP Touchpoints",
          value: "214",
          insight: "Concierge engagements this month",
        }].map((metric) => (
          <Card key={metric.title} className="border-border/60 bg-background/85 shadow-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-background shadow-card">
                <metric.icon className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{metric.title}</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.insight}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="border-border/60 bg-background/85">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{campaign.title}</CardTitle>
                <CardDescription>{campaign.channel} • Budget {campaign.budget}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="border-gold/30 bg-gold/10 text-[0.65rem] text-gold">{campaign.status}</Badge>
                <Button variant="outline" size="sm">
                  View Journey
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• ROI snapshot: <span className="font-semibold text-foreground">{campaign.roi}</span></p>
              <p>• Next step: {campaign.nextAction}</p>
              <div className="rounded-xl border border-border/60 bg-background/80 p-3 text-xs">
                Channels optimized across search, paid social, and in-store clientele touches. Continue artisan-led storytelling to sustain conversion momentum.
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card className="border-border/60 bg-gradient-mgm text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Creative Studio Pipeline</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Align design, merchandising, and marketing deliverables.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {["Storyboarding", "Production", "Launch"].map((phase) => (
              <div key={phase} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-4">
                <p className="text-sm font-semibold text-primary-foreground">{phase}</p>
                <p className="mt-2 text-xs text-primary-foreground/70">
                  Pair creative with product narratives to ensure heritage and modern lines stay unmistakably MGM.
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default Campaigns;
