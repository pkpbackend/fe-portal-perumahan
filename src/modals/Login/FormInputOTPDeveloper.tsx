import { LeftOutlined } from "@ant-design/icons";
import useAccount from "@hooks/useAccount";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, InputNumber, Typography } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import styles from "./FormInputOTPDeveloper.module.scss";

const OTP_TOTAL_DIGIT = 6;
const RESEND_OTP_IN_SECOND = 60;

const FormInputOTPDeveloper = ({
  email,
  onBackClick,
}: {
  email: string;
  onBackClick: VoidFunction;
}) => {
  const [countdownResendOTP, setCountdownResendOTP] =
    useState(RESEND_OTP_IN_SECOND);

  const { verifyLoginOTPDeveloper, loginDeveloper } = useAccount();
  const mutation = useMutation({ mutationFn: verifyLoginOTPDeveloper });
  const [value, setValue] = useState("");

  const isValid = value?.toString().length === OTP_TOTAL_DIGIT;

  async function onSubmit() {
    try {
      const response = await mutation.mutateAsync({
        email,
        otp: value?.toString(),
      });
      localStorage.setItem(
        "accessTokenInternal",
        response?.data?.accessTokenInternal
      );
      window.location.href = "/";
    } catch (error) {}
  }

  async function resendOTP() {
    await loginDeveloper({ email: email || "test@mail.com" });
    mutation.reset();
    setCountdownResendOTP(RESEND_OTP_IN_SECOND);
  }

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdownResendOTP((prev) => (prev !== 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div>
      <div style={{ textAlign: "center", position: "relative" }}>
        <Button
          size="large"
          shape="circle"
          style={{ position: "absolute", top: 0, left: 0 }}
          icon={<LeftOutlined />}
          onClick={onBackClick}
        />
        <Typography.Title level={3}>Masukkan Kode OTP</Typography.Title>
        <Typography.Text type="secondary">
          Kode OTP telah dikirim via Email ke
          <br />
          <Typography.Text strong>{email}</Typography.Text>
        </Typography.Text>
      </div>
      {mutation.isError ? (
        <Alert
          style={{ marginTop: "1rem" }}
          type="error"
          showIcon
          message={(mutation.error as AxiosError).response?.data?.message}
        />
      ) : null}
      <div style={{ margin: "1.5rem 0" }}>
        <InputNumber
          maxLength={OTP_TOTAL_DIGIT}
          className={styles.otpInput}
          controls={false}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        {countdownResendOTP !== 0 ? (
          <>
            <Typography.Text type="secondary">
              Mohon tunggu dalam
              <Typography.Text
                strong
              >{` ${countdownResendOTP} detik `}</Typography.Text>
              untuk kirim ulang
            </Typography.Text>
          </>
        ) : (
          <Typography.Text type="secondary">
            {`Tidak menerima kode? `}
            <Button type="link" style={{ padding: 0 }} onClick={resendOTP}>
              <Typography.Text strong>Kirim ulang</Typography.Text>
            </Button>
          </Typography.Text>
        )}
      </div>
      <Button
        type="primary"
        block
        size="large"
        style={{ marginBottom: 0 }}
        disabled={!isValid}
        onClick={onSubmit}
        loading={mutation.isLoading}
      >
        Lanjut
      </Button>
    </div>
  );
};

export default FormInputOTPDeveloper;
