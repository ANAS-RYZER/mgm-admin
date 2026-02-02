import { AdminLayout } from "@/components/layout/AdminLayout";
import useGetApplicationById from "@/hooks/applications/useGetApplicationById";
import { useParams } from "react-router-dom";
import ApplicationTopBar from "./components/ApplicationTopBar";
import InfoCard from "./components/InfoCard";
import DocumentViewer from "./components/DocumentViewer";
import { LoaderCircle } from "lucide-react";
import useUpdateStatusApplication from "@/hooks/applications/useUpdateStatusApplication";
import { toast } from "sonner";

const ApplicationReviewPage = () => {
  const { id } = useParams();

  const { data: application, isFetching: isLoading } = useGetApplicationById({
    id: id as string,
  });

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateStatusApplication();

  const handleUpdateStatus = (status: "approved" | "rejected") => {
    updateStatus(
      {
        applicationId: id as string,
        status,
      },
      {
        onSuccess: () => {
          toast.success("Application Approved successfully");
        },
        onError: (err) => {
          console.error(err);
          toast.error("There was an error updating the application status");
        },
      },
    );
  };

  return (
    <AdminLayout
      title={`Application - ${isLoading ? "..." : !application ? "Not Found" : application?.name}`}
      description="Review and approve agent application"
      searchBar={false}
    >
      {isLoading && (
        <div className="flex items-center justify-center p-10 text-muted-foreground">
          <LoaderCircle size={50} className=" animate-spin text-gold" />
        </div>
      )}
      {!application && !isLoading && (
        <p className="text-center text-muted-foreground">
          Application not found.
        </p>
      )}
      {application && (
        <div className="space-y-6">
          <ApplicationTopBar
            applicationId={application?.agentId}
            status={application?.status}
            onUpdateStatus={handleUpdateStatus}
            isUpdating={isUpdating}
          />

          <InfoCard
            title="Personal Information"
            items={[
              { label: "Full Name", value: application?.name },
              { label: "Email", value: application?.email },
              { label: "Phone", value: application?.phoneNumber },
              {
                label: "Date of Birth",
                value: new Date(application?.dob).toDateString(),
              },
            ]}
          />

          <InfoCard
            title="Bank Details"
            items={[
              {
                label: "Account Holder",
                value: application?.bankDetails.accountHolderName,
              },
              {
                label: "Bank Name",
                value: application?.bankDetails.bankName,
              },
              {
                label: "Account Number",
                value: application?.bankDetails.accountNumber,
              },
              {
                label: "IFSC",
                value: application?.bankDetails.ifscCode,
              },
            ]}
          />

          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">Government ID</h3>
            <DocumentViewer
              type={application?.governmentId.type}
              url={application?.governmentId.documentUrl}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ApplicationReviewPage;
