import AppLayout from "@layouts/AppLayout";
import { Button, Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";

const NotAuthorized = () => {
  const router = useRouter();
  return (
    <AppLayout>
      <div
        style={{
          maxWidth: 517,
          margin: "0 auto",
          marginTop: 32,
        }}
      >
        <object
          type="image/svg+xml"
          data="/images/under-maintenance.svg"
          style={{ width: "100%", height: "100%" }}
        >Not Authorized</object>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "3rem 0",
        }}
      >
        <Typography.Title
          level={1}
          style={{
            color: "#404040",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          You are not authorized!
        </Typography.Title>
        <Typography.Paragraph
          type="secondary"
          style={{
            fontWeight: "normal",
            fontSize: 20,
            color: "#9E9E9E",
            textAlign: "center",
          }}
        >
          Silahkan kembali ke halaman Beranda
        </Typography.Paragraph>
        <Button
          size="large"
          type="primary"
          onClick={() => window.location.href = "/" }
          style={{ marginTop: "1rem" }}
        >
          Kembali ke Beranda
        </Button>
      </div>
    </AppLayout>
  );
};

export default NotAuthorized;
