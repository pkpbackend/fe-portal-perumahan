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
  Upload,
  message,
  notification,
  Grid,
  Modal,
  Image,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { RcFile, UploadFile } from "antd/lib/upload";
import { API_HOST } from "@config/envy";

const { useBreakpoint } = Grid;

const UploadField = ({
  onSuccessUpload,
  uploadToken,
  defaultFileList,
  onRemove,
}: {
  onSuccessUpload: (response: { fileUrl: string }) => void;
  uploadToken: string;
  defaultFileList: Array<UploadFile<any>>;
  onRemove: (file: UploadFile<any>) => void | boolean | Promise<void | boolean>;
}) => {
  return (
    <Upload
      listType="picture"
      defaultFileList={defaultFileList}
      name="document"
      action={`${API_HOST}/v3/portalperumahan/pengaturan/upload`}
      headers={{
        Authorization: `Bearer ${uploadToken}`,
      }}
      onRemove={onRemove}
      onPreview={(file) => {
        Modal.info({
          title: "Preview Banner",
          closable: true,
          maskClosable: true,
          width: "80%",
          content: (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src={file.url || file?.response?.fileUrl}
                crossOrigin="anonymous"
                alt="Banner"
                preview={false}
              />
            </div>
          ),
          okText: "Tutup",
        });
      }}
      beforeUpload={(file: RcFile) => {
        const isImage = file.type.includes("image");
        if (!isImage) {
          message.error("Format file tidak valid");
          return false;
        }
      }}
      accept={"image/*"}
      onChange={(info) => {
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
          onSuccessUpload(info.file.response);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }}
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Click to upload</Button>
    </Upload>
  );
};

const FormApplication = () => {
  const authToken = localStorage?.getItem("accessTokenInternal");

  const screens = useBreakpoint();

  const [settingKey, settingName] = useSettingSelector((state) => [
    state.setting.key,
    state.setting.name,
  ]);
  const dispatch = useSettingDispatch();

  const [form] = Form.useForm();
  const values = Form.useWatch("params", form);
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
        params: JSON.stringify(
          values.params.map((item) => ({
            title: item.title,
            description: item.description,
            logo: item.logo,
          }))
        ),
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
                      const defaultValue = form.getFieldValue([
                        "params",
                        field.name,
                        "logo",
                      ]);
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
                              <Typography.Title level={5}>
                                {`Slider ${index + 1}`}
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
                                    message: "Nama aplikasi tidak boleh kosong",
                                  },
                                ]}
                              >
                                <Input placeholder="Masukan nama aplikasi" />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                name={[field.name, "description"]}
                                label={"URL Beranda Aplikasi"}
                                required
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "URL Beranda Aplikasi tidak boleh kosong",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder={"Masukan url beranda aplikasi"}
                                />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                name={[field.name, "logo"]}
                                label={"Logo Aplikasi"}
                              >
                                <UploadField
                                  defaultFileList={
                                    defaultValue
                                      ? [
                                          {
                                            uid: "1",
                                            name: "Logo Aplikasi",
                                            status: "done",
                                            url: defaultValue,
                                            crossOrigin: "anonymous",
                                          },
                                        ]
                                      : []
                                  }
                                  uploadToken={authToken}
                                  onSuccessUpload={(response) => {
                                    form.setFieldValue(
                                      ["params", field.name, "logo"],
                                      response.fileUrl
                                    );
                                    form.validateFields([
                                      ["params", field.name, "logo"],
                                    ]);
                                  }}
                                  onRemove={() => {
                                    form.setFieldValue(
                                      ["params", field.name, "logo"],
                                      ""
                                    );
                                  }}
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
                    Tambah Slider
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

export default FormApplication;
