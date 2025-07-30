import React, { useEffect, useContext, useState } from "react";
import { Typography, Modal, notification, theme } from "antd";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import { GlobalStore } from "@stores/GlobalStore";
import useAccount from "@hooks/useAccount";
import ServerAlert from "@widgets/ServerAlert";
import UiInput from "@components/Input/UiInput";
import UiButton from "@components/Button/UiButton";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import style from "./UbahPasswordStyle.module.scss";

const { Text } = Typography;

const initialValues = {
  oldPassword: "",
  newPassword: "",
  retypePassword: "",
};

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .max(50, "Password Lama tidak boleh lebih dari 50 karakter")
    .required("Password Lama belum diisi"),
  newPassword: Yup.string()
    .max(50, "Password tidak boleh lebih dari 50 karakter")
    .required("Password Baru belum diisi"),
  retypePassword: Yup.string()
    .max(50, "Password tidak boleh lebih dari 50 karakter")
    .required("Password Baru belum diulangi")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Password Baru harus diulangi dengan Password yg sama"
    ),
});

interface UbahPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const { useToken } = theme;
export default function UbahPasswordModal({
  open,
  onClose,
}: UbahPasswordModalProps) {
  const { token } = useToken();
  const { setServerSaid, clearServerSaid } = useContext(GlobalStore);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    reNewPassword: false,
  });

  const { putUpdatePassword } = useAccount();

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await putUpdatePassword(values);
        clearServerSaid();

        return notification.info({
          message: "Info",
          description: "Password berhasil diubah",
        });
      } catch (error: AxiosError | any) {
        const status = error?.response?.status;
        const message = error?.response?.data?.message;
        setServerSaid({ status, message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    clearServerSaid();
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      className={style.container}
    >
      <h2 style={{ color: token.colorPrimary }}>Ubah Password</h2>

      <form onSubmit={formik.handleSubmit} style={{ marginTop: 48 }}>
        <ServerAlert />

        <div>
          <label>
            Password Lama<span>*</span>
          </label>
          <UiInput
            name={"oldPassword"}
            placeholder={"Masukan Password Lama Anda"}
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            status={formik.errors.oldPassword ? "error" : null}
            type={!showPassword.oldPassword ? "password" : "text"}
            suffix={
              !showPassword.oldPassword ? (
                <EyeOutlined
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      oldPassword: !showPassword.oldPassword,
                    })
                  }
                  style={{ fontSize: 20 }}
                />
              ) : (
                <EyeInvisibleOutlined
                  style={{ fontSize: 20 }}
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      oldPassword: !showPassword.oldPassword,
                    })
                  }
                />
              )
            }
          />
          {formik.errors.oldPassword && formik.touched.oldPassword && (
            <Text type={"danger"}>{formik.errors.oldPassword}</Text>
          )}
        </div>

        <div>
          <label>
            Password Baru<span>*</span>
          </label>
          <UiInput
            name={"newPassword"}
            placeholder={"Masukan Password Lama Anda"}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            status={formik.errors.newPassword ? "error" : null}
            type={!showPassword.newPassword ? "password" : "text"}
            suffix={
              !showPassword.newPassword ? (
                <EyeOutlined
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      newPassword: !showPassword.newPassword,
                    })
                  }
                  style={{ fontSize: 20 }}
                />
              ) : (
                <EyeInvisibleOutlined
                  style={{ fontSize: 20 }}
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      newPassword: !showPassword.newPassword,
                    })
                  }
                />
              )
            }
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <Text type={"danger"}>{formik.errors.newPassword}</Text>
          )}
        </div>

        <div>
          <label>
            Ulangi Password Baru<span>*</span>
          </label>
          <UiInput
            name={"retypePassword"}
            placeholder={"Masukan Password Lama Anda"}
            value={formik.values.retypePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            status={formik.errors.retypePassword ? "error" : null}
            type={!showPassword.reNewPassword ? "password" : "text"}
            suffix={
              !showPassword.reNewPassword ? (
                <EyeOutlined
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      reNewPassword: !showPassword.reNewPassword,
                    })
                  }
                  style={{ fontSize: 20 }}
                />
              ) : (
                <EyeInvisibleOutlined
                  style={{ fontSize: 20 }}
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      reNewPassword: !showPassword.reNewPassword,
                    })
                  }
                />
              )
            }
          />
          {formik.errors.retypePassword && formik.touched.retypePassword && (
            <Text type={"danger"}>{formik.errors.retypePassword}</Text>
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
