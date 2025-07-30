import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useAccount from "@hooks/useAccount"
import style from './LoginStyle.module.scss'

export default function LoginByTokenOTPView() {
  const router = useRouter()
  const { tokenOTP } = router.query
  const { postLoginByOTP } = useAccount()

  useEffect(() => {
    if (tokenOTP) {
      postLoginByOTP(String(tokenOTP))
        .then(() => router.push('/pengusulan#/pengusulan/list'))
        .catch((error) => {
          console.log(error)
          router.push('/login')
        })
    }
  }, [tokenOTP])

  return (
    <section className={style.container}>
      <Head>
        <title>Login</title>
      </Head> 
      
      <section style={{ textAlign: 'center' }}>
        Loading...
      </section>

    </section>
  )
}
