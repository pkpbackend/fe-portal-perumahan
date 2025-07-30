import React from "react";

import AppLayout from "@layouts/AppLayout";
import PublicDiscussionView from "@views/PublicDiscussion/PublicDiscussionView";

export default function PublicDiscussionPage() {
  return (
    <AppLayout pageLayout>
      <PublicDiscussionView />
    </AppLayout>
  );
}
