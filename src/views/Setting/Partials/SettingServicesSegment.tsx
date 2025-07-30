import { Button, Col, Row } from "antd";
import { openModal, useSettingDispatch } from "../store";

const capitalize = (str) => {
  return str
    .split("_")
    .map((word) => {
      if (word.length <= 3) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

const SettingServicesSegment = () => {
  const dispatch = useSettingDispatch();
  return (
    <Row style={{ width: "100%" }} gutter={[24, 24]}>
      {[
        "layanan_pengajuan_bantuan",
        "bantuan_perumahan",
        "kpr",
        "layanan_pendataan",
        "pemerlu_pelayanan_pendataan_sosial",
        "profil_rumah_kewilayahan",
        "rumah_tidak_layak_huni",
        "rumah_terdampak_bencana",
        "layanan_monitoring",
        "pembangunan",
        "pemanfaatan",
        "layanan_serah_terima",
        "layanan_konsultasi",
        "dashboard_manajemen_data",
        "layanan_direktorat",
        "sekretariat_ditjen_perumahan",
        "kepatuhan_intern",
        "rumah_susun",
        "rumah_khusus",
        "rumah_swadaya",
        "rumah_umum_dan_komersial",
      ].map((key) => {
        const settingName = capitalize(key);
        return (
          <Col xs={24} sm={8} key={key}>
            <Button
              block
              size="large"
              onClick={() => {
                dispatch(
                  openModal({
                    type: "editor",
                    key: key,
                    name: settingName,
                  })
                );
              }}
            >
              {settingName}
            </Button>
          </Col>
        );
      })}
    </Row>
  );
};

export default SettingServicesSegment;
