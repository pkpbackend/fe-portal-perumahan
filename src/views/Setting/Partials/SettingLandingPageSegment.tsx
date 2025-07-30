import { Button, Col, Row } from "antd";
import { openModal, useSettingDispatch } from "../store";

const SettingLandingPageSegment = () => {
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
                type: "slider",
                key: "slider",
                name: "Home Slider",
              })
            );
          }}
        >
          Home Slider
        </Button>
      </Col>
      <Col xs={24} sm={8}>
        <Button
          block
          size="large"
          onClick={() => {
            dispatch(
              openModal({
                type: "aplikasi",
                key: "aplikasi",
                name: "Link Aplikasi",
              })
            );
          }}
        >
          Link Aplikasi
        </Button>
      </Col>
      <Col xs={24} sm={8}>
        <Button
          block
          size="large"
          onClick={() => {
            dispatch(
              openModal({
                type: "editor",
                key: "kontak",
                name: "Kontak",
              })
            );
          }}
        >
          Kontak
        </Button>
      </Col>
      <Col xs={24} sm={8}>
        <Button
          block
          size="large"
          onClick={() => {
            dispatch(
              openModal({
                type: "rpjm",
                key: "rpjm",
                name: "RPJM",
              })
            );
          }}
        >
          Informasi RPJM
        </Button>
      </Col>
      <Col xs={24} sm={8}>
        <Button
          block
          size="large"
          onClick={() => {
            dispatch(
              openModal({
                type: "editor",
                key: "tentang",
                name: "Tentang",
              })
            );
          }}
        >
          Tentang
        </Button>
      </Col>
    </Row>
  );
};

export default SettingLandingPageSegment;
