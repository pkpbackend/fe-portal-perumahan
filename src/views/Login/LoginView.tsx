import { LoginWidget } from "@modals/Login/LoginModal";
import Head from "next/head";
import { useState } from "react";

import style from "./LoginStyle.module.scss";

export default function LoginView() {
  const [resetToken, setResetToken] = useState("");

  return (
    <section className={style.container}>
      <Head>
        <title>Login</title>
      </Head>

      <section>
        <LoginWidget setResetToken={setResetToken} />
      </section>
    </section>
  );
}
