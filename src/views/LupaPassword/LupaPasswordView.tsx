import { LupaPasswordWidget } from "@modals/LupaPassword/LupaPasswordModal";
import Head from "next/head";
import { useState } from "react";

import style from "./LupaPasswordStyle.module.scss";

export default function LupaPasswordView() {
  const [resetToken, setResetToken] = useState("");

  return (
    <section className={style.container}>
      <Head>
        <title>Lupa Password</title>
      </Head>

      <section>
        <LupaPasswordWidget setResetToken={setResetToken} />
      </section>
    </section>
  );
}
