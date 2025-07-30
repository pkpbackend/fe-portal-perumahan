import userMenu from "@config/accountMenu";
import menu from "@config/mainMenu";
import useAccount from "@hooks/useAccount";
import { Avatar, Button, Divider, Menu, Space, theme } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./menu.module.scss";

const { useToken } = theme;

const AuthenticateView = () => {
  const { profile, postLogout, logoutDeveloper } = useAccount();

  const acl = profile?.Role?.accessMenu;

  const handleSelect = ({ key }) => {
    if (key === "logout") {
      return handleLogout();
    }
  };

  const handleLogout = async () => {
    if (profile?.isPengembang) {
      logoutDeveloper();
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } else {
      try {
        await postLogout();
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  const menu = userMenu({
    isAdmin: profile?.Role?.admin,
    isPengembang: profile?.isPengembang,
    allowedSettingPortal: acl?.includes("superadmin_pengaturan_crud"),
  });

  return (
    <Menu className={styles.bottomMenu} items={menu} onSelect={handleSelect} />
  );
};
const MobileMenu = () => {
  const { token } = useToken();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { isLoggedIn, profile } = useAccount();
  const router = useRouter();
  const selectedKey = router.pathname.split("/");
  const defaultSelectedKey = selectedKey[1] || "beranda";

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
  }, []);

  return (
    <nav className={styles.mobileMenu}>
      <div className="background-overlay" />
      {isUserLoggedIn ? (
        <Space size={16} align="center" style={{ margin: "2rem 0" }}>
          <Avatar
            className={styles.avatar}
            size={37}
            style={
              {
                background: token.colorInfo,
                "--border-color": token.colorInfo,
              } as any
            }
          >
            <strong>{profile.nama.getInitialChars()}</strong>
          </Avatar>
          <Space direction="vertical" style={{ lineHeight: "normal" }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>
              {profile.nama}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#80848D" }}>
              {profile?.Role?.nama}
            </span>
          </Space>
        </Space>
      ) : null}
      <Divider style={{ borderColor: "#D7DCE0", marginTop: 0 }} />
      <Menu
        mode="vertical"
        items={menu}
        defaultSelectedKeys={[defaultSelectedKey]}
      />
      <Divider style={{ borderColor: "#D7DCE0" }} />
      <div className={styles.bottomMenu}>
        {!isUserLoggedIn ? (
          <React.Fragment>
            <Button
              onClick={() => {
                router.push("/login");
              }}
              block
              size="large"
              type="primary"
            >
              LOGIN
            </Button>
          </React.Fragment>
        ) : (
          <AuthenticateView />
        )}
      </div>
    </nav>
  );
};

export default MobileMenu;
