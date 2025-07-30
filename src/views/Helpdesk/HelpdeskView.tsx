import {
  Card,
  Descriptions,
  Form,
  Grid,
  Radio,
  notification,
  theme,
} from "antd";
import { AxiosError } from "axios";
import { Formik } from "formik";
import Head from "next/head";
import * as Yup from "yup";

import UiButton from "@components/Button/UiButton";
import UiInput from "@components/Input/UiInput";
import ServerAlert from "@widgets/ServerAlert";

import UiInputTextarea from "@components/Input/UiInputTextarea";
import UiSelect from "@components/Select/UiSelect";
import useCreateHelpdesk from "@hooks/useCreateHelpdesk";
import useGetDirektorat from "@hooks/useGetDirektorat";
import useGetHelpdeskTopicDiscussion from "@hooks/useGetHelpdeskTopicDiscussion";
import useGetProvince from "@hooks/useGetProvince";
import { useRouter } from "next/router";
import style from "./HelpdeskStyle.module.scss";

const { useToken } = theme;

const FormItem = Form.Item;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
  email: Yup.string()
    .email("Format email tidak sesuai")
    .required("Email wajib diisi"),
  gender: Yup.string().required("Jenis Kelamin wajib diisi"),
  instansi: Yup.string().required("Instansi wajib diisi"),
  pekerjaan: Yup.string().required("Pekerjaan wajib diisi"),
  ProvinsiId: Yup.string().required("Provinsi wajib diisi").nullable(),
  pendidikanTerakhir: Yup.string().required("Pendidikan Terakhir wajib diisi"),
  phone: Yup.string().required("No Telepon wajib diisi"),
  // Ticket
  DirektoratId: Yup.string().required("Direktorat wajib diisi").nullable(),
  HelpdeskTopikDiskusiId: Yup.string().required("Topik wajib diisi").nullable(),
  title: Yup.string().required("Judul wajib diisi"),
});

