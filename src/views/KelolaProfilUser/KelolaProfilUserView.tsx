import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Col, Row } from "antd";

import useAccount from "@hooks/useAccount";
import UiLoadingPage from "@components/LoadingPage/UiLoadingPage";
import UiButton from "@components/Button/UiButton";
import UbahPasswordModal from "@modals/UbahPassword/UbahPasswordModal";
import UbahProfilModal from "@modals/UbahProfil/UbahProfilModal";
import style from "./KelolaProfilUserStyle.module.scss";

interface LabelValueProps {
  label: string;
  value: string;
}

function LabelValue({ label, value }: LabelValueProps) {
  return (
    <Row className={style.labelValueContainer}>
      <Col xs={0} lg={4} />
      <Col xs={24} lg={5}>
        <label>{label}</label>
      </Col>
      <Col xs={24} lg={13}>
        <span>{value}</span>
      </Col>
      <Col xs={0} lg={4} />
    </Row>
  );
}

interface ButtonAreaProps {
  ButtonLeft: any;
  ButtonRight: any;
}

function ButtonArea({ ButtonLeft, ButtonRight }: ButtonAreaProps) {
  return (
    <Row className={style.buttonAreaContainer}>
      <Col xs={0} lg={4} />
      <Col xs={24} lg={5}>
        {ButtonLeft}
      </Col>
      <Col xs={24} lg={13} style={{ textAlign: "right" }}>
        {ButtonRight}
      </Col>
      <Col xs={0} lg={4} />
    </Row>
  );
}

export default function KelolaProfilUserView() {
  // const router = useRouter()
  const { isLoggedIn, profile, getProfile } = useAccount();

  const [displayUbahPassword, setDisplayUbahPassword] = useState(false);
  const [displayUbahProfil, setDisplayUbahProfil] = useState(false);

  if (!isLoggedIn()) {
    // router.push('/login')
    if (typeof window !== "undefined") {
      // window.location.href = '/login'
    }

    return <></>;
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section className={style.container}>
      {!isLoggedIn() && <UiLoadingPage />}

      <Head>
        <title>Kelola Profil User</title>
      </Head>

      <section>
        <h3>Profil User</h3>

        <LabelValue label={"Nama"} value={profile.nama} />
        <LabelValue label={"Username"} value={profile.username} />
        <LabelValue label={"Email"} value={profile.email} />
        <LabelValue label={"Instansi"} value={profile.instansi} />
        <LabelValue label={"Alamat Instansi"} value={profile.alamatInstansi} />
        <LabelValue label={"Role"} value={profile?.Role?.nama} />

        <ButtonArea
          ButtonLeft={
            <UiButton
              // type={'primary'}
              onClick={() => setDisplayUbahPassword(true)}
            >
              Ubah Password
            </UiButton>
          }
          ButtonRight={
            <UiButton
              // type={'primary'}
              onClick={() => setDisplayUbahProfil(true)}
            >
              Ubah Profil
            </UiButton>
          }
        />
      </section>

      <UbahPasswordModal
        open={displayUbahPassword}
        onClose={() => setDisplayUbahPassword(false)}
      />

      <UbahProfilModal
        open={displayUbahProfil}
        onClose={() => setDisplayUbahProfil(false)}
      />
    </section>
  );
}
