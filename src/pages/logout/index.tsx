import React from 'react'

import RootLayout from '@layouts/RootLayout'
import LogoutView from '@views/Logout/LogoutView'

export default function LoginPage() {
  return (
    <RootLayout>
      <LogoutView />
    </RootLayout>
  )
}