import useSettingByKey from "@hooks/setting/useSettingByKey";
import React, { useEffect } from "react";
import { closeModal, useSettingDispatch, useSettingSelector } from "../store";
import useSettingMutation from "@hooks/setting/useSettingMutation";
import {
  Button,
  Col,
  Empty,
  Form,
  Input,
  List,
  Row,
  Skeleton,
  Typography,
  notification,
  Grid,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

const FormLink = () => {
  const screens = useBreakpoint();

  const [settingKey, settingName] = useSettingSelector((state) => [
    state.setting.key,
    state.setting.name,
  ]);
  const dispatch = useSettingDispatch();

  const [form] = Form.useForm();

  const { data, isLoading, isSuccess } = useSettingByKey(settingKey);
  const mutation = useSettingMutation();

  useEffect(() => {
    if (isSuccess) {
      form.setFieldValue(
        "params",
        data?.params ? JSON.parse(data?.params) : ""
      );
    }
  }, [isSuccess]);

  async function handleSubmit(values) {
    try {
      const payload = {
        id: data?.id,
        key: settingKey,
        params: JSON.stringify(values.params),
      };
      await mutation.mutateAsync(payload);

      notification.success({
        message: "Berhasil",
        description: `Pengaturan ${settingName} berhasil disimpan`,
      });
      dispatch(closeModal());
    } catch (error) {
      notification.error({
        message: "Gagal",
        description: `Terjadi kesalahan`,
      });
    }
  }

  const isFooterContacUsKey = settingKey === "kontakkami";
  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <>
          <Form.List name="params">
            {(fields, { add, remove }) => (
              <div>
                {fields?.length > 0 ? (
                  <List
                    dataSource={fields}
                    renderItem={(field, index) => {
                      return (
                        <List.Item style={{ width: "100%", marginBottom: 24 }}>
                          <Row style={{ width: "100%" }}>
                            <Col
                              xs={24}
                              sm={2}
                              style={{
                                display: "flex",
                                alignItems: screens.xs ? "center" : "start",
                                gap: screens.xs ? 24 : 12,
                                flexDirection: screens.xs ? "row" : "column",
                                marginBottom: 12,
                              }}
                            >
                              <Typography.Title level={5} style={{ margin: 0 }}>
                                {settingKey === "kontakkami"
                                  ? `Konten ${index + 1}`
                                  : `Link ${index + 1}`}
                              </Typography.Title>
                              <Button
                                onClick={() => remove(index)}
                                danger
                                icon={<DeleteOutlined />}
                              />
                            </Col>
                            <Col xs={24} sm={22}>
                              <Form.Item
                                {...field}
                                name={[field.name, "title"]}
                                label="Nama"
                                required
                                rules={[
                                  {
                                    required: true,
                                    message: "Nama link tidak boleh kosong",
                                  },
                                ]}
                              >
                                <Input placeholder="Masukan nama link" />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                name={[field.name, "description"]}
                                label={
                                  isFooterContacUsKey
                                    ? "Deskripsi"
                                    : "URL Tujuan"
                                }
                                required
                                rules={[
                                  {
                                    required: true,
                                    message: isFooterContacUsKey
                                      ? "Deskripsi tidak boleh kosong"
                                      : "URL Tujuan tidak boleh kosong",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder={
                                    isFooterContacUsKey
                                      ? "Masukan deskripsi"
                                      : "Masukan url tujuan"
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </List.Item>
                      );
                    }}
                  />
                ) : (
                  <Empty />
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Tambah Link
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={mutation.isLoading}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            )}
          </Form.List>
        </>
      )}
    </Form>
  );
};

export default FormLink;
