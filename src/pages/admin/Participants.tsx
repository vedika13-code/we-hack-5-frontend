import { AdminShell } from "./components/AdminShell";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { EmptyState } from "./components/FeedbackStates";

export default function AdminParticipants() {
  return (
    <AdminShell>
      <AdminPageHeader
        title="Participants"
        description="Browse the directory of all individual registered participants."
      />
      <EmptyState
        title="API Integration Required"
        message="The participant directory endpoint is not currently exposed in the backend API. Please request the backend team to add a participant list endpoint to proceed with this view."
      />
    </AdminShell>
  );
}
