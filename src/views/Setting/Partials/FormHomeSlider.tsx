import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { API_HOST, REVALIDATE_TOKEN } from "@config/envy";
import useSettingByKey from "@hooks/setting/useSettingByKey";
import useSettingMutation from "@hooks/setting/useSettingMutation";
import {
  Button,
  Col,
  Empty,
  Form,
  Grid,
  Image,
  Input,
  List,
  Modal,
  Row,
  Skeleton,
  Typography,
  Upload,
  message,
  notification,
} from "antd";
import { RcFile, UploadFile } from "antd/lib/upload";
import axios from "axios";
import { useEffect } from "react";
import { closeModal, useSettingDispatch, useSettingSelector } from "../store";

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
const FormHomeSlider = () => {
  const authToken = localStorage?.getItem("accessTokenInternal");
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
        params: JSON.stringify(
          values.params.map((item) => ({
            title: item.title,
            description: item.description,
            filepathDesktop: item.filepathDesktop,
            filepathMobile: item.filepathMobile,
          }))
        ),
      };
      await mutation.mutateAsync(payload);

      notification.success({
        message: "Berhasil",
        description: `Pengaturan ${settingName} berhasil disimpan`,
      });
      await axios.get(`/api/revalidate?token=${REVALIDATE_TOKEN}`);
      dispatch(closeModal());
    } catch (error) {
      notification.error({
        message: "Gagal",
        description: `Terjadi kesalahan`,
      });
    }
  }

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      form={form}
      scrollToFirstError
    >
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
                      const defaultValueDesktop = form.getFieldValue([
                        "params",
                        field.name,
                        "filepathDesktop",
                      ]);
                      const defaultValueMobile = form.getFieldValue([
                        "params",
                        field.name,
                        "filepathMobile",
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
                              <Typography.Title level={5} style={{ margin: 0 }}>
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
                                label="Judul"
                              >
                                <Input placeholder="Masukan judul slider" />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                name={[field.name, "description"]}
                                label={"Deskripsi"}
                              >
                                <Input.TextArea
                                  rows={4}
                                  placeholder={"Masukan deskripsi"}
                                />
                              </Form.Item>
                              <Form.Item
                                name={[field.name, "filepathDesktop"]}
                                label={"Foto Slider Desktop"}
                                required
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Foto slider desktop tidak boleh kosong",
                                  },
                                ]}
                              >
                                <UploadField
                                  defaultFileList={
                                    defaultValueDesktop
                                      ? [
                                          {
                                            uid: "1",
                                            name: "Banner Desktop",
                                            status: "done",
                                            url: defaultValueDesktop,
                                            crossOrigin: "anonymous",
                                          },
                                        ]
                                      : []
                                  }
                                  uploadToken={authToken}
                                  onSuccessUpload={(response) => {
                                    form.setFieldValue(
                                      ["params", field.name, "filepathDesktop"],
                                      response.fileUrl
                                    );
                                    form.validateFields([
                                      ["params", field.name, "filepathDesktop"],
                                    ]);
                                  }}
                                  onRemove={(file) => {
                                    form.setFieldValue(
                                      ["params", field.name, "filepathDesktop"],
                                      ""
                                    );
                                  }}
                                />
                              </Form.Item>
                              <Form.Item
                                name={[field.name, "filepathMobile"]}
                                label={"Foto Slider Mobile"}
                                required
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Foto slider mobile tidak boleh kosong",
                                  },
                                ]}
                              >
                                <UploadField
                                  defaultFileList={
                                    defaultValueMobile
                                      ? [
                                          {
                                            uid: "1",
                                            name: "Banner Mobile",
                                            status: "done",
                                            url: defaultValueMobile,
                                            crossOrigin: "anonymous",
                                          },
                                        ]
                                      : []
                                  }
                                  uploadToken={authToken}
                                  onSuccessUpload={(response) => {
                                    form.setFieldValue(
                                      ["params", field.name, "filepathMobile"],
                                      response.fileUrl
                                    );
                                    form.validateFields([
                                      "params",
                                      field.name,
                                      "filepathMobile",
                                    ]);
                                  }}
                                  onRemove={(file) => {
                                    form.setFieldValue(
                                      ["params", field.name, "filepathMobile"],
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

export default FormHomeSlider;
