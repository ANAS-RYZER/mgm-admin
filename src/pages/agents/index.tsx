import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/TableComponent";
import useGetAllApplications from "@/hooks/applications/useGetApplications";
import { agentListCols } from "./schema/agentListCols";
import useGetAllAgents from "@/hooks/agents/useGetAllAgents";

const Agents = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<string>("");

  const cols = agentListCols();

  const { data: agents, isFetching: isLoadingAgents } = useGetAllAgents();

  return (
    <AdminLayout
      title="Agent Management"
      description="Manage your agents and their details"
      className="space-y-8"
      searchBar={false}
    >
      <section className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Agents</h2>
            <p className="text-sm text-muted-foreground">
              Monitor agents activities and performance.
            </p>
          </div>

          {/* Future action button */}
          {/*
          <Button
            onClick={() => navigate("/add-agent")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Application
          </Button>
          */}
        </div>

        {/* Search */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl  bg-background">
          {isLoadingAgents ? (
            <div className="flex items-center justify-center p-10 text-muted-foreground">
              <LoaderCircle size={50} className=" animate-spin text-gold" />
            </div>
          ) : (
            <TableComponent columns={cols} data={agents} model="Agents" />
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default Agents;
