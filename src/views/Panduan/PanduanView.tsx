import Head from "next/head";
import { useState } from "react";

import { ArrowRightOutlined } from "@ant-design/icons";
import usePanduan from "@hooks/usePanduan";
import { Pagination, Skeleton, theme } from "antd";
import dynamic from "next/dynamic";
import style from "./PanduanStyle.module.scss";
import { Icon as PdfIcon } from "@images/icons/PdfIcon";
const { useToken } = theme;

const PreviewDocument = dynamic(
  () => import("@components/PreviewDocument/PreviewDocument"),
  {
    ssr: false,
  }
);

export default function PanduanView() {
  const { token } = useToken();

  const [pagination, setPagination] = useState({ page: 1, pageSize: 5 });

  const { data, isLoading } = usePanduan(pagination);

  return (
    <section className={style.container}>
      <Head>
        <title>Panduan</title>
      </Head>
      <div className={style.pageTitle}>
        <h2 style={{ color: token.colorInfo }}>
          PANDUAN
          <br />
          <span style={{ color: "white" }}>SIBARU</span>
        </h2>
      </div>

      <section className={"wrapper"}>
        <div>
          {isLoading ? (
            <div>
              {Array.from(
                { length: pagination.pageSize },
                (_, index) => index
              ).map((value) => (
                <div className={style.content} key={value}>
                  <Skeleton paragraph={{ rows: 1 }} />
                </div>
              ))}
            </div>
          ) : (
            <>
              {data?.data?.map((panduan) =>
                panduan?.attachments?.[0]?.s3url ? (
                  <PreviewDocument
                    renderButton={
                      <div className={style.content}>
                        <div className={style.contentText}>
                          <div className={style.contentIcon}>
                            <PdfIcon />
                          </div>
                          {panduan?.title}
                        </div>
                        <ArrowRightOutlined />
                      </div>
                    }
                    fileUrl={panduan?.attachments?.[0]?.s3url}
                  />
                ) : (
                  <p className={style.content}>{panduan?.title}</p>
                )
              )}
            </>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 100,
            paddingTop: "1.5rem",
          }}
        >
          <Pagination
            simple
            disabled={isLoading}
            total={data?.totalRow}
            current={pagination.page}
            defaultCurrent={1}
            hideOnSinglePage
            pageSize={pagination.pageSize}
            onChange={(value) => {
              setPagination((prev) => ({ ...prev, page: value }));
            }}
          />
        </div>
      </section>
    </section>
  );
}
