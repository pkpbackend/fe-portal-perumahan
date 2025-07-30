import { Button, Col, Row } from "antd";
import React from "react";
import { openModal, useSettingDispatch, useSettingSelector } from "../store";

const SettingFooterSegment = () => {
  const dispatch = useSettingDispatch();
  return (
    <Row style={{ width: "100%" }} gutter={[24, 24]}>
      <Col xs={24} sm={8}>
        <Button
          block
          size="large"
          onClick={() => {
            dispatch(
              openModal({
                type: "link",
                key: "situs",
                name: "Situs Terkait",
              })
            );
          }}
        >
          Situs Terkait
        </Button>
      </Col>
      <Col xs={24} sm={8}>
        <Button
          block
          size="large"
          onClick={() => {
            dispatch(
              openModal({
                type: "link",
                key: "aplikasipupr",
                name: "Aplikasi PUPR",
              })
            );
          }}
        >
          Aplikasi PUPR
        </Button>
      </Col>
      <Col xs={24} sm={8}>
        <Button
          block
          size="large"
          onClick={() => {
            dispatch(
              openModal({
                type: "link",
                key: "kontakkami",
                name: "Kontak Kami",
              })
            );
          }}
        >
          Kontak Kami
        </Button>
      </Col>
    </Row>
  );
};

export default SettingFooterSegment;
