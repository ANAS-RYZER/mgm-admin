"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  MoreVertical,
  Phone,
  Clock,
  MapPin,
  Calendar,
} from "lucide-react";
import { partners } from "@/data/appointments";

export default function AppointmentPartners() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<"partners" | "individuals">(
    "partners",
  );

  const date = new Date();

  return (
    <AdminLayout
      title="Appointments & Scheduling"
      description="Manage partner and individual client bookings."
      className="space-y-6"
    >
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="h-4 w-4" />
        <span>
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "partners" ? "secondary" : "ghost"}
          className="rounded-full"
          onClick={() => setActiveTab("partners")}
        >
          Partners
        </Button>

        <Button
          variant={activeTab === "individuals" ? "secondary" : "ghost"}
          className="rounded-full"
          onClick={() => setActiveTab("individuals")}
        >
          Individuals
        </Button>
      </div>

      {partners.map((partner) => (
        <Card key={partner.id} className="border-border/60 bg-background/90">
          <div
            onClick={() => setOpenId(openId === partner.id ? null : partner.id)}
            className="flex cursor-pointer items-center justify-between px-6 py-4"
          >
            <div>
              <p className="font-semibold">{partner.name}</p>
              
            </div>
            <div className="flex items-center gap-3">
              <Badge>{partner.usersCount} Users</Badge>
              <ChevronDown
                className={`h-5 w-5 transition ${
                  openId === partner.id ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {openId === partner.id && partner.users.length > 0 && (
            <CardContent className="pt-0">
              <div className="divide-y rounded-xl border">
                {partner.users.map((user, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-3 items-center px-4 py-3 text-sm"

                  >
                    {/* Name */}
                    <div className="flex flex-col">
                      <p className="font-medium">{user.name}</p>
                      <p className="font-light">{user.phone}</p>
                    </div>

                    {/* Time */}
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {user.time}
                    </div>

                   <div className="flex justify-end p-2 gap-3">

                      <Button  size="sm" className="gap-20">
                        {user.button}
                      </Button>
                       <Button  size="sm" className="gap-20">
                        {user.button2}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </AdminLayout>
  );
}
