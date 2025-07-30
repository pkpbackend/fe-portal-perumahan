import { Card, Carousel, Empty, Spin, theme } from "antd";
import style from "./AnnouncementStyle.module.scss";
import Link from "next/link";
import { NotificationOutlined } from "@ant-design/icons";
import usePengumuman from "@hooks/usePengumuman";
import { handleDownloadPengumumanAttachments } from "@views/Pengumuman/PengumumanView";

const { useToken } = theme;

export default function AnnouncementWidget() {
  const { token } = useToken();

  const { data, isLoading } = usePengumuman({
    page: 1,
    pageSize: 10,
    filtered: JSON.stringify([{ id: "in$type", value: [3] }]),
  });
  return (
    <>
      <Card
        title={
          <div style={{ color: token.colorInfo }}>
            <NotificationOutlined style={{ marginRight: 10 }} />
            <span>Pengumuman</span>
          </div>
        }
        headStyle={{ background: token.colorPrimary }}
        extra={[
          <Link key="see-all-announcement" href="/pengumuman" style={{ color: token.colorInfo }}>
            Lihat Semua
          </Link>,
        ]}
        className={style.container}
        bordered={false}
      >
        {isLoading ? (
          <div style={{ display: "grid", placeItems: "center" }}>
            <Spin />
          </div>
        ) : (
          <>
            {data.data.length > 0 ? (
              <Carousel
                autoplay
                dots={false}
                adaptiveHeight
                fade
                speed={500}
                infinite
              >
                {data?.data.map((announcement) => {
                  const haveFiles = announcement.attachments?.length > 0;
                  return (
                    <div key={announcement.id}>
                      <p
                        style={{
                          marginBottom: 0,
                          cursor: haveFiles ? "pointer" : "unset",
                        }}
                        onClick={async () => {
                          if (haveFiles) {
                            await handleDownloadPengumumanAttachments(
                              announcement.attachments
                            );
                          }
                        }}
                      >
                        {announcement.description}
                      </p>
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <Empty
                description="Tidak ada pengumuman"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ margin: 0 }}
              />
            )}
          </>
        )}
      </Card>
    </>
  );
}
