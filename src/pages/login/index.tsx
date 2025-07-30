import React from "react";
import { useSearchParams } from "next/navigation";

import AppLayout from "@layouts/AppLayout";
import LoginView from "@views/Login/LoginView";

import RootLayout from "@layouts/RootLayout";
import LoginByTokenOTPView from "@views/Login/LoginByTokenOTPView";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const otp = searchParams.get("otp");

  if (otp) {
    return (
      <RootLayout>
        <LoginByTokenOTPView />
      </RootLayout>
    );
  }

  return (
    <AppLayout>
      <LoginView />
    </AppLayout>
  );
}
