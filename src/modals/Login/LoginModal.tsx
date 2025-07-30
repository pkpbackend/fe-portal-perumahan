import React, { useEffect, useContext, useState, ChangeEvent } from "react";
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

import style from "./LoginStyle.module.scss";
import FormInputOTPDeveloper from "./FormInputOTPDeveloper";
import { useRouter } from "next/router";
import DisclaimerModal from "./DisclaimerModal";
import {
  SIRENG_CLIENT_ID,
  SIRENG_CALLBACK_URL,
  SIRENG_BASE_URL,
} from "@config/envy";

const { useToken } = theme;

const { Text } = Typography;

const initialValues = {
  username: "",
  password: "",
  question: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .max(50, "Username tidak boleh lebih dari 50 karakter")
    .required("Username belum diisi"),
  password: Yup.string()
    .max(50, "Password tidak boleh lebih dari 50 karakter")
    .required("Password belum diisi"),
  question: Yup.string().required("Pertanyaan keamanan belum diisi"),
});
const validationSchemaLoginDeveloper = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email belum diisi"),
});

interface LoginWidgetProps {
  spinRequest?: number;
  setResetToken?: React.Dispatch<React.SetStateAction<string>>;
  onClose?: () => void;
}

export function LoginWidget({
  spinRequest,
  setResetToken,
  onClose,
}: LoginWidgetProps) {
  const { token } = useToken();
  const router = useRouter();
  const [showDisclimer, setSetshowDisclimer] = useState(false);
  const [isLoginDeveloper, setIsLoginDeveloper] = useState(false);
  const [isSuccessSendOTPLoginDeveloper, setIsSuccessSendOTPLoginDeveloper] =
    useState(false);
  const { selectedApp, setServerSaid, clearServerSaid } =
    useContext(GlobalStore);

  const { postLogin, loginDeveloper, decodeAccountProfile } = useAccount();

  const [numA, setNumA] = useState(0);
  const [numB, setNumB] = useState(0);

  const [showPassword, setShowPassword] = useState(false);

  const spinQuestion = () => {
    const minInterval = 1;
    const maxInterval = 10;

    setNumA(randomIntByInterval(minInterval, maxInterval));
    setNumB(randomIntByInterval(minInterval, maxInterval));
  };

  useEffect(() => {
    spinQuestion();
  }, [spinRequest, isLoginDeveloper, isSuccessSendOTPLoginDeveloper]);

  const formik = useFormik({
    initialValues,
    validationSchema: isLoginDeveloper
      ? validationSchemaLoginDeveloper
      : validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const rightAnswer = numA + numB;

      if (parseInt(values.question) !== rightAnswer) {
        return notification.warning({
          message: "Warning",
          description: "Jawaban pertanyaan keamanan salah",
        });
      }

      try {
        clearServerSaid();

        if (isLoginDeveloper) {
          await loginDeveloper({ email: values.email });
          setIsSuccessSendOTPLoginDeveloper(true);
        } else {
          const response = await postLogin({
            username: values.username,
            password: values.password,
          });
          setResetToken(response.isLoggedIn ? null : response.resetToken);
          if (response.isLoggedIn) {
            const { user } = decodeAccountProfile();

            if (selectedApp.id) {
              window.location.href = selectedApp.url;
            } else {
              if (user?.Role?.dashboard && user?.Role?.defaultLogin) {
                window.location.href = "/dashboard";
              } else {
                window.location.href = "/";
              }
            }
          }
        }
      } catch (error: AxiosError | any) {
        const status = error?.response?.status;
        const message = error?.response?.data?.message;
        setServerSaid({ status, message });
        spinQuestion();
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value.replace(/ /g, "").toLowerCase();
    formik.setFieldValue("username", newValue);
  };

  const makeid = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const loginWithSireng = () => {
    const query = {
      client_id: SIRENG_CLIENT_ID,
      redirect_uri: SIRENG_CALLBACK_URL,
      response_type: "code",
      scope: "",
      state: makeid(50),
    };

    const search = new URLSearchParams(query);
    window.open(`${SIRENG_BASE_URL}/oauth/authorize?${search}`);
  };

  return (
    <>
      {isSuccessSendOTPLoginDeveloper ? (
        <FormInputOTPDeveloper
          email={formik.values.email}
          onBackClick={() => {
            setIsSuccessSendOTPLoginDeveloper(false);
          }}
        />
      ) : (
        <>
          <Typography.Title level={2} style={{ color: token.colorPrimary }}>
            LOGIN {isLoginDeveloper ? "PENGEMBANG" : "SSO"}
          </Typography.Title>
          <div className={style.description}>
            Silahkan masuk ke akun&nbsp;
            {selectedApp.id ? selectedApp.title : "Anda"}
          </div>

          <div className={style.description}>
            <img src="/logo-bssn.png" />
            <img src="/logo-bse.png" />
          </div>
          <div className={style.description}>
            <small>
              Dengan melakukan Login, Anda telah menyetujui syarat, ketentuan
              dan kebijakan privasi kami
            </small>
          </div>

          <form onSubmit={formik.handleSubmit} style={{ marginTop: 48 }}>
            <ServerAlert />

            {isLoginDeveloper ? (
              <div>
                <label>
                  Email<span>*</span>
                </label>
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
            ) : (
              <>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "5px 0px",
                    }}
                  >
                    <span className="required">Username.</span>
                  </div>
                  <UiInput
                    name={"username"}
                    placeholder={"Masukan Username Anda"}
                    value={formik.values.username}
                    onChange={handleUsernameChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    status={formik.errors.username ? "error" : null}
                  />
                  {formik.errors.username && formik.touched.username && (
                    <Text type={"danger"}>{formik.errors.username}</Text>
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
                    <span className="required">Password</span>
                    <span
                      onClick={() => [
                        router.push("/lupa-password"),
                        onClose?.(),
                      ]}
                      style={{
                        cursor: "pointer",
                        color: token.colorPrimary,
                      }}
                    >
                      Lupa password?
                    </span>
                  </div>
                  <UiInput
                    name="password"
                    placeholder="Masukan Password Anda"
                    type={!showPassword ? "password" : "text"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    status={formik.errors.password ? "error" : null}
                    suffix={
                      !showPassword ? (
                        <EyeOutlined
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ fontSize: 20 }}
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          style={{ fontSize: 20 }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )
                    }
                  />
                  {formik.errors.password && formik.touched.password && (
                    <Text type={"danger"}>{formik.errors.password}</Text>
                  )}
                </div>
              </>
            )}

            <div>
              <label>
                Pertanyaan Keamanan<span>*</span>
              </label>
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
              Login
            </UiButton>

            {/* {isLoginDeveloper && (
              <UiButton
                htmlType={"button"}
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
                onClick={handleLoginSSO}
              >
                Login Pengembang
              </UiButton>
            )} */}

            <footer className={style.description}>
              <Button
                onClick={() => setSetshowDisclimer(true)}
                type="link"
                style={{ marginBottom: "1.2rem" }}
              >
                <span style={{ textDecoration: "underline" }}>Disclaimer</span>
              </Button>
              {isLoginDeveloper ? (
                <div>
                  <div>
                    <span onDoubleClick={() => alert("meong")}>
                      Tidak bisa login / belum memiliki akun?{" "}
                    </span>
                    <a
                      href="https://sireng.pu.go.id/home"
                      target="_blank"
                      rel="noopener"
                    >
                      Daftar Disini
                    </a>
                  </div>
                  <Divider style={{ margin: "12px 0" }} />
                  <div>
                    <Button
                      size="large"
                      onClick={() => setIsLoginDeveloper(false)}
                      // onClick={handleLoginSSO}
                      type="text"
                    >
                      Login SSO
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  Anda sebagai pengembang?&nbsp;
                  <Button
                    onClick={() => loginWithSireng()}
                    type="link"
                    style={{
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    Login dengan akun SIRENG
                  </Button>
                </div>
              )}

              {!spinRequest && (
                <div style={{ paddingTop: 10, paddingBottom: 30 }}>
                  <a href="/">Kembali ke Beranda</a>
                </div>
              )}
            </footer>
          </form>
        </>
      )}
      <DisclaimerModal
        open={showDisclimer}
        onCancel={() => {
          setSetshowDisclimer(false);
        }}
      />
    </>
  );
}
export function ResetPasswordWidget({ resetToken }: { resetToken: string }) {
  const { selectedApp } = useContext(GlobalStore);

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const { setServerSaid, clearServerSaid } = useContext(GlobalStore);

  const { putResetPassword } = useAccount();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
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
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = {
          resetToken,
          confirmPassword: values.confirmPassword,
          newPassword: values.newPassword,
        };
        clearServerSaid();

        await putResetPassword(formData);
        if (selectedApp.id) {
          window.location.href = selectedApp.url;
        } else {
          window.location.href = "/";
        }
      } catch (error: AxiosError | any) {
        const status = error?.response?.status;
        const message = error?.response?.data?.message;
        setServerSaid({ status, message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} style={{ marginTop: 48 }}>
        <ServerAlert />

        <div>
          <label>
            Password Baru<span>*</span>
          </label>
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
          <label>
            Ulangi Password Baru<span>*</span>
          </label>
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

        <UiButton
          htmlType={"submit"}
          type={"primary"}
          loading={formik.isSubmitting}
        >
          Simpan
        </UiButton>
      </form>
    </>
  );
}

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [resetToken, setResetToken] = useState("");

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
      {resetToken ? (
        <>
          <h2>RESET PASSWORD</h2>
          <div className={style.description}>
            Silahkan Reset Password Akun Anda Terlebih Dahulu
          </div>
          <ResetPasswordWidget resetToken={resetToken} />
        </>
      ) : (
        <>
          <LoginWidget
            onClose={onClose}
            spinRequest={spinRequest}
            setResetToken={setResetToken}
          />
        </>
      )}
    </Modal>
  );
}
