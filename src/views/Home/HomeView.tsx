import CarouselWidget from "@widgets/Carousel/CarouselWidget";
import PetaWidget from "@widgets/PetaSebaran/PetaWidget";
import PortalWidget from "@widgets/Portal/PortalWidget";
import PortalMobileWidget from "@widgets/PortalMobile/PortalMobileWidget";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { HomePageProps } from "@pages/index";
import AnnouncementWidget from "@widgets/Announcment/AnnouncementWidget";
import { App, Button, Grid, Modal, Space, Typography, theme } from "antd";
import style from "./HomeStyle.module.scss";
const { useToken } = theme;

const { useBreakpoint } = Grid;
export default function HomeView({ bannerItems }: HomePageProps) {
  const router = useRouter();
  const { token } = useToken();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const { notification } = App.useApp();

  function openNotification() {
    notification.open({
      key: "survei",
      closeIcon: null,
      message: (
        <div>
          <div
            style={{
              width: "calc(100% + 48px)",
              backgroundColor: token.colorPrimary,
              height: 80,
              marginLeft: -24,
              marginTop: -20,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
          <div
            style={{
              marginTop: -40,
              marginLeft: 20,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="/images/icon-warn.png"
              alt="icon survey"
              className="absolute top-9 left-0 right-0 m-auto"
            />
          </div>

          <Typography.Title level={5} style={{ color: token.colorPrimary }}>
            Ayo ikuti survei Kepuasan Pelayanan Publik
          </Typography.Title>
        </div>
      ),

      description: (
        <div>
          <Typography.Paragraph type="secondary">
            Masukkan Anda sangat membantu kami dalam meningkatkan Pelayanan
            Publik.
          </Typography.Paragraph>

          <div
            style={{
              display: "flex",
              gap: 24,
              width: "100%",
              marginTop: "1.5rem",
            }}
          >
            <Button
              onClick={() => {
                notification.destroy("survei");
              }}
              size="large"
              block
            >
              Batal
            </Button>

            <Button
              type="primary"
              block
              size="large"
              onClick={() => {
                notification.destroy("survei");
                router.push("/survey/1");
              }}
            >
              Ikuti Survey
            </Button>
          </div>
        </div>
      ),
      placement: "bottomRight",
      // duration: 4.5,
      duration: 9999,
    });
  }

  useEffect(() => {
    openNotification();
  }, []);

  return (
    <section className={style.container}>
      {/* <Head>
        <title>Beranda</title>
      </Head>  */}

      <section>
        <CarouselWidget bannerItems={bannerItems} />
      </section>
      <AnnouncementWidget />
      <section>{isMobile ? <PortalMobileWidget /> : <PortalWidget />}</section>
      {/* <section>
        <PetaWidget />
      </section> */}
      <Button ghost onClick={openNotification} className={style.btnNotif}>
        <img src="/images/icon-notifikasi.png" alt="notification icon" />
      </Button>
    </section>
  );
}
