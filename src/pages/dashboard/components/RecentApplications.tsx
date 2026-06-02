"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGetAllApplications from "@/hooks/applications/useGetApplications";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const RecentApplications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const { data: applications, isFetching: isLoadingApplications } =
    useGetAllApplications({
      status,
      search,
      page: page,
      limit,
    });
  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Applications
          </h2>

          <p className="text-sm text-slate-500">
            View your latest customer applications.
          </p>
        </div>

        <Button variant="link" onClick={() => navigate("/applications")}>
          View All
        </Button>
      </div>

      <div className="space-y-1">
        {applications?.data?.map((application: any) => (
          <div
            key={application._id}
            className="flex items-center justify-between gap-3 py-4 border-b border-slate-200 last:border-none"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold shrink-0
                ${
                  application.status === "approved"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }
              `}
              >
                {application.name
                  ?.split(" ")
                  ?.map((word: string) => word[0])
                  ?.join("")
                  ?.slice(0, 2)
                  ?.toUpperCase()}
              </div>

              <div>
                <h3 className="font-semibold text-slate-700 text-base leading-none truncate">
                  {application.name}
                </h3>

                <p className="text-xs text-slate-500 truncate mt-1">
                  {application.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:justify-end">
              <Badge
                className={`rounded-full px-2 py-1 text-xs font-medium border
                    ${
                      application.status === "approved"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
                    }
                  `}
              >
                {application.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentApplications;
