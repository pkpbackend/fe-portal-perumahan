import { Modal, Typography, notification, theme } from "antd";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import * as Yup from "yup";

import UiButton from "@components/Button/UiButton";
import UiInput from "@components/Input/UiInput";
import useAccount from "@hooks/useAccount";
import { GlobalStore } from "@stores/GlobalStore";
import ServerAlert from "@widgets/ServerAlert";

import style from "./UbahProfilStyle.module.scss";

const { Text } = Typography;

const initialValues = {
  nama: "",
  email: "",
  instansi: "",
  alamatInstansi: "",
};

const validationSchema = Yup.object().shape({
  nama: Yup.string()
    .max(50, "Nama tidak boleh lebih dari 50 karakter")
    .required("Nama belum diisi"),
  email: Yup.string()
    .max(50, "Email tidak boleh lebih dari 50 karakter")
    .required("Email belum diisi")
    .email("Format Email tidak valid"),
  instansi: Yup.string()
    .max(50, "Instansi tidak boleh lebih dari 50 karakter")
    .required("Instansi belum diisi"),
  alamatInstansi: Yup.string()
    .max(200, "Instansi tidak boleh lebih dari 50 karakter")
    .required("Alamat Instansi belum diisi"),
});

interface UbahProfilModalProps {
  open: boolean;
  onClose: () => void;
}

const { useToken } = theme;
export default function UbahProfilModal({
  open,
  onClose,
}: UbahProfilModalProps) {
  const { token } = useToken();
  const { setServerSaid, clearServerSaid } = useContext(GlobalStore);

  const { profile, putUpdateProfile, getProfile } = useAccount();

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await putUpdateProfile(values);
        clearServerSaid();

        notification.info({
          message: "Info",
          description: "Profil berhasil diubah",
        });

        window.location.reload();
      } catch (error: AxiosError | any) {
        const status = error?.response?.status;
        const message = error?.response?.data?.message;
        setServerSaid({ status, message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const fillForm = () => {
    formik.setFieldValue("nama", profile.nama);
    formik.setFieldValue("email", profile.email);
    formik.setFieldValue("instansi", profile.instansi);
    formik.setFieldValue("alamatInstansi", profile.alamatInstansi);
  };

  useEffect(() => {
    clearServerSaid();
    fillForm();
    getProfile().then(() => fillForm());
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      className={style.container}
    >
      <h2 style={{ color: token.colorPrimary }}>Ubah Profil</h2>

      <form onSubmit={formik.handleSubmit} style={{ marginTop: 48 }}>
        <ServerAlert />

        <div>
          <label>
            Nama<span>*</span>
          </label>
          <UiInput
            name={"nama"}
            placeholder={"Masukan Nama Anda"}
            value={formik.values.nama}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            status={formik.errors.nama ? "error" : null}
          />
          {formik.errors.nama && formik.touched.nama && (
            <Text type={"danger"}>{formik.errors.nama}</Text>
          )}
        </div>

        <div>
          <sub
            style={{
              textAlign: "right",
              color: "red",
              display: "block",
            }}
          >
            Silahkan hubungi admin untuk mengubah email
          </sub>
          <label>
            Email<span>*</span>
          </label>
          <UiInput
            name={"email"}
            placeholder={"Masukan Email Anda"}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // disabled={formik.isSubmitting}
            disabled={true}
            status={formik.errors.email ? "error" : null}
          />
          {formik.errors.email && formik.touched.email && (
            <Text type={"danger"}>{formik.errors.email}</Text>
          )}
        </div>

        <div>
          <label>
            Instansi<span>*</span>
          </label>
          <UiInput
            name={"instansi"}
            placeholder={"Masukan Instansi Anda"}
            value={formik.values.instansi}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            status={formik.errors.instansi ? "error" : null}
          />
          {formik.errors.instansi && formik.touched.instansi && (
            <Text type={"danger"}>{formik.errors.instansi}</Text>
          )}
        </div>

        <div>
          <label>
            Alamat Instansi<span>*</span>
          </label>
          <UiInput
            name={"alamatInstansi"}
            placeholder={"Masukan Alamat Instansi Anda"}
            value={formik.values.alamatInstansi}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            status={formik.errors.alamatInstansi ? "error" : null}
          />
          {formik.errors.alamatInstansi && formik.touched.alamatInstansi && (
            <Text type={"danger"}>{formik.errors.alamatInstansi}</Text>
          )}
        </div>

        <UiButton
          htmlType={"submit"}
          type={"primary"}
          loading={formik.isSubmitting}
        >
          Simpan
        </UiButton>
      </form>
    </Modal>
  );
}
