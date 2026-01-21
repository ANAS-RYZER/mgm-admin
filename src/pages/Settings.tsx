import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Mail, Lock, ShieldCheck, Bell, Palette } from "lucide-react";

const SettingsPage = () => {
  return (
    <AdminLayout
      title="Control Center"
      description="Secure MGM Jewels operations and curate administrative workflows."
      className="space-y-8"
    >
      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60 bg-background/85">
          <CardHeader>
            <CardTitle>Brand Identity</CardTitle>
            <CardDescription>Manage visual tokens and storytelling touchpoints.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Primary Gradient
              </label>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-12 w-24 rounded-xl bg-gradient-mgm" />
                <Button variant="outline" size="sm" className="gap-2">
                  <Palette className="h-4 w-4" /> Update Palette
                </Button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Tone of Voice
              </label>
              <Textarea placeholder="Describe brand narrative and language cues for creative partners." />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-muted-foreground">
              <span>Display MGM logo on admin shell</span>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-background/85">
          <CardHeader>
            <CardTitle>Security & Access</CardTitle>
            <CardDescription>Safeguard sensitive operations and approvals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Admin Email
              </label>
              <Input placeholder="operations@mgmjewels.com" type="email" />
            </div>
            <div className="grid gap-3">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Two-factor Message
              </label>
              <Textarea placeholder="Enter custom OTP prompt for high-security login." />
            </div>
            <div className="space-y-3 text-sm">
              {["Auto-lock console after 8 minutes", "Approve high-value orders via dual control", "Log analytics exports"].map((policy) => (
                <div key={policy} className="flex items-center gap-3">
                  <Switch defaultChecked />
                  <span className="text-muted-foreground">{policy}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-gold" />
              ISO 27001 compliance audit scheduled for Feb 2026.
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-border/60 bg-background/85">
          <CardHeader>
            <CardTitle>Notification Suite</CardTitle>
            <CardDescription>Align alerts with concierge, operations, and leadership workflows.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            {[{
              title: "Order lifecycle alerts",
              description: "Notify concierge and logistics teams at every status change.",
            },
            {
              title: "High value customer touchpoints",
              description: "Ping clienteling heads for VIP anniversaries and milestone celebrations.",
            },
            {
              title: "Campaign performance digests",
              description: "Share ROI snapshots with marketing leadership every Monday.",
            }].map((item) => (
              <div key={item.title} className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background/80 px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <Switch defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Bell className="h-4 w-4" /> Configure Matrix
              </Button>
              <Badge className="border-gold/30 bg-gold/10 text-[0.65rem] text-gold">Live</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-border/60 bg-gradient-mgm text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-primary-foreground">System Credentials</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Regenerate API keys and orchestrate integrations.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {["Craftsmanship LIM integration", "Concierge CRM key", "Analytics warehouse token", "Omnichannel marketing API"].map((item) => (
              <div key={item} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-primary-foreground">{item}</p>
                  <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground">
                    Regenerate
                  </Button>
                </div>
                <p className="mt-2 text-xs text-primary-foreground/70">Last rotated 45 days ago</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default SettingsPage;
