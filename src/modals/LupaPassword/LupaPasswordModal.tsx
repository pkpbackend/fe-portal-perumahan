import React, { useEffect, useContext, useState, useCallback } from "react";
import { Typography, Modal, notification, Button, Divider, theme } from "antd";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import { GlobalStore } from "@stores/GlobalStore";
import useAccount from "@hooks/useAccount";
import { randomIntByInterval } from "@helpers/NumHelper";
import UiInput from "@components/Input/UiInput";
import UiButton from "@components/Button/UiButton";
import ServerAlert from "@widgets/ServerAlert";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import style from "./LupaPasswordStyle.module.scss";
import Link from "next/link";
import FormInputOTPDeveloper from "./FormInputOTPDeveloper";
import { useRouter } from "next/router";
const { useToken } = theme;

const { Text } = Typography;

const initialValues = {
  email: "",
  question: "",
  newPassword: "",
  confirmPassword: "",
};

const validationSchemaLupaPasswordToken = Yup.object().shape({
  newPassword: Yup.string()
    .max(50, "Password tidak boleh lebih dari 50 karakter")
    .required("Password Baru belum diisi"),
  confirmPassword: Yup.string()
    .max(50, "Password tidak boleh lebih dari 50 karakter")
    .required("Password Baru belum diulangi")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Password Baru harus diulangi dengan Password yg sama"
    ),
});
const validationSchemaLupaPassword = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email belum diisi"),
});

interface LupaPasswordWidgetProps {
  spinRequest?: number;
  setResetToken?: React.Dispatch<React.SetStateAction<string>>;
  onClose?: () => void;
}

