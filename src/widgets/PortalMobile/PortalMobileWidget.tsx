import { Button, Collapse, Empty, Skeleton, theme } from "antd";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import {
  CustomerServiceOutlined,
  DownOutlined,
  MailOutlined,
  UpOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

import RenderHtml from "@components/RenderHtml";
import menu from "@config/portalMenu";
import useAccount from "@hooks/useAccount";
import { GlobalStore } from "@stores/GlobalStore";

import useDeskripsiLayanan from "@hooks/useDeskripsiLayanan";
import LoginModal from "@modals/Login/LoginModal";
import style from "./PortalMobileStyle.module.scss";
const { Panel } = Collapse;

const { useToken } = theme;

export const Content = ({ selected, handleLogin, active }) => {
  const router = useRouter();

  const { data, isLoading } = useDeskripsiLayanan(selected?.id, {
    enabled: active,
  });

  if (selected.id === "layanan_konsultasi") {
    return (
      <div className={style.content}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            background: "white",
            padding: "1rem",
          }}
        >
          <a
            href="mailto: sibaru@pkp.go.id"
            style={{
              width: "calc(100% / 3)",
              textDecoration: "none",
            }}
          >
            <Button
              style={{
                background: "skyblue",
                borderRadius: "4px",
                color: "#2B3F78",
                fontSize: 14,
                height: 40,
                outline: "none",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MailOutlined />
              Email
            </Button>
          </a>
          <Button
            style={{
              background: "#FFC928",
              borderRadius: "4px",
              color: "#2B3F78",
              fontSize: 14,
              height: 40,
              outline: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => router.push("/helpdesk")}
          >
            <CustomerServiceOutlined />
            Helpdesk
          </Button>
          <Button
            style={{
              background: "green",
              borderRadius: "4px",
              color: "white",
              fontSize: 14,
              height: 40,
              outline: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => router.push("https://wa.me/082122677894")}
          >
            <WhatsAppOutlined />
            WhatsApp
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className={style.content}>
      <div className={style.descriptionContainer}>
        <div className={style.description}>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              <Skeleton />
            </div>
          ) : (
            <>
              {data?.params ? (
                <div
                  className={style.paragraph}
                  style={{
                    padding: selected?.url ? "1rem 1rem 5rem 1rem" : "1rem",
                  }}
                >
                  <RenderHtml html={data?.params} />
                </div>
              ) : (
                <Empty
                  style={{
                    marginTop: 0,
                    padding: "2rem",
                    marginBottom: selected?.url ? "3rem" : 0,
                  }}
                  description="Tidak ada data"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </>
          )}
        </div>
        {selected?.url && (
          <div className={style.descriptionFooter}>
            <Button
              size="large"
              type="primary"
              onClick={() => handleLogin(selected)}
              block
            >
              Akses Layanan
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function PortalWidgetMobile() {
  const { token } = useToken();

  const { setSelectedApp } = useContext(GlobalStore);

  const { isLoggedIn } = useAccount();
  const [displayLogin, setDisplayLogin] = useState(false);

  const handleLogin = (selected: TMenuItem) => {
    if (!isLoggedIn()) {
      setSelectedApp(selected);
      setDisplayLogin(true);
    } else {
      if (typeof window !== "undefined") {
        window.location.href = selected.url;
      }
    }
  };

  const CustomExpandIcon = ({ isActive }) =>
    isActive ? (
      <UpOutlined style={{ fontSize: ".75rem" }} />
    ) : (
      <DownOutlined style={{ fontSize: ".75rem" }} />
    );

  const [activeMenu, setActiveMenu] = useState("");

  return (
    <section
      className={style.container}
      style={
        {
          "--selected-bg": token.colorPrimary,
        } as any
      }
    >
      <h2>Jenis Layanan Perumahan</h2>
      <Collapse
        accordion
        className={style.menu}
        onChange={(menu) => {
          setActiveMenu(menu[0] as string);
        }}
        expandIcon={({ isActive }) => <CustomExpandIcon isActive={isActive} />}
      >
        {menu.map((menu) => (
          <Panel
            key={menu.id}
            header={
              <div className={style.header}>
                <div className={style.icon}>{menu.icon}</div>
                <div>{menu.title}</div>
              </div>
            }
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <Content
                key={menu.id}
                selected={menu}
                handleLogin={handleLogin}
                active={menu.id === activeMenu}
              />
            </div>

            {menu.children && menu.children.length > 0 && (
              <Collapse
                accordion
                className={style.subMenu}
                onChange={(menu) => {
                  setActiveMenu(menu[0] as string);
                }}
              >
                {menu.children.map((submenu) => (
                  <Panel
                    key={submenu.id}
                    header={
                      <div className={style.header}>
                        <div>{submenu.title}</div>
                      </div>
                    }
                    showArrow={false}
                  >
                    <Content
                      selected={submenu}
                      handleLogin={handleLogin}
                      active={submenu.id === activeMenu}
                    />
                  </Panel>
                ))}
              </Collapse>
            )}
          </Panel>
        ))}
      </Collapse>

      <LoginModal open={displayLogin} onClose={() => setDisplayLogin(false)} />
    </section>
  );
}
