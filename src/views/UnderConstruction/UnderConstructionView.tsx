import { Col, Row, Skeleton } from "antd";
import Head from "next/head";

import style from "./UnderConstructionStyle.module.scss";

export default function UnderConstructionView() {
  return (
    <section className={style.container}>
      <Head>
        <title>Tentang</title>
      </Head>
      <div className={style.pageTitle}>
        <h2>
          Under
          <br />
          <span style={{ color: "white" }}>Construction</span>
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
                  <span className={style.tentang}>Under Construction</span>
                </div>
                <div>
                  <h3 className={style.titleTentang}>
                    Fitur ini dalam proses pembangunan, Terima Kasih
                  </h3>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </section>
  );
}
