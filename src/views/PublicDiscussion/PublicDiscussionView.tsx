import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Form,
  Grid,
  Row,
  Skeleton,
} from "antd";
import { AxiosError } from "axios";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";

import UiButton from "@components/Button/UiButton";
import UiInputTextarea from "@components/Input/UiInputTextarea";
import useCreateHelpdeskDiscussionChat from "@hooks/useCreateHelpdeskDiscussionChat";
import useGetDirektorat from "@hooks/useGetDirektorat";
import useGetHelpdesk from "@hooks/useGetHelpdesk";
import useGetHelpdeskChats from "@hooks/useGetHelpdeskDiscussionChats";
import { useState } from "react";
import ModalCloseTicket from "./ModalCloseTicket/ModalCloseTicket";
import style from "./PublicDiscussionStyle.module.scss";

const FormItem = Form.Item;
const { useBreakpoint } = Grid;

export default function PublicDiscussionView() {
  const router = useRouter();
  const paramId = router?.query?.id as string;
  const [openModalConfirmCloseTicket, setOpenModalConfirmCloseTicket] =
    useState(false);

  const screens = useBreakpoint();
  const { data: dataDirektorat } = useGetDirektorat();
  const createDiscussionChatMutation = useCreateHelpdeskDiscussionChat();
  const {
    data: dataChats,
    isLoading: isLoadingDataChats,
    isFetching: isFetchingDataChats,
  } = useGetHelpdeskChats({ helpdeskId: paramId });

  const {
    data: dataHelpdesk,
    isLoading: isLoadingDataHelpdesk,
    isFetching: isFetchingDataHelpdesk,
  } = useGetHelpdesk(paramId);

  return (
    <>
      <section className={style.container}>
        <Head>
          <title>Diskusi Publik | HELPDESK | SIBARU</title>
        </Head>
        <Link href="/helpdesk">
          <h2>
            HELPDESK
            <br />
            <span style={{ color: "white" }}>SIBARU</span>
          </h2>
        </Link>

        <section className={style.wrapper}>
          <div className={style.content}>
            <div className={style["ticket-title"]}>
              <h3>
                {isLoadingDataHelpdesk || isFetchingDataHelpdesk ? (
                  <Skeleton paragraph={{ rows: 1 }} />
                ) : (
                  <>
                    [Tiket #{dataHelpdesk?.id}] {dataHelpdesk?.title}
                  </>
                )}
              </h3>
            </div>
            <Row gutter={[36, 36]} style={{ flexWrap: "wrap-reverse" }}>
              <Col xs={24} sm={24} md={18}>
                {isLoadingDataChats || isFetchingDataChats ? (
                  <>
                    <Skeleton
                      className={style["chat-item-skeleton"]}
                      avatar
                      paragraph={{ rows: 2 }}
                    />
                    <Skeleton
                      className={style["chat-item-skeleton"]}
                      avatar
                      paragraph={{ rows: 2 }}
                    />
                    <Skeleton
                      className={style["chat-item-skeleton"]}
                      avatar
                      paragraph={{ rows: 2 }}
                    />
                    <Skeleton
                      className={style["chat-item-skeleton"]}
                      avatar
                      paragraph={{ rows: 2 }}
                    />
                  </>
                ) : (
                  <>
                    {dataChats?.length > 0 ? (
                      <div className={style["chat-wrapper"]}>
                        {dataChats?.map((chat) => (
                          <div key={chat.id} className={style["chat-item"]}>
                            <div className={style["chat-title-wrapper"]}>
                              <div className={style["chat-username"]}>
                                <Avatar
                                  style={{ background: "#7A92AA" }}
                                  size="large"
                                  icon={<UserOutlined />}
                                />
                                <span>
                                  {chat?.HelpdeskUser?.internalUserId
                                    ? chat?.HelpdeskUser.internalUserDetail.nama
                                    : chat?.HelpdeskUser?.name ?? "User"}
                                </span>
                              </div>
                              <div className={style["chat-date"]}>
                                {format(parseISO(chat.createdAt), "PPpp", {
                                  locale: id,
                                })}
                              </div>
                            </div>
                            <div className={style["chat-body"]}>
                              {chat.chat}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </>
                )}

                {dataHelpdesk && dataHelpdesk.status === false ? (
                  <>
                    <Formik
                      initialValues={{
                        chat: "",
                      }}
                      validationSchema={Yup.object().shape({
                        chat: Yup.string().required("Wajib diisi"),
                      })}
                      onSubmit={async (
                        values,
                        { setSubmitting, resetForm }
                      ) => {
                        try {
                          await createDiscussionChatMutation.mutateAsync({
                            id: `${dataHelpdesk.id}`,
                            HelpdeskUserId: dataHelpdesk.HelpdeskUserId,
                            chat: values.chat,
                          });
                          resetForm();
                        } catch (error: AxiosError | any) {
                        } finally {
                          setSubmitting(false);
                        }
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                      }) => (
                        <Form onFinish={handleSubmit} layout="vertical">
                          <FormItem
                            htmlFor="chat"
                            validateStatus={
                              errors.chat && touched.chat ? "error" : ""
                            }
                            help={
                              errors.chat && touched.chat ? errors.chat : null
                            }
                          >
                            <UiInputTextarea
                              id="chat"
                              name="chat"
                              value={values.chat}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={isSubmitting}
                              rows={4}
                            />
                          </FormItem>

                          <div>
                            <UiButton
                              size="large"
                              htmlType="submit"
                              type="primary"
                              block={!screens.md}
                              style={{
                                paddingLeft: "2rem",
                                paddingRight: "2rem",
                              }}
                              loading={isSubmitting}
                            >
                              Kirim
                            </UiButton>
                            {!screens.md && !dataHelpdesk?.status ? (
                              <Button
                                size="large"
                                danger
                                block
                                style={{ marginTop: "1rem" }}
                                onClick={() =>
                                  setOpenModalConfirmCloseTicket(true)
                                }
                              >
                                Tutup Tiket
                              </Button>
                            ) : null}
                          </div>
                        </Form>
                      )}
                    </Formik>
                    <ModalCloseTicket
                      open={openModalConfirmCloseTicket}
                      onClose={() => setOpenModalConfirmCloseTicket(false)}
                      helpdeskId={dataHelpdesk?.id}
                      helpdeskUserId={dataHelpdesk?.HelpdeskUserId}
                    />
                  </>
                ) : null}
              </Col>
              <Col xs={24} sm={24} md={6}>
                {isLoadingDataHelpdesk || isFetchingDataHelpdesk ? (
                  <Skeleton />
                ) : (
                  <>
                    {dataHelpdesk && (
                      <>
                        <Descriptions
                          size="small"
                          colon={false}
                          column={1}
                          layout="vertical"
                          labelStyle={{
                            paddingBottom: 0,
                          }}
                          contentStyle={{
                            fontFamily: "Myriad Pro light",
                            fontSize: "16px",
                            color: "#80848d",
                            marginTop: "-8px",
                          }}
                        >
                          <Descriptions.Item label="Direktorat">
                            {dataHelpdesk?.Direktorat?.name}
                          </Descriptions.Item>
                          <Descriptions.Item label="Topik">
                            {dataHelpdesk?.topikDiskusi?.name}
                          </Descriptions.Item>
                          <Descriptions.Item label="Status">
                            {dataHelpdesk?.status ? "Selesai" : "Belum Selesai"}
                          </Descriptions.Item>
                        </Descriptions>
                        {screens.md && !dataHelpdesk?.status ? (
                          <div style={{ marginTop: "2rem" }}>
                            <Button
                              size="large"
                              block
                              danger
                              onClick={() =>
                                setOpenModalConfirmCloseTicket(true)
                              }
                            >
                              Tutup Tiket
                            </Button>
                          </div>
                        ) : null}
                      </>
                    )}
                  </>
                )}
              </Col>
            </Row>
          </div>
        </section>
        <ModalCloseTicket
          open={openModalConfirmCloseTicket}
          onClose={() => setOpenModalConfirmCloseTicket(false)}
          helpdeskId={dataHelpdesk?.id}
          helpdeskUserId={dataHelpdesk?.HelpdeskUserId}
        />
      </section>
    </>
  );
}
