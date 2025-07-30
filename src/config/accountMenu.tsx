import {
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const userMenu = ({
  isAdmin,
  isPengembang,
  allowedSettingPortal,
}: {
  isAdmin: boolean;
  isPengembang: boolean;
  allowedSettingPortal: boolean;
}) => {
  return [
    ...(!isPengembang
      ? [
          {
            key: "kelola-profil-user",
            label: (
              <Link href="/member/kelola-profil-user">Kelola Profil User</Link>
            ),
            icon: <UserOutlined style={{ fontSize: 24 }} />,
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            key: "panel-admin",
            label: <Link href="/admin">Panel Admin</Link>,
            icon: <AppstoreOutlined style={{ fontSize: 24 }} />,
          },
        ]
      : []),
    ...(allowedSettingPortal
      ? [
          {
            key: "portal-setting",
            label: <Link href="/setting">Pengaturan</Link>,
            icon: <SettingOutlined style={{ fontSize: 24 }} />,
          },
        ]
      : []),
    {
      key: "divider",
      type: "divider",
    },
    {
      key: "logout",
      label: <span style={{ color: "#FF4048" }}>Logout</span>,
      icon: <LogoutOutlined style={{ color: "#FF4048", fontSize: 24 }} />,
    },
  ];
};
export default userMenu;
