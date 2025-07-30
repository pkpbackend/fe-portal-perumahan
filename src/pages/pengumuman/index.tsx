import React from "react";

import AppLayout from "@layouts/AppLayout";
import PengumumanView from "@views/Pengumuman/PengumumanView";

export default function PengumumanPage() {
  return (
    <AppLayout pageLayout>
      <PengumumanView />
    </AppLayout>
  );
}
