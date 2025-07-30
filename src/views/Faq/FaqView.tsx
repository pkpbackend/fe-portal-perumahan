import React, { useState } from "react";
import Head from "next/head";
import Icon, { ArrowRightOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Icon as FaqIcon } from "@images/icons/PdfIcon";
import style from "./FaqStyle.module.scss";
import useFaq from "@hooks/useFaq";
import { Pagination, theme } from "antd";

const iconStyle = {
  width: 50,
  height: 50,
  alignItems: "center",
  marginRight: 18,
};
const { useToken } = theme;

export default function FaqView() {
  const { token } = useToken();

  const [pagination, setPagination] = useState({ page: 1, pageSize: 5 });
  const [accordion, setAccordion] = useState([]);

  const { data: Faq } = useFaq(pagination);

  const accordionState = (id) => {
    let allAccordion = [...accordion];
    if (!allAccordion?.includes(id)) {
      allAccordion?.push(id);
    } else {
      allAccordion = allAccordion?.filter((x) => x !== id);
    }
    setAccordion(allAccordion);
  };

  const RawHTML = ({ children, className = "" }) => (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, "<br />") }}
    />
  );
  return (
    <section className={style.container}>
      <Head>
        <title>FAQ</title>
      </Head>
      <div className={style.pageTitle}>
        <h2 style={{ color: token.colorInfo }}>FAQ</h2>
      </div>

      <section className={"wrapper"}>
        <div className={style.content}>
          <h3 className={style.titleFaq} style={{ color: token.colorPrimary }}>
            Frequently Asked Questions (FAQ)
          </h3>
          {pagination.page === 1 && (
            <a href="/tentang">
              <div className={style.layout}>
                <div>
                  <Icon style={iconStyle} component={FaqIcon} />
                </div>
                <div className={style.titleLayout}> Tentang Sibaru </div>
              </div>

              <ArrowRightOutlined style={{ marginRight: 20 }} />
            </a>
          )}
          {Faq?.data?.map((faq) => (
            <>
              <div
                onClick={() => accordionState(faq?.id)}
                className={style.accordion}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: accordion?.includes(faq?.id) && 0,
                }}
              >
                <div className={style.layout}>
                  <div className={style.titleLayout}>{faq?.question}</div>
                </div>
                {accordion?.includes(faq?.id) ? (
                  <ArrowDownOutlined style={{ marginRight: -5 }} />
                ) : (
                  <ArrowRightOutlined style={{ marginRight: 0 }} />
                )}
              </div>
              {accordion?.includes(faq?.id) && (
                <div
                  className={style.accordionChild}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <RawHTML>{faq?.answer}</RawHTML>
                </div>
              )}
            </>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 100,
          }}
        >
          <Pagination
            total={Faq?.total}
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
