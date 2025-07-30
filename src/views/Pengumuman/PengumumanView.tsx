import { Card, Empty, Pagination, Skeleton, theme } from "antd";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import Head from "next/head";
import { saveAs } from "file-saver";
const { useToken } = theme;

import usePengumuman, { PengumumanAttachment } from "@hooks/usePengumuman";
import { useState } from "react";
import style from "./PengumumanStyle.module.scss";
import JSZip from "jszip";

export async function handleDownloadPengumumanAttachments(
  attachments: PengumumanAttachment[]
) {
  const zip = new JSZip();
  for (const attachment of attachments) {
    const response = await fetch(attachment.s3url);
    const blob = await response.blob();
    zip.file(attachment.filename, blob);
  }
  const zipData = await zip.generateAsync({
    type: "blob",
    streamFiles: true,
  });
  saveAs(zipData, `attachments.zip`);
}
export default function HelpdeskView() {
  const { token } = useToken();

  const [pagination, setPagination] = useState({ page: 1, pageSize: 5 });
  const { data, isLoading } = usePengumuman({
    ...pagination,
    filtered: JSON.stringify([{ id: "in$type", value: [3] }]),
  });

  return (
    <section className={style.container}>
      <Head>
        <title>Pengumuman | SIBARU</title>
      </Head>
      <div className={style.pageTitle}>
        <h2 style={{ color: token.colorInfo }}>PENGUMUMAN</h2>
      </div>

      <section className={"wrapper"}>
        <div className={style.content}>
          <h3 className={style.title} style={{ color: token.colorPrimary }}>
            Pengumuman
          </h3>
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} bordered={false}>
                  <Skeleton />
                </Card>
              ))}
            </>
          ) : (
            <>
              {data.data?.length > 0 ? (
                <>
                  {data?.data.map((announcement) => {
                    const haveFiles = announcement.attachments?.length > 0;
                    return (
                      <Card key={announcement.id} bordered={false}>
                        <div className="date">
                          {format(parseISO(announcement.createdAt), "PPpp", {
                            locale: id,
                          })}
                        </div>
                        <p
                          className="description"
                          style={{
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
                      </Card>
                    );
                  })}
                  <Pagination
                    total={data?.totalRow}
                    hideOnSinglePage
                    current={pagination.page}
                    defaultCurrent={1}
                    onChange={(value) => {
                      setPagination((prev) => ({ ...prev, page: value }));
                    }}
                  />
                </>
              ) : (
                <Empty
                  description="Tidak ada Pengumuman"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </>
          )}
        </div>
      </section>
    </section>
  );
}
