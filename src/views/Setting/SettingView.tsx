import { Modal, Tabs, Typography, theme } from "antd";
import Head from "next/head";

import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import SettingFooterSegment from "./Partials/SettingFooterSegment";
import SettingLoginSegment from "./Partials/SettingLoginSegment";
import SettingServicesSegment from "./Partials/SettingServicesSegment";
import style from "./SettingStyle.module.scss";
import store, {
  closeModal,
  useSettingDispatch,
  useSettingSelector,
} from "./store";
import SettingLandingPageSegment from "./Partials/SettingLandingPageSegment";
import FormApplication from "./Partials/FormApplication";
import FormHomeSlider from "./Partials/FormHomeSlider";
import FormLink from "./Partials/FormLink";
import useAccount from "@hooks/useAccount";
import SettingThemeSegment from "./Partials/SettingThemeSegment";

const PORTAL_LOGIN_ACTION_CODE = "portal_login";
const PORTAL_LANDING_ACTION_CODE = "portal_landing";
const PORTAL_SERVICE_DESCRIPTION_ACTION_CODE = "portal_service_description";
const PORTAL_FOOTER_ACTION_CODE = "portal_footer";

const FormEditor = dynamic(() => import("./Partials/FormEditor"), {
  ssr: false,
});

const items = [
  {
    label: "Theme",
    key: "portal_theme",
    children: <SettingThemeSegment />,
  },
  {
    label: "Login",
    key: PORTAL_LOGIN_ACTION_CODE,
    children: <SettingLoginSegment />,
  },
  {
    label: "Landing",
    key: PORTAL_LANDING_ACTION_CODE,
    children: <SettingLandingPageSegment />,
  },
  {
    label: "Deskripsi Layanan",
    key: PORTAL_SERVICE_DESCRIPTION_ACTION_CODE,
    children: <SettingServicesSegment />,
  },
  {
    label: "Footer",
    key: PORTAL_FOOTER_ACTION_CODE,
    children: <SettingFooterSegment />,
  },
];

const { useToken } = theme;
export default function SettingView() {
  const { token } = useToken();
  const { profile } = useAccount();
  const acl = profile?.Role?.accessMenu;

  const dispatch = useSettingDispatch();
  const state = useSettingSelector((state) => state.setting);
  return (
    <Provider store={store}>
      <section className={style.container}>
        <Head>
          <title>Pengaturan | SIBARU</title>
        </Head>
        <div className={style.pageTitle}>
          <h2 style={{ color: token.colorInfo }}>
            PENGATURAN
            <br />
            <span style={{ color: "white" }}>SIBARU</span>
          </h2>
        </div>

        <section className={style.wrapper}>
          <div className={style.content}>
            <Tabs
              size="large"
              items={items.filter(
                (item) => acl.includes(item.key) || item.key === "portal_theme"
              )}
              className={style.settingTabs}
              tabBarStyle={{ marginBottom: 24 }}
            />
          </div>
        </section>
      </section>
      <Modal
        open={state.open}
        title={`Konten ${state.name}`}
        width="90%"
        onCancel={() => dispatch(closeModal())}
        footer={null}
      >
        {state.type === "editor" && <FormEditor />}
        {state.type === "link" && <FormLink />}
        {state.type == "aplikasi" && <FormApplication />}
        {state.type == "slider" && <FormHomeSlider />}
      </Modal>
    </Provider>
  );
}
