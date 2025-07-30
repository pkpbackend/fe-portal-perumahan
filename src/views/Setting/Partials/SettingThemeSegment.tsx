import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useSettingByKey from "@hooks/setting/useSettingByKey";
import useSettingMutation from "@hooks/setting/useSettingMutation";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  App,
  Space,
  Table,
  Tag,
  Modal,
  notification,
} from "antd";
import { useEffect, useState } from "react";

const ColorPallete = ({ hex }) => {
  return (
    <Space>
      <div style={{ width: 80 }}>
        <strong>{hex}</strong>
      </div>
      <div
        className="hadow-sm rounded-2 border"
        style={{
          width: 40,
          height: 40,
          background: hex,
          borderRadius: "0.357rem",
          border: "1px solid #ebe9f1",
        }}
      />
    </Space>
  );
};

const ModalSettingTheme = ({
  open,
  onClose,
  defaultValues,
  currentThemes,
  id,
}) => {
  const isUpdate = Boolean(defaultValues);
  const [form] = Form.useForm();
  const mutation = useSettingMutation();

  useEffect(() => {
    form.setFieldsValue({
      name: defaultValues?.name || "",
      primaryColor: defaultValues?.primaryColor || "",
      secondaryColor: defaultValues?.secondaryColor || "",
    });
  }, [form, defaultValues]);

  const onSubmit = async () => {
    const values = form.getFieldsValue();
    let themes = [];
    const checkUniqueName = [...currentThemes]
      .map((item) => item.name)
      .includes(values.name);
    if (!checkUniqueName) {
    }
    try {
      if (isUpdate) {
        themes = currentThemes;
        const { index, ...restValues } = defaultValues;
        themes[index] = { ...restValues, ...values };
      } else {
        themes = [...(currentThemes || []), { ...values, applied: false }];
      }

      await mutation.mutateAsync({
        id,
        key: "theme",
        params: JSON.stringify(themes),
      });
      notification.success({
        message: `Berhasil ${isUpdate ? "update" : "tambah"} tema`,
      });
      onClose();
    } catch (error) {
      notification.error(error ?? "Terjadi Kesalahan");
    }
  };

  const onCloseModal = () => {
    onClose();
  };

  const currentThemesName = [...currentThemes]
    .map((theme) => theme.name)
    .filter((name) => name !== defaultValues?.name);

  return (
    <Modal
      open={open}
      onCancel={onCloseModal}
      centered
      title={isUpdate ? `Update Tema ${defaultValues.name}` : "Tambah Tema"}
      footer={
        <Space size="large">
          <Button
            onClick={onCloseModal}
            disabled={mutation.isLoading}
            size="large"
          >
            Batal
          </Button>
          <Button
            type="primary"
            loading={mutation.isLoading}
            onClick={() => form.submit()}
            size="large"
          >
            Submit
          </Button>
        </Space>
      }
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        requiredMark="optional"
        preserve={false}
      >
        <Form.Item
          name="name"
          label="Nama Tema"
          required
          rules={[
            { required: true, message: "Nama Tema wajib disi" },
            () => ({
              validator(_, value) {
                const checkUniqueName = currentThemesName.includes(value);
                if (!checkUniqueName) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Nama Tema sudah digunakan!"));
              },
            }),
          ]}
        >
          <Input
            placeholder={"Masukan nama tema"}
            disabled={defaultValues?.name === "Default"}
          />
        </Form.Item>
        <Form.Item
          name="primaryColor"
          label="Primary Color (HEX)"
          required
          rules={[{ required: true, message: "Primary Color wajib disi" }]}
        >
          <Input placeholder={"Contoh: #FFFFFF"} />
        </Form.Item>
        <Form.Item
          name="secondaryColor"
          label="Secondary Color (HEX)"
          required
          rules={[{ required: true, message: "Secondary Color wajib disi" }]}
        >
          <Input placeholder={"Contoh: #FFFFFF"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const SettingThemeSegment = () => {
  const queryClient = useQueryClient();

  const { modal } = App.useApp();
  const [modalSettingThemeState, setModalSettingThemeState] = useState({
    open: false,
    data: null,
  });
  const { data, isLoading } = useSettingByKey("theme");
  const mutation = useSettingMutation();

  const themes = data?.params ? JSON.parse(data?.params) : [];

  return (
    <div>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setModalSettingThemeState({ open: true, data: null })}
        style={{ marginBottom: 12 }}
        size="large"
      >
        Tambah Tema
      </Button>
      <Table
        rowKey="name"
        columns={[
          { title: "Nama", dataIndex: "name" },
          {
            title: "Diterapkan",
            dataIndex: "applied",
            render(value) {
              return <span>{value ? "Ya" : "Tidak"}</span>;
            },
          },
          {
            title: "Primary",
            dataIndex: "primaryColor",
            render(value) {
              return <ColorPallete hex={value} />;
            },
          },
          {
            title: "Secondary",
            dataIndex: "secondaryColor",
            render(value) {
              return <ColorPallete hex={value} />;
            },
          },
          {
            title: "Aksi",
            render(_, record: any, index) {
              return (
                <Space wrap>
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    disabled={record.applied}
                    onClick={() => {
                      modal.confirm({
                        title: "Konfirmasi Terapkan Tema!",
                        content: "Apakah anda yakin akan menerapkan tema ini?",
                        okText: "Ya",
                        cancelText: "Batal",
                        okButtonProps: {
                          type: "primary",
                        },
                        onOk: async () => {
                          try {
                            const payload = {
                              id: data?.id,
                              key: "theme",
                              params: JSON.stringify(
                                themes.map((item) => ({
                                  ...item,
                                  applied: item.name === record.name,
                                }))
                              ),
                            };
                            await mutation.mutateAsync(payload);
                            queryClient.invalidateQueries(["applied-theme"]);
                            notification.success({
                              message: "Berhasil menerapkan tema",
                            });
                          } catch (error) {
                            notification.success({
                              message: "Terjadi kesalahan!",
                              description: "Gagal menerapkan tema",
                            });
                          }
                        },
                      });
                    }}
                  >
                    Terapkan
                  </Button>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      setModalSettingThemeState({
                        open: true,
                        data: { ...record, index: index },
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    disabled={record.applied}
                    onClick={() => {
                      modal.confirm({
                        title: "Konfirmasi Hapus!",
                        content: "Apakah anda yakin akan hapus tema ini?",
                        okText: "Hapus",
                        cancelText: "Batal",
                        okButtonProps: {
                          danger: true,
                        },
                        onOk: async () => {
                          try {
                            const payload = {
                              id: data?.id,
                              key: "theme",
                              params: JSON.stringify(
                                themes.filter(
                                  (item) => item.name !== record.name
                                )
                              ),
                            };
                            await mutation.mutateAsync(payload);
                            notification.success({
                              message: "Berhasil menghapus tema",
                            });
                          } catch (error) {
                            notification.success({
                              message: "Terjadi kesalahan!",
                              description: "Gagal menghapus tema",
                            });
                          }
                        },
                      });
                    }}
                  >
                    Hapus
                  </Button>
                </Space>
              );
            },
          },
        ]}
        dataSource={themes}
        pagination={false}
        loading={isLoading}
        scroll={{ x: 1000 }}
      />
      <ModalSettingTheme
        open={modalSettingThemeState.open}
        onClose={() => setModalSettingThemeState({ open: false, data: null })}
        defaultValues={modalSettingThemeState.data}
        currentThemes={themes}
        id={data?.id}
      />
    </div>
  );
};

export default SettingThemeSegment;
