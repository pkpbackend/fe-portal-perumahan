import Icon from "@ant-design/icons";

import { Icon as LayananKonsultasiIcon } from "@images/icons/LayananKonsultasi";
import { Icon as LayananMonitoringIcon } from "@images/icons/LayananMonitoring";
import { Icon as LayananPendataanIcon } from "@images/icons/LayananPendataan";
import { Icon as LayananPengusulanIcon } from "@images/icons/LayananPengusulan";
import { Icon as LayananDashboardManajemenDataIcon } from "@images/icons/LayananDashboardManajemenData";
import { Icon as LayananDirektoratIcon } from "@images/icons/LayananDirektorat";
import { Icon as LayananSerahTerimaIcon } from "@images/icons/LayananSerahTerima";

export default [
  {
    id: "layanan_pengajuan_bantuan",
    icon: <Icon component={LayananPengusulanIcon} />,
    title: "Layanan Pengajuan Bantuan",
    children: [
      {
        id: "bantuan_perumahan",
        title: "Bantuan Perumahan",
        url: "/pengusulan",
      },
      {
        id: "kpr",
        title: "KPR",
        url: "https://tapera.go.id/home",
      },
    ],
  },
  {
    id: "layanan_pendataan",
    icon: <Icon component={LayananPendataanIcon} />,
    title: "Layanan Pendataan",
    children: [
      {
        id: "pemerlu_pelayanan_pendataan_sosial",
        title: "Pemerlu Pelayanan Kesejahteraan Sosial (PPKS)",
        url: "/underconstruction",
      },
      {
        id: "profil_rumah_kewilayahan",
        title: "Profil Rumah Kewilayahan",
        url: "/pendataan/kewilayahan",
      },
      {
        id: "rumah_tidak_layak_huni",
        title: "Rumah Tidak Layak Huni",
        url: "https://datartlh.perumahan.pu.go.id/mdashboard/",
      },
      {
        id: "rumah_terdampak_bencana",
        title: "Rumah Terdampak Bencana",
        url: "https://rutena.perumahan.pu.go.id/",
      },
    ],
  },
  {
    id: "layanan_konsultasi",
    icon: <Icon component={LayananKonsultasiIcon} />,
    title: "Layanan Konsultasi",
    onClick: () => {
      window.location.href = "/helpdesk";
    },
    url: "/helpdesk",
  },
  {
    id: "layanan_serah_terima",
    icon: <Icon component={LayananSerahTerimaIcon} />,
    title: "Layanan Serah Terima",
    url: "/serah-terima",
  },
  {
    id: "layanan_monitoring",
    icon: <Icon component={LayananMonitoringIcon} />,
    title: "Layanan Monitoring",
    children: [
      {
        id: "pembangunan",
        title: "Progress Pelaksanaan",
        url: "/pembangunan",
      },
      {
        id: "pemanfaatan",
        title: "Capaian Pembangunan",
        url: "/pemanfaatan",
      },
    ],
  },
  {
    id: "dashboard_manajemen_data",
    icon: <Icon component={LayananDashboardManajemenDataIcon} />,
    title: "Dashboard Manajemen Data",
    url: "/dashboard",
  },
  {
    id: "layanan_direktorat",
    icon: <Icon component={LayananDirektoratIcon} />,
    title: "Layanan Direktorat",
    children: [
      {
        id: "sekretariat_ditjen_perumahan",
        title: "Sekretariat Ditjen Perumahan",
        // url: 'https://rutena.perumahan.pu.go.id',
        url: "#",
      },
      {
        id: "kepatuhan_intern",
        title: "Kepatuhan Intern",
        url: "https://sipatuh.luwutimurkab.go.id/",
      },
      {
        id: "rumah_susun",
        title: "Rumah Susun",
        url: "https://sirusun.perumahan.pu.go.id/",
      },
      {
        id: "rumah_khusus",
        title: "Rumah Khusus",
        url: "https://data.pu.go.id/dataset/rumah-khusus",
      },
      {
        id: "rumah_swadaya",
        title: "Rumah Swadaya",
        url: "https://sirus.perumahan.pu.go.id/admin/form_login.php",
      },
      {
        id: "rumah_umum_dan_komersial",
        title: "Rumah Umum dan Komersial",
        url: "https://simonipsu.perumahan.pu.go.id/login",
      },
    ],
  },
];