export function LupaPasswordWidget({
  spinRequest,
  setResetToken,
  onClose,
}: LupaPasswordWidgetProps) {
  const { token } = useToken();
  const router = useRouter();
  const { token: tokenVerify } = router?.query;

  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const { setServerSaid, clearServerSaid } = useContext(GlobalStore);

  const { lupaPassword, lupaPasswordToken } = useAccount();

  const [numA, setNumA] = useState(0);
  const [numB, setNumB] = useState(0);

  const spinQuestion = () => {
    const minInterval = 1;
    const maxInterval = 10;

    setNumA(randomIntByInterval(minInterval, maxInterval));
    setNumB(randomIntByInterval(minInterval, maxInterval));
  };

  useEffect(() => {
    spinQuestion();
  }, [spinRequest]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: tokenVerify
      ? validationSchemaLupaPasswordToken
      : validationSchemaLupaPassword,
    onSubmit: async (values, { setSubmitting, setValues }) => {
      const rightAnswer = numA + numB;

      if (parseInt(values.question) !== rightAnswer) {
        return notification.warning({
          message: "Warning",
          description: "Jawaban pertanyaan keamanan salah",
        });
      }
      try {
        clearServerSaid();
        if (tokenVerify) {
          await lupaPasswordToken({
            token: String(tokenVerify),
            newPassword: values?.newPassword,
            confirmPassword: values?.confirmPassword,
          });
          const status = 200;
          const message = "Password berhasil diubah";
          setServerSaid({ status, message });
          setTimeout(() => {
            router.replace("/login");
          }, 1000);
        } else {
          await lupaPassword({ email: values.email });
          const status = 200;
          const message =
            "Informasi reset password telah dikirim ke email Anda";
          setServerSaid({ status, message });
          var afterSomeMinutes = new Date(new Date().getTime() + 1 * 60000);
          localStorage.setItem("time-date", String(afterSomeMinutes));
        }
      } catch (error: AxiosError | any) {
        const status = error?.response?.status;
        const message = error?.response?.data?.message;
        setServerSaid({ status, message });
      } finally {
        setValues((prev) => ({
          ...prev,
          question: "",
        }));
        setSubmitting(false);
        spinQuestion();
      }
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown <= 0) {
        const timeDate = localStorage.getItem("time-date");
        const timeget = new Date(timeDate).getTime();
        const timenow = new Date().getTime();
        let selisihDetik = (timeget - timenow) / 1000;
        if (selisihDetik > 0) {
          setCountdown(Math.round(selisihDetik));
        } else {
          localStorage.removeItem("time-date");
        }
      }
      setCountdown((prevCountdown) => prevCountdown - 1);
      if (countdown === 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown]);

  return tokenVerify ? (
    <>
      <Typography.Title level={2} style={{ color: token.colorPrimary }}>
        GANTI PASSWORD
      </Typography.Title>
      <div className={style.description}>Silahkan masukan password baru</div>

      <div className={style.description}>
        <img src="/logo-bssn.png" />
        <img src="/logo-bse.png" />
      </div>

      <form onSubmit={formik.handleSubmit} style={{ marginTop: 48 }}>
        <ServerAlert />
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px 0px",
            }}
          >
            <span className="required">Password Baru</span>
          </div>
          <UiInput
            name={"newPassword"}
            placeholder={"Masukan Password Baru Anda"}
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px 0px",
            }}
          >
            <span className="required">Ulangi Password Baru</span>
          </div>
          <UiInput
            name={"confirmPassword"}
            placeholder={"Masukan Ulang Password Baru Anda"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            status={formik.errors.confirmPassword ? "error" : null}
            type={!showPassword.confirmPassword ? "password" : "text"}
            suffix={
              !showPassword.confirmPassword ? (
                <EyeOutlined
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
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
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                />
              )
            }
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <Text type={"danger"}>{formik.errors.confirmPassword}</Text>
          )}
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span className="required">Pertanyaan Keamanan</span>
          </div>
          <div className={style.question}>
            {numA} + {numB} = ?
          </div>
          <UiInput
            name="question"
            placeholder="Masukan Jawaban Anda"
            type="question"
            value={formik.values.question}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            status={formik.errors.question ? "error" : null}
          />
          {formik.errors.question && formik.touched.question && (
            <Text type={"danger"}>{formik.errors.question}</Text>
          )}
        </div>

        <UiButton
          htmlType={"submit"}
          type={"primary"}
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
        >
          Simpan
        </UiButton>
      </form>
    </>
  ) : (
    <>
      <Typography.Title level={2} style={{ color: token.colorPrimary }}>
        LUPA PASSWORD
      </Typography.Title>
      <div className={style.description}>
        Silahkan masukan username dan email yang terdaftar di SIBARU
      </div>

      <div className={style.description}>
        <img src="/logo-bssn.png" />
        <img src="/logo-bse.png" />
      </div>

      <form onSubmit={formik.handleSubmit} style={{ marginTop: 48 }}>
        <ServerAlert />

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px 0px",
            }}
          >
            <span className="required">Email</span>
          </div>
          <UiInput
            name={"email"}
            placeholder={"Masukan Email Anda"}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            status={formik.errors.email ? "error" : null}
          />
          {formik.errors.email && formik.touched.email && (
            <Text type={"danger"}>{formik.errors.email}</Text>
          )}
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span className="required">Pertanyaan Keamanan</span>
          </div>
          <div className={style.question}>
            {numA} + {numB} = ?
          </div>
          <UiInput
            name="question"
            placeholder="Masukan Jawaban Anda"
            type="question"
            value={formik.values.question}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            status={formik.errors.question ? "error" : null}
          />
          {formik.errors.question && formik.touched.question && (
            <Text type={"danger"}>{formik.errors.question}</Text>
          )}
        </div>

        <UiButton
          htmlType={"submit"}
          type={"primary"}
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting || countdown >= 0}
        >
          {countdown >= 0
            ? `00:${countdown < 10 ? `0${countdown}` : countdown}`
            : `Kirim Permintaan Lupa Password`}
        </UiButton>

        <footer className={style.description}>
          <div>
            <div>
              <span> Sudah memiliki akun? </span>
              <span
                onClick={() => router.push("/login")}
                style={{
                  cursor: "pointer",
                  color: token.colorPrimary,
                }}
              >
                Login disini
              </span>
            </div>
          </div>

          {!spinRequest && (
            <div style={{ paddingTop: 10, paddingBottom: 30 }}>
              <a href="/">Kembali ke Beranda</a>
            </div>
          )}
        </footer>
      </form>
    </>
  );
}

interface LupaPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LupaPasswordModal({
  open,
  onClose,
}: LupaPasswordModalProps) {
  const [_, setResetToken] = useState("");

  const [spinRequest, setSpinRequest] = useState(Math.random());

  useEffect(() => {
    setSpinRequest(Math.random());
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        setResetToken("");
        onClose();
      }}
      destroyOnClose
      footer={null}
      className={style.container}
      maskClosable={false}
    >
      <LupaPasswordWidget
        onClose={onClose}
        spinRequest={spinRequest}
        setResetToken={setResetToken}
      />
    </Modal>
  );
}
