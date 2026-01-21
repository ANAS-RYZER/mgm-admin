import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { collections } from "@/data/sample-data";
import { Sparkles, Edit3, Layers, CheckCircle2 } from "lucide-react";

const Collections = () => {
  return (
    <AdminLayout
      title="Collection Architecture"
      description="Guide MGM Jewels storytelling across heritage, bridal, and contemporary expressions."
      className="space-y-8"
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[{
          icon: Layers,
          title: "Active Collections",
          value: "18",
          description: "Stories currently live across channels",
        },
        {
          icon: Sparkles,
          title: "Upcoming Launches",
          value: "6",
          description: "In pre-launch narrative & merchandising",
        },
        {
          icon: Edit3,
          title: "Design In Progress",
          value: "9",
          description: "Motifs under artisan development",
        }].map((metric) => (
          <Card key={metric.title} className="border-border/60 bg-background/85 shadow-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-background shadow-card">
                <metric.icon className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{metric.title}</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        {collections.map((collection) => (
          <Card key={collection.id} className="border-border/60 bg-background/85">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{collection.title}</CardTitle>
                <CardDescription>{collection.description}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge className="border-gold/30 bg-gold/10 text-[0.65rem] text-gold">{collection.status}</Badge>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit3 className="h-4 w-4" /> Edit Narrative
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Pieces</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{collection.pieces}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Performance</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{collection.performance}</p>
                </div>
              </div>
              <Button variant="default" className="w-full gap-2 md:w-auto">
                <CheckCircle2 className="h-4 w-4" /> Approve Merchandising
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </AdminLayout>
  );
};

export default Collections;
