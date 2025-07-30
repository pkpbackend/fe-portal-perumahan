import { Col, Grid, Row, Skeleton, Space } from "antd";

import useSettingByKey from "@hooks/setting/useSettingByKey";
import style from "./FooterStyle.module.scss";
const { useBreakpoint } = Grid;

export default function FooterWidget() {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const { data: dataRelatedSites, isLoading: isLoadingRelatedSites } =
    useSettingByKey("situs");
  const { data: dataPuprApplication, isLoading: isLoadingPuprApplication } =
    useSettingByKey("aplikasipupr");
  const { data: dataContacUs, isLoading: isLoadingContacUs } =
    useSettingByKey("kontakkami");

  const relatedSites = dataRelatedSites?.params
    ? JSON.parse(dataRelatedSites.params)
    : [];
  const puprApplication = dataPuprApplication?.params
    ? JSON.parse(dataPuprApplication.params)
    : [];
  const contactUs = dataContacUs?.params ? JSON.parse(dataContacUs.params) : [];

  return (
    <section className={style.container}>
      <Row gutter={[24, 24]}>
        <Col span={24} sm={6}>
          <Space direction="vertical" size={30}>
            <div>
              <img
                src="/logo-kementrian.png"
                style={{ width: "20%", height: "20%", objectFit: "contain" }}
              />
            </div>
            {isMobile ? null : (
              <p style={{ margin: 0, color: "#80848D" }}>
                Copyright 2025. All right reserved
              </p>
            )}
            {isMobile ? null : (
              <div>
                <h3>Certified by:</h3>
                <figure>
                  <img src="/logo-bssn.png" />
                  <img src="/logo-bse.png" />
                </figure>
              </div>
            )}
          </Space>
        </Col>
        <Col span={24} sm={6}>
          <h3>Situs Terkait</h3>
          {isLoadingRelatedSites ? (
            <div>
              <Skeleton />
            </div>
          ) : (
            <ul>
              {relatedSites?.map((item) => (
                <li key={item.title}>
                  <a href={item.description} target="_blank">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Col>
        <Col span={24} sm={6}>
          <h3>Aplikasi Terkait</h3>
          {isLoadingPuprApplication ? (
            <div>
              <Skeleton />
            </div>
          ) : (
            <ul>
              {puprApplication?.map((item) => (
                <li key={item.title}>
                  <a href={item.description} target="_blank">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Col>
        <Col span={24} sm={6}>
          <h3>Kontak Kami</h3>
          {isLoadingContacUs ? (
            <div>
              <Skeleton />
            </div>
          ) : (
            <ul>
              {contactUs?.map((item) => (
                <li key={item.title}>
                  <span>{item.title}:</span>
                  <span>{item.description}</span>
                </li>
              ))}
            </ul>
          )}

          <div>
            <h3 style={{ paddingTop: 16, paddingBottom: 16 }}>
              Jumlah Pengunjung
            </h3>
            <a href="https://www.freecounterstat.com" title="website counter">
              <img
                src="https://counter3.optistats.ovh/private/freecounterstat.php?c=prtnckmk41hf99ssf4ys6bxgstlttr46"
                style={{ border: "none" }}
                title="website counter"
                alt="website counter"
              />
            </a>
          </div>
        </Col>
      </Row>
    </section>
  );
}
