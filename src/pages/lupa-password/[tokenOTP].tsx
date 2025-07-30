import React from 'react'
import { useRouter } from 'next/router'
import RootLayout from '@layouts/RootLayout'
import LoginByTokenOTPView from '@views/Login/LoginByTokenOTPView'
 
export default function LoginByTokenOTPPage() {
  return (
    <RootLayout>
      <LoginByTokenOTPView />
    </RootLayout>
  )
}