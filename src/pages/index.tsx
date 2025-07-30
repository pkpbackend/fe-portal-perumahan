import { getSettingByKey } from "@hooks/setting/useSettingByKey";
import AppLayout from "@layouts/AppLayout";
import HomeView from "@views/Home/HomeView";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import Cookies from "js-cookie";

export interface BannerHomepage {
  title?: string;
  description?: string;
  filepathDesktop?: string;
  filepathMobile?: string;
}
export interface HomePageProps {
  bannerItems: Array<BannerHomepage>;
}
export const getStaticProps = (async () => {
  const response = await getSettingByKey("slider");

  if (response?.data?.data?.length > 0) {
    return {
      props: { bannerItems: JSON.parse(response?.data?.data?.[0].params) },
    };
  }
  return { props: { bannerItems: [] } };
}) as GetStaticProps<HomePageProps>;

export default function HomePage({
  bannerItems,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    const kuki = Cookies.get("pp-cookie");

    if (kuki) {
      const token = JSON.parse(kuki);

      localStorage.setItem("accessTokenInternal", "");
      localStorage.setItem("refreshToken", "");

      if (token.isLoggedIn) {
        const { accessTokenInternal, refreshToken } = token;
        localStorage.setItem("accessTokenInternal", accessTokenInternal);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("token", accessTokenInternal);
        Cookies.remove("pp-cookie");
      }
    }
  }, []);

  return (
    <AppLayout>
      <HomeView bannerItems={bannerItems} />
    </AppLayout>
  );
}
