import { useApiV3 } from "@helpers/ApiHelper";
import jwt from "jsonwebtoken";
import { useState } from "react";

export default function useAccount() {
  const apiV3 = useApiV3();

  const login = async (
    uri: string,
    body: TLoginForm | TLoginDeveloperForm | TLoginByTokenOTP | TLupaPasswordForm | TLupaPasswordTokenForm
  ) => {
    localStorage.setItem("accessTokenInternal", "");
    localStorage.setItem("refreshToken", "");

    const response = await apiV3.post<TLoginRes>(uri, body);
    if (response?.data?.isLoggedIn) {
      const { accessTokenInternal, refreshToken } = response.data;
      localStorage.setItem("accessTokenInternal", accessTokenInternal);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MjIsIm5hbWEiOiJQVC4gR2FuZXNoYSIsInVzZXJuYW1lIjoicGVuZ2VtYmFuZ2FuX3NpYmFydSIsImVtYWlsIjoiZXhlLmJsYWNrY2hlcnJ5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJ5JDEyJC5YTHc5VjZQa2w2Ti5DSTdvcm5aVGU4Wm9XMEprQklTVjQ0RGpaRmlhWUQvVk5uSEJpbGdHIiwiUm9sZUlkIjoxLCJQcm92aW5zaUlkIjpudWxsLCJLb250cmFrSWQiOm51bGwsImNpdHlJZCI6bnVsbCwicGVuZ2VtYmFuZ0lkIjpudWxsLCJyZWdpb24iOiJ7XCJwcm92aW5zaVwiOltdLFwia2FidXBhdGVuXCI6W119IiwiYWN0aXZlIjp0cnVlLCJpbnN0YW5zaSI6IlBULiBHYW5lc2hhIiwiYWxhbWF0SW5zdGFuc2kiOiJCYWxpIiwibmlwIjpudWxsLCJkaXRSdXN1c1VzZXJJZCI6bnVsbCwibHVwYVRva2VuIjoiMjAyMi0wMyNYRzZCTTJLTzcxNExUVUs4UjA4RlFEVDQ2RlZCODNZRVc3MDY0VTBNU1haSkhNTEJTRDIyS1pTQVQ4V1pOMTNGRjQ1VkhITkRCVUpDMjFOTzRUTURNSVIxTVFQUkUyUDdVODk1IiwiY3JlYXRlZEF0IjoiMjAyMC0wNS0wM1QyMDo0MDoxMy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMi0wMy0xN1QwMjo1Njo1Mi4wMDBaIiwiUGVuZ2VtYmFuZ0lkIjpudWxsLCJEaXJla3RvcmF0SWQiOm51bGwsIkNpdHlJZCI6bnVsbCwiUm9sZSI6eyJpZCI6MSwibmFtYSI6IlN1cGVyIEFkbWluIiwicHJpdmlsZWdlIjoie1wic3VwZXJBZG1pblwiOjEsXCJkaXRSdXN1c1wiOntcImFjY2Vzc1wiOjEsXCJsaXN0VXN1bGFuXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwiZGV0YWlsVXN1bGFuXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwidmVybWluXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwidmVydGVrXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9fSxcImRpdFJ1c3VuXCI6e1wiYWNjZXNzXCI6MSxcImxpc3RVc3VsYW5cIjp7XCJ2aWV3XCI6MSxcImNyZWF0ZVwiOjEsXCJ1cGRhdGVcIjoxLFwiZGVsZXRlXCI6MX0sXCJkZXRhaWxVc3VsYW5cIjp7XCJ2aWV3XCI6MSxcImNyZWF0ZVwiOjEsXCJ1cGRhdGVcIjoxLFwiZGVsZXRlXCI6MX0sXCJ2ZXJtaW5cIjp7XCJ2aWV3XCI6MSxcImNyZWF0ZVwiOjEsXCJ1cGRhdGVcIjoxLFwiZGVsZXRlXCI6MX0sXCJ2ZXJ0ZWtcIjp7XCJ2aWV3XCI6MSxcImNyZWF0ZVwiOjEsXCJ1cGRhdGVcIjoxLFwiZGVsZXRlXCI6MX19LFwiZGl0UnVrXCI6e1wiYWNjZXNzXCI6MSxcImxpc3RVc3VsYW5cIjp7XCJ2aWV3XCI6MSxcImNyZWF0ZVwiOjEsXCJ1cGRhdGVcIjoxLFwiZGVsZXRlXCI6MX0sXCJkZXRhaWxVc3VsYW5cIjp7XCJ2aWV3XCI6MSxcImNyZWF0ZVwiOjEsXCJ1cGRhdGVcIjoxLFwiZGVsZXRlXCI6MX0sXCJ2ZXJtaW5cIjp7XCJ2aWV3XCI6MSxcImNyZWF0ZVwiOjEsXCJ1cGRhdGVcIjoxLFwiZGVsZXRlXCI6MX0sXCJ2ZXJ0ZWtcIjp7XCJ2aWV3XCI6MSxcImNyZWF0ZVwiOjEsXCJ1cGRhdGVcIjoxLFwiZGVsZXRlXCI6MX19LFwiZGl0U3dhZGF5YVwiOntcImFjY2Vzc1wiOjEsXCJsaXN0VXN1bGFuXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwiZGV0YWlsVXN1bGFuXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwidmVybWluXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwidmVydGVrXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9fSxcInVzZXJNYW5hZ2VtZW50XCI6e1wiYWNjZXNzXCI6MSxcImxpc3RVc2VyXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9fSxcInJvbGVNYW5hZ2VtZW50XCI6e1wiYWNjZXNzXCI6MSxcImxpc3RSb2xlXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwiZGV0YWlsUm9sZVwiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfX0sXCJkZXZlbG9wZXJNYW5hZ2VtZW50XCI6e1wiYWNjZXNzXCI6MSxcImxpc3REZXZlbG9wZXJcIjp7XCJ2aWV3XCI6MSxcImNyZWF0ZVwiOjEsXCJ1cGRhdGVcIjoxLFwiZGVsZXRlXCI6MX19LFwia29tcG9uZW5QZW5nYWp1YW5cIjp7XCJhY2Nlc3NcIjoxLFwibGlzdEtvbXBvbmVuUGVuZ2FqdWFuXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9fSxcInJla2FwaXR1bGFzaVVzdWxhblwiOntcImFjY2Vzc1wiOjEsXCJsaXN0UmVrYXBpdHVsYXNpVXN1bGFuXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9fSxcInNldHRpbmdzXCI6e1wiYWNjZXNzXCI6MSxcImxpc3RTZXR0aW5nXCI6e1wiUGFyYW1ldGVyUnVrXCI6MSxcIlBhcmFtZXRlclN3YWRheWFcIjoxLFwiUGFyYW1ldGVyUnVzdW5cIjoxLFwiUGFyYW1ldGVyUnVzdXNcIjoxLFwiQXBpUnVzdXNcIjoxfX19IiwibGV2ZWwiOm51bGwsInBlbmdlbWJhbmciOm51bGwsIkRpcmVrdG9yYXRJZCI6OTk5LCJTY29wZVJlZ2lvblJvbGVJZCI6MSwiZGlyZWt0aWYiOjIsInBlbmd1c3VsIjpudWxsLCJzY29wZUNydWQiOiJ7XCJ2aWV3XCI6dHJ1ZSxcInVwZGF0ZVwiOnRydWUsXCJkZWxldGVcIjp0cnVlfSIsImFkbWluIjp0cnVlLCJkYXNoYm9hcmQiOjEsImRlZmF1bHRMb2dpbiI6MCwiY3JlYXRlZEF0IjoiMjAxOS0wOS0yNlQxNzowMDowMC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wNi0yOVQwMTo1MjoxNy4wMDBaIn0sIlBlbmdlbWJhbmciOm51bGwsIlByb3ZpbnNpIjpudWxsLCJDaXR5IjpudWxsfSwiaWF0IjoxNjkzMjY5MTg2LCJleHAiOjE2OTM4NzM5ODZ9._EcTvtLP7uMmllcyP6v9umiYwiJcKwHThA4XkgQ-xfM"
      );
    }
    return response?.data;
  };

  const verifyLoginOTPDeveloper = async (body: TVerifyLoginOTPDeveloper) => {
    return apiV3.post("/sso/account/pengembang-otp/verify", body);
  };
  const loginDeveloper = async (body: TLoginDeveloperForm) => {
    return apiV3.post("/sso/account/pengembang-otp", body);
  };
  const postLogin = async (body: TLoginForm) => {
    return login("/sso/account/login", body);
  };
  const lupaPassword = async (body: TLupaPasswordForm) => {
    return apiV3.post("/sso/account/forgot-password", body);
  };
  const lupaPasswordToken = async (body: TLupaPasswordTokenForm) => {
    return apiV3.post("/sso/account/forgot-password/verify", body);
  };

  const postLoginByOTP = async (tokenOTP: string) => {
    return login("/sso/account/login-by-otp", { tokenOTP });
  };

  const putResetPassword = async (body: TResetPasswordForm) => {
    const response = await apiV3.put<Omit<TLoginRes, "resetToken">>(
      "/sso/account/reset-password",
      body
    );
    if (response?.data) {
      const { accessTokenInternal, refreshToken } = response.data;
      localStorage.setItem("accessTokenInternal", accessTokenInternal);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("token", accessTokenInternal);
    }
    return response?.data;
  };

  const putUpdatePassword: any = (body: TUpdatePasswordForm) => {
    return apiV3.put("/sso/account/update-password", body);
  };

  const putUpdateProfile: any = (body: TUpdateProfileForm) => {
    return apiV3.put("/sso/account/update-profile", body);
  };

  const postLogout: any = () => {
    const token = localStorage.getItem("refreshToken");

    return apiV3.post("/sso/account/logout", { token }).then((res: any) => {
      localStorage.removeItem("accessTokenInternal");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
    });
  };
  const logoutDeveloper = () => {
    localStorage.removeItem("accessTokenInternal");
  };

  const isLoggedIn = (): boolean => {
    if (typeof window === "undefined") return false;
    if (!localStorage.getItem("accessTokenInternal")) return false;
    try {
      const profile = decodeAccountProfile();
      if (!profile.user) return false;

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const decodeAccountProfile = (): TAccountProfile => {
    if (typeof window === "undefined") return;
    return jwt.decode(localStorage.getItem("accessTokenInternal"));
  };

  let decodedProfile: TProfile;
  if (isLoggedIn()) decodedProfile = decodeAccountProfile().user;

  const [profile, setProfile] = useState(decodedProfile);

  const getProfile = () => {
    return apiV3.get("/sso/account").then((res) => {
      setProfile(res.data);
    });
  };

  return {
    postLogin,
    loginDeveloper,
    verifyLoginOTPDeveloper,
    logoutDeveloper,
    postLoginByOTP,
    postLogout,
    isLoggedIn,
    profile,
    putUpdatePassword,
    putUpdateProfile,
    getProfile,
    putResetPassword,
    decodeAccountProfile,
    lupaPassword,
    lupaPasswordToken
  };
}
