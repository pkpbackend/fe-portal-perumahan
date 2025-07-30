import {
  Button,
  Col,
  MenuProps,
  Modal,
  Row,
  Skeleton,
  theme,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import {
  CloseOutlined,
  CustomerServiceOutlined,
  MailOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

import UiDataMenuCustom from "@components/DataMenu/UiDataMenuCustom";
import RenderHtml from "@components/RenderHtml";
import menu from "@config/portalMenu";
import useAccount from "@hooks/useAccount";
import useDeskripsiLayanan from "@hooks/useDeskripsiLayanan";
import { GlobalStore } from "@stores/GlobalStore";

import LoginModal from "@modals/Login/LoginModal";
import style from "./PortalStyle.module.scss";

const { useToken } = theme;

const Content = ({ selected }) => {
  const router = useRouter();

  const { setSelectedApp } = useContext(GlobalStore);
  const [displayLogin, setDisplayLogin] = useState(() => false);

  const [showDesc, setShowDesc] = useState(false);

  const { data, isLoading } = useDeskripsiLayanan(selected?.id, {
    enabled: showDesc,
  });

  const { isLoggedIn } = useAccount();

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

  if (showDesc) {
    return (
      <div className={style.content}>
        <div className={style.descriptionContainer}>
          <div className={style.description}>
            <div className={style.titleWrapper}>
              <span className={style.title}>{selected?.title}</span>
              <Button
                shape="circle"
                onClick={() => setShowDesc(false)}
                icon={<CloseOutlined />}
                style={{ borderRadius: 999 }}
              />
            </div>
            <div className={style.paragraph}>
              {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Skeleton />
                </div>
              ) : (
                <RenderHtml html={data?.params} />
              )}
            </div>
          </div>
          {selected?.url && (
            <div className={style.descriptionFooter}>
              <Button
                size="large"
                type="primary"
                block
                onClick={() => handleLogin(selected)}
              >
                Akses {selected?.title}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={style.content}>
      <div className={style.icon}>
        <div>{selected?.icon}</div>
      </div>
      <div className={style.wrapper}>
        <Button
          size="large"
          type="primary"
          ghost
          onClick={(_) => setShowDesc(true)}
        >
          Tampilkan Deskripsi
        </Button>
        {selected?.id === "layanan_konsultasi" ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                columnGap: 10,
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
          </>
        ) : (
          selected?.url && (
            <Button
              size="large"
              type="primary"
              onClick={() => handleLogin(selected)}
              style={{ whiteSpace: "break-spaces", height: "auto" }}
            >
              Akses {selected?.title}
            </Button>
          )
        )}
      </div>
      <LoginModal open={displayLogin} onClose={() => setDisplayLogin(false)} />
    </div>
  );
};
export default function PortalWidget() {
  const { token } = useToken();
  const router = useRouter();
  const [selected, onSelected] = useState(menu[0]);
  const selectedKey = router.pathname;
  const xSelectedKey = selectedKey.split("/");
  const openKey = xSelectedKey.length >= 2 ? `/${xSelectedKey[1]}` : "";

  const handleSelect = (val: any) => {
    onSelected(val);
  };

  const [openKeys, setOpenKeys] = useState(() => [
    openKey === "/" ? "layanan_pengajuan_bantuan" : openKey,
  ]);

  const menuHasChildren = [...menu]
    .filter((item) => item.children?.length > 0)
    .map((item) => item.id);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (menuHasChildren.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <section className={style.container}>
      <h2>Jenis Layanan Perumahan</h2>
      <Row>
        <Col span={24} md={11}>
          <div
            className={style.menu}
            style={
              {
                "--selected-bg": token.colorPrimary,
              } as any
            }
          >
            <UiDataMenuCustom
              mode={"inline"}
              dataSource={menu}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              className="menu-layanan"
              onSelectMenu={handleSelect}
            />
          </div>
        </Col>
        <Col span={24} md={13}>
          {selected && <Content key={selected.id} selected={selected} />}
        </Col>
      </Row>
    </section>
  );
}
