import React from "react";

import AppLayout from "@layouts/AppLayout";
import HelpdeskView from "@views/Helpdesk/HelpdeskView";

export default function HelpdeskPage() {
  return (
    <AppLayout pageLayout>
      <HelpdeskView />
    </AppLayout>
  );
}
