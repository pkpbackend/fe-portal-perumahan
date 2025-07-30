import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import useAccount from '@hooks/useAccount'
import { useRouter } from 'next/router'

export default function LogoutView() {
  const router = useRouter()
  const { postLogout } = useAccount()
  const [stateText, setStateText] = useState('Loading...')

  useEffect(() => {
    postLogout()
      .then(() => router.push('/login'))
      .catch(() => setStateText('Logout failed'))
  }, [])

  return (
    <section>
      <Head>
        <title>Logout</title>
      </Head> 
      
      <div style={{ textAlign: 'center' }}>{stateText}</div>
    </section>
  )
}
