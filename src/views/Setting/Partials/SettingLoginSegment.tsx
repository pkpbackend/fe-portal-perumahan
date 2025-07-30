import { Button, Col, Row } from "antd";
import { openModal, useSettingDispatch } from "../store";

const SettingLoginSegment = () => {
  const dispatch = useSettingDispatch();
  return (
    <Row style={{ width: "100%" }} gutter={[24, 24]}>
      <Col xs={24} sm={12}>
        <Button
          block
          size="large"
          onClick={() => {
            dispatch(
              openModal({
                type: "editor",
                key: "disclaimer",
                name: "Disclaimer",
              })
            );
          }}
        >
          Disclaimer
        </Button>
      </Col>
      <Col xs={24} sm={12}>
        <Button
          block
          size="large"
          onClick={() => {
            dispatch(
              openModal({
                type: "editor",
                key: "registrasi",
                name: "Info Registrasi",
              })
            );
          }}
        >
          Info Registrasi
        </Button>
      </Col>
    </Row>
  );
};

export default SettingLoginSegment;