const { useBreakpoint } = Grid;
export default function HelpdeskView() {
  const { token } = useToken();

  const router = useRouter();
  const screens = useBreakpoint();
  const createTicketMutation = useCreateHelpdesk();
  const {
    data: dataTopic,
    isLoading: isLoadingDataTopic,
    isFetching: isFetchingDataTopic,
  } = useGetHelpdeskTopicDiscussion();

  const {
    data: dataProvince,
    isLoading: isLoadingDataProvince,
    isFetching: isFetchingDataProvince,
  } = useGetProvince();
  const { data: dataDirektorat } = useGetDirektorat();

  return (
    <section className={style.container}>
      <Head>
        <title>Helpdesk | SIBARU</title>
      </Head>

      <div className={style.pageTitle}>
        <h2 style={{ color: token.colorInfo }}>
          HELPDESK
          <br />
          <span style={{ color: "white" }}>SIBARU</span>
        </h2>
      </div>

      <h2></h2>

      <section className={style.wrapper}>
        <Card
          bordered={false}
          style={{
            boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Formik
            initialValues={{
              name: "",
              email: "",
              gender: "",
              instansi: "",
              pekerjaan: "",
              ProvinsiId: null,
              pendidikanTerakhir: "",
              phone: "",
              DirektoratId: null,
              HelpdeskTopikDiskusiId: null,
              title: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const response = await createTicketMutation.mutateAsync({
                  Helpdesk: {
                    HelpdeskTopikDiskusiId: Number(
                      values.HelpdeskTopikDiskusiId
                    ),
                    DirektoratId: Number(values.DirektoratId),
                    title: values.title,
                    HelpdeskUserId: null,
                  },
                  HelpdeskUser: {
                    name: values.name,
                    gender: values.gender,
                    email: values.email,
                    phone: values.phone,
                    instansi: values.instansi,
                    pekerjaan: values.pekerjaan,
                    pendidikanTerakhir: values.pendidikanTerakhir,
                    ProvinsiId: Number(values.ProvinsiId),
                  },
                });
                resetForm();
                notification.success({
                  message: "Berhasil",
                  description: "Tiket berhasil dibuat",
                });
                router.push(
                  `/helpdesk/diskusi/${response.data.data.Helpdesk.id}`
                );
              } catch (error: AxiosError | any) {
                notification.error({
                  message: "Gagal",
                  description: "Tiket gagal dibuat",
                });
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
              setFieldValue,
            }) => (
              <Form onFinish={handleSubmit} layout="vertical">
                <h3 style={{ textAlign: "center", color: token.colorPrimary }}>
                  Isi Data Diri Anda
                </h3>
                <div
                  className={style.description}
                  style={{ textAlign: "center" }}
                >
                  {" "}
                  (Privasi Anda Dijamin)
                </div>
                <ServerAlert />
                <FormItem
                  label="Nama"
                  htmlFor="name"
                  validateStatus={errors.name && touched.name ? "error" : ""}
                  help={errors.name && touched.name ? errors.name : null}
                >
                  <UiInput
                    id="name"
                    name="name"
                    placeholder="Masukan nama"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                </FormItem>
                <FormItem
                  label="Email"
                  htmlFor="email"
                  validateStatus={errors.email && touched.email ? "error" : ""}
                  help={errors.email && touched.email ? errors.email : null}
                >
                  <UiInput
                    id="email"
                    name="email"
                    placeholder="Masukan email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                </FormItem>
                <FormItem
                  label="Jenis Kelamin"
                  htmlFor="gender"
                  validateStatus={
                    errors.gender && touched.gender ? "error" : ""
                  }
                  help={errors.gender && touched.gender ? errors.gender : null}
                >
                  <Radio.Group
                    id="gender"
                    onChange={(e) => {
                      setFieldValue("gender", e.target.value);
                    }}
                  >
                    <Radio value="1">Laki-laki</Radio>
                    <Radio value="2">Perempuan</Radio>
                  </Radio.Group>
                </FormItem>
                <FormItem
                  label="Instansi"
                  htmlFor="instansi"
                  validateStatus={
                    errors.instansi && touched.instansi ? "error" : ""
                  }
                  help={
                    errors.instansi && touched.instansi ? errors.instansi : null
                  }
                >
                  <UiInput
                    id="instansi"
                    name="instansi"
                    placeholder="Masukan instansi"
                    value={values.instansi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                </FormItem>
                <FormItem
                  label="Pekerjaan"
                  htmlFor="pekerjaan"
                  validateStatus={
                    errors.pekerjaan && touched.pekerjaan ? "error" : ""
                  }
                  help={
                    errors.pekerjaan && touched.pekerjaan
                      ? errors.pekerjaan
                      : null
                  }
                >
                  <UiInput
                    id="pekerjaan"
                    name="pekerjaan"
                    placeholder="Masukan pekerjaan"
                    value={values.pekerjaan}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                </FormItem>
                <FormItem
                  label="Provinsi"
                  htmlFor="ProvinsiId"
                  validateStatus={
                    errors.ProvinsiId && touched.ProvinsiId ? "error" : ""
                  }
                  help={
                    errors.ProvinsiId && touched.ProvinsiId
                      ? errors.ProvinsiId
                      : null
                  }
                >
                  <UiSelect
                    id="ProvinsiId"
                    name="ProvinsiId"
                    placeholder="Pilih provinsi"
                    options={
                      dataProvince?.map((province) => ({
                        label: province.nama,
                        value: province.id,
                      })) ?? []
                    }
                    loading={isFetchingDataProvince || isLoadingDataProvince}
                    disabled={isSubmitting}
                    filterOption={(input, option) =>
                      ((option?.label ?? "") as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    showSearch
                  />
                </FormItem>
                <FormItem
                  label="Pendidikan Terakhir"
                  htmlFor="pendidikanTerakhir"
                  validateStatus={
                    errors.pendidikanTerakhir && touched.pendidikanTerakhir
                      ? "error"
                      : ""
                  }
                  help={
                    errors.pendidikanTerakhir && touched.pendidikanTerakhir
                      ? errors.pendidikanTerakhir
                      : null
                  }
                >
                  <UiSelect
                    id="pendidikanTerakhir"
                    name="pendidikanTerakhir"
                    placeholder="Pilih pendidikan terakhir"
                    options={["SD", "SMP", "SMA", "S1", "S2", "S3"].map(
                      (pendidikan) => ({ label: pendidikan, value: pendidikan })
                    )}
                    disabled={isSubmitting}
                    filterOption={(input, option) =>
                      ((option?.label ?? "") as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    showSearch
                  />
                </FormItem>
                <FormItem
                  label="No Telepon"
                  htmlFor="phone"
                  validateStatus={errors.phone && touched.phone ? "error" : ""}
                  help={errors.phone && touched.phone ? errors.phone : null}
                >
                  <UiInput
                    id="phone"
                    name="phone"
                    placeholder="08xxx-xxxx-xxxx"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                </FormItem>
                <div
                  style={{
                    marginTop: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  <h3 style={{ marginBottom: "1rem" }}>Buat Tiket</h3>
                  <Descriptions
                    bordered
                    column={1}
                    layout={screens.xs ? "vertical" : "horizontal"}
                    labelStyle={{ width: "25%" }}
                  >
                    <Descriptions.Item label="Direktorat">
                      <FormItem
                        validateStatus={
                          errors.DirektoratId && touched.DirektoratId
                            ? "error"
                            : ""
                        }
                        help={
                          errors.DirektoratId && touched.DirektoratId
                            ? errors.DirektoratId
                            : null
                        }
                        style={{ marginBottom: 0 }}
                      >
                        <UiSelect
                          id="DirektoratId"
                          name="DirektoratId"
                          placeholder="Pilih Direktorat"
                          options={
                            dataDirektorat?.map((direktorat) => ({
                              label: direktorat.name,
                              value: direktorat.id,
                            })) ?? []
                          }
                          disabled={isSubmitting}
                          filterOption={(input, option) =>
                            ((option?.label ?? "") as string)
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          showSearch
                        />
                      </FormItem>
                    </Descriptions.Item>
                    <Descriptions.Item label="Topik">
                      <FormItem
                        validateStatus={
                          errors.HelpdeskTopikDiskusiId &&
                          touched.HelpdeskTopikDiskusiId
                            ? "error"
                            : ""
                        }
                        help={
                          errors.HelpdeskTopikDiskusiId &&
                          touched.HelpdeskTopikDiskusiId
                            ? errors.HelpdeskTopikDiskusiId
                            : null
                        }
                        style={{ marginBottom: 0 }}
                      >
                        <UiSelect
                          id="HelpdeskTopikDiskusiId"
                          name="HelpdeskTopikDiskusiId"
                          placeholder="Pilih Topik"
                          options={
                            dataTopic?.length > 0
                              ? dataTopic?.map((topic) => ({
                                  label: topic.name,
                                  value: topic.id,
                                }))
                              : []
                          }
                          loading={isFetchingDataTopic || isLoadingDataTopic}
                          disabled={isSubmitting}
                          filterOption={(input, option) =>
                            ((option?.label ?? "") as string)
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          showSearch
                        />
                      </FormItem>
                    </Descriptions.Item>
                    <Descriptions.Item label="Judul">
                      <FormItem
                        validateStatus={
                          errors.title && touched.title ? "error" : ""
                        }
                        help={
                          errors.title && touched.title ? errors.title : null
                        }
                        style={{ marginBottom: 0 }}
                      >
                        <UiInputTextarea
                          id="title"
                          name="title"
                          placeholder="Masukan judul"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                        />
                      </FormItem>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <UiButton
                    size="large"
                    htmlType="submit"
                    type="primary"
                    block={screens.xs}
                    style={{ minWidth: 180 }}
                    loading={isSubmitting}
                  >
                    Buat Tiket
                  </UiButton>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </section>
    </section>
  );
}
