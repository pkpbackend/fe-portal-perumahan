import LogoPUPRInverseSvg from "@images/LogoPUPRInverseSvg";
import LogoPUPRSvg from "@images/LogoPUPRSvg";
import VectorGroup from "@images/vectorGroup.svg";
import RootLayout from "@layouts/RootLayout";
import FooterWidget from "@widgets/Footer/FooterWidget";
import { Grid, Layout, theme } from "antd";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import DesktopMenu from "./components/DesktopMenu";
import MobileMenu from "./components/MobileMenu";
const { useToken } = theme;

const { useBreakpoint } = Grid;
const {
  Header,
  Content,
  Footer,
  // Sider
} = Layout;

export default function AppLayout({
  children,
  pageLayout,
  AuthPage,
}: TAppLayoutProps) {
  const { token } = useToken();
  const screens = useBreakpoint();
  const isMobileScreen = !screens.md;

  const [headerShadow, setHeaderShadow] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleScroll = () => {
    return window.pageYOffset > 50
      ? setHeaderShadow(true)
      : setHeaderShadow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerShadow]);

  return (
    <RootLayout>
      <Layout id={"app"}>
        {pageLayout && (
          <div
            id="page-layout-header-image"
            style={{ background: token.colorPrimary }}
          >
            <Image src={VectorGroup} alt="header" className="vector-group" />
          </div>
        )}
        <div id={"header-container"}>
          <Header
            id={"header"}
            className={classNames(headerShadow && "header-shadow")}
            style={{
              backgroundColor: pageLayout ? token.colorPrimary : "white",
            }}
          >
            <div className="header-container">
              <a href="/" style={{ display: "flex" }}>
                {!pageLayout || showMobileMenu ? (
                  <LogoPUPRSvg />
                ) : (
                  <LogoPUPRInverseSvg />
                )}
              </a>
              {!AuthPage && (
                <Fragment>
                  {isMobileScreen ? (
                    <>
                      <div
                        className={`hamburger-menu ${
                          showMobileMenu ? "active" : ""
                        }`}
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                      >
                        <div
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <div
                            className={`hamburger-bar`}
                            style={{
                              background: !pageLayout
                                ? token.colorPrimary
                                : token.colorInfo,
                            }}
                          />
                          <div
                            className={`hamburger-bar`}
                            style={{
                              background: !pageLayout
                                ? token.colorPrimary
                                : token.colorInfo,
                            }}
                          />
                          <div
                            className={`hamburger-bar`}
                            style={{
                              background: !pageLayout
                                ? token.colorPrimary
                                : token.colorInfo,
                            }}
                          />
                        </div>
                      </div>
                      {showMobileMenu && <MobileMenu />}
                    </>
                  ) : (
                    <DesktopMenu pageLayout={pageLayout} />
                  )}
                </Fragment>
              )}
            </div>
          </Header>
        </div>
        <Content id={"content"}>{children}</Content>
        {!AuthPage && (
          <Footer
            id={"footer"}
            style={{
              borderTop: `solid ${token.colorInfo} 10px`,
            }}
          >
            <FooterWidget />
          </Footer>
        )}
      </Layout>
    </RootLayout>
  );
}
