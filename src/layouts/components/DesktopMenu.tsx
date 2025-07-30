import userMenu from "@config/accountMenu";
import menu from "@config/mainMenu";
import useAccount from "@hooks/useAccount";
import { Avatar, Button, ConfigProvider, Dropdown, Menu, theme } from "antd";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./menu.module.scss";
import LoginModal from "@modals/Login/LoginModal";

const { useToken } = theme;
const AuthenticateView = ({ pageLayout }: { pageLayout: boolean }) => {
  const { token } = useToken();

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

  const items = userMenu({
    isAdmin: profile?.Role?.admin,
    isPengembang: profile?.isPengembang,
    allowedSettingPortal: acl?.includes("superadmin_pengaturan_crud"),
  });

  return (
    <Dropdown
      menu={{
        items,
        className: styles.dropdownProfileMenu,
        onClick: handleSelect,
      }}
      overlayStyle={{ zIndex: 101 }}
      placement="bottomRight"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          gap: 10,
        }}
      >
        <Avatar
          className={styles.avatar}
          style={
            {
              background: token.colorInfo,
              "--border-color": token.colorInfo,
            } as any
          }
          size={37}
        >
          <strong>{profile.nama.getInitialChars()}</strong>
        </Avatar>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
        >
          <path
            d="M5.34107 6.7475L1.14457 1.95075C0.649324 1.38638 1.05182 0.5 1.80345 0.5H10.1964C10.3647 0.499856 10.5294 0.548202 10.6708 0.639248C10.8122 0.730295 10.9244 0.860182 10.994 1.01336C11.0635 1.16653 11.0874 1.3365 11.0628 1.50291C11.0382 1.66931 10.9662 1.8251 10.8553 1.95163L6.65882 6.74663C6.57669 6.84061 6.47541 6.91593 6.36177 6.96755C6.24813 7.01916 6.12476 7.04586 5.99995 7.04586C5.87514 7.04586 5.75177 7.01916 5.63813 6.96755C5.52449 6.91593 5.4232 6.84061 5.34107 6.74663V6.7475Z"
            fill={pageLayout ? "#fff" : "#484C57"}
          />
        </svg>
      </div>
    </Dropdown>
  );
};
const DesktopMenu = ({ pageLayout }) => {
  const { token } = useToken();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { isLoggedIn } = useAccount();
  const router = useRouter();
  const selectedKey = router.pathname.split("/");
  const defaultSelectedKey = selectedKey[1] || "beranda";
  const [openLoginModal, setOpenLoginModal] = useState(false);
  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
  }, []);

  return (
    <nav
      className={classNames(
        styles.desktopMenu,
        pageLayout && styles.pageLayout
      )}
    >
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemColor: pageLayout ? "#fff" : "#6C6C6C",
              itemHoverColor: pageLayout ? token.colorInfo : token.colorPrimary,
              horizontalItemSelectedColor: pageLayout
                ? token.colorInfo
                : token.colorPrimary,
            },
          },
        }}
      >
        <Menu
          mode="horizontal"
          items={menu}
          defaultSelectedKeys={[defaultSelectedKey]}
          style={{
            borderBottom: "none",
            background: "transparent",
            fontWeight: 600,
          }}
        />
      </ConfigProvider>

      <div style={{ marginLeft: 40 }}>
        {isUserLoggedIn ? (
          <AuthenticateView pageLayout={pageLayout} />
        ) : (
          <>
            <Button
              type={pageLayout ? "default" : "primary"}
              ghost={pageLayout}
              style={{ minWidth: 169, height: 48 }}
              onClick={() => {
                setOpenLoginModal(true);
              }}
            >
              LOGIN
            </Button>
            <LoginModal
              open={openLoginModal}
              onClose={() => setOpenLoginModal(false)}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default DesktopMenu;
