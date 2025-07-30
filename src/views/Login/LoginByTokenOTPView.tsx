import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useAccount from "@hooks/useAccount";
import style from "./LoginStyle.module.scss";
import { useSearchParams } from "next/navigation";

export default function LoginByTokenOTPView() {
  const router = useRouter();
  const { tokenOTP } = router.query;
  const { postLoginByOTP } = useAccount();

  const searchParams = useSearchParams();
  const otp = searchParams.get("otp");

  useEffect(() => {
    if (otp) {
      postLoginByOTP(String(otp))
        .then(() => router.push("/pengusulan-bsps#/pengusulan/list"))
        .catch((error) => {
          console.log(error);
          router.push("/login");
        });
    }
  }, [otp]);

  return (
    <section className={style.container}>
      <Head>
        <title>Login</title>
      </Head>

      <section style={{ textAlign: "center" }}>Loading...</section>
    </section>
  );
}
