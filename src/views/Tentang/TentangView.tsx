import { Col, Row, Skeleton } from "antd";
import Head from "next/head";

import useSettingByKey from "@hooks/setting/useSettingByKey";
import style from "./TentangStyle.module.scss";

export default function FaqView() {
  const { data: dataAbout, isLoading } = useSettingByKey("tentang");
  const about = dataAbout?.params;

  return (
    <section className={style.container}>
      <Head>
        <title>Tentang</title>
      </Head>
      <div className={style.pageTitle}>
        <h2>
          TENTANG
          <br />
          <span style={{ color: "white" }}>SIBARU</span>
        </h2>
      </div>

      <section className="wrapper">
        <div className={style.content}>
          <Row>
            <Col span={24} md={10}>
              <div className={style.image}>
                <div className={style.backgroundImage}>
                  <img
                    src="/tentang.svg"
                    alt="Gambar"
                    className={style.imageTentang}
                  />
                </div>
              </div>
            </Col>
            <Col span={24} md={14}>
              <div className={style.deskripsi}>
                <div style={{ display: "flex", marginBottom: 20 }}>
                  <div className={style.lineTentang}></div>
                  <span className={style.tentang}>Tentang</span>
                </div>
                <div>
                  <h3 className={style.titleTentang}>
                    Sistem Informasi Bantuan
                    <br />
                    Perumahan (SIBARU)
                  </h3>
                </div>
                {isLoading ? (
                  <div style={{ marginTop: 20 }}>
                    <Skeleton />
                    <Skeleton />
                  </div>
                ) : (
                  <div
                    style={{ marginTop: 20 }}
                    dangerouslySetInnerHTML={{ __html: about }}
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </section>
  );
}
