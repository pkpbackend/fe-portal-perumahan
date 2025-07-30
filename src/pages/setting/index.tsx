import React, { useEffect } from "react";

import AppLayout from "@layouts/AppLayout";
import SettingView from "@views/Setting";
import useAccount from "@hooks/useAccount";
import { useRouter } from "next/router";

export default function HelpdeskPage() {
  const { profile } = useAccount();
  const router = useRouter();
  const acl = profile?.Role?.accessMenu;
  useEffect(() => {
    if (!profile || !acl.includes("superadmin_pengaturan_crud")) {
      router.push("/not-authorized");
    }
  }, []);

  if (profile && acl.includes("superadmin_pengaturan_crud")) {
    return (
      <AppLayout pageLayout>
        <SettingView />
      </AppLayout>
    );
  }
  return null;
}
