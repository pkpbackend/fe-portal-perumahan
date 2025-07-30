import useUpdateStatusHelpdesk from "@hooks/useUpdateStatusHelpdesk";
import { Modal, Rate, message, notification } from "antd";
import React, { useState } from "react";

const ModalCloseTicket = ({ open, onClose, helpdeskId, helpdeskUserId }) => {
  const [rating, setRating] = useState(null);
  const closeTicketMutation = useUpdateStatusHelpdesk();
  async function handleSubmit() {
    if (rating === null) {
      notification.error({ message: "Berikan rating terlebih dulu" });
      return;
    }
    try {
      await closeTicketMutation.mutateAsync({
        id: helpdeskId,
        status: true,
        rating,
        HelpdeskUserId: helpdeskUserId,
      });
      notification.success({
        message: "Berhasil",
        description: "Tiket berhasil ditutup",
      });
      onClose();
    } catch (error) {
      notification.error({
        message: "Gagal",
        description: error?.response?.data?.message ?? "Terjadi kesalahan",
      });
    }
  }
  return (
    <Modal
      title="Apakah anda yakin ingin menyelesaikan konsultasi?"
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      okText="Ya"
      cancelText="Batal"
      destroyOnClose
      closable={!closeTicketMutation.isLoading}
      okButtonProps={{ loading: closeTicketMutation.isLoading }}
      cancelButtonProps={{ disabled: closeTicketMutation.isLoading }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#374774" }}>Berikan Penilaian</p>
        <Rate
          onChange={(value) => {
            setRating(value);
          }}
          style={{ fontSize: 28 }}
        />
      </div>
    </Modal>
  );
};

export default ModalCloseTicket;
