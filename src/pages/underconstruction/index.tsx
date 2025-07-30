import React from "react";

import AppLayout from "@layouts/AppLayout";
import UnderConstructionView from "@views/UnderConstruction/UnderConstructionView";

export default function UnderConstructionPage() {
  return (
    <AppLayout pageLayout>
      <UnderConstructionView />
    </AppLayout>
  );
}
