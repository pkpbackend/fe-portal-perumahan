import useSettingByKey from "@hooks/setting/useSettingByKey";
import { Button, Modal, Segmented } from "antd";
import React, { useState } from "react";

const DisclaimerModal = ({ open, onCancel }) => {
  const { data: dataDisclaimer } = useSettingByKey("disclaimer");
  const { data: dataRegistrasi } = useSettingByKey("registrasi");
  const [selectedSegment, setSetSelectedSegment] =
    useState("Disclaimer Usulan");
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Disclaimer"
      footer={
        <Button type="primary" ghost onClick={() => onCancel()}>
          Tutup
        </Button>
      }
      styles={{
        body: { padding: "1rem", overflow: "auto" },
      }}
    >
      <Segmented
        value={selectedSegment}
        onChange={(value) => setSetSelectedSegment(value.toString())}
        block
        options={["Disclaimer Usulan", "Disclaimer Akses"]}
        size="large"
        style={{ marginBottom: "1rem" }}
      />
      {selectedSegment === "Disclaimer Usulan" ? (
        <div dangerouslySetInnerHTML={{ __html: dataDisclaimer?.params }} />
      ) : null}
      {selectedSegment === "Disclaimer Akses" ? (
        <div dangerouslySetInnerHTML={{ __html: dataRegistrasi?.params }} />
      ) : null}
    </Modal>
  );
};

export default DisclaimerModal;
