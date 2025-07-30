import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, App as AntdApplicationWapper } from "antd";

import { applyPrototypes } from "@helpers/PrototypeHelper";
import { GlobalProvider } from "@stores/GlobalStore";
import { AuthProvider } from "@stores/AuthStore";
import { useEffect } from "react";

import "@styles/global.scss";
import useTheme from "@hooks/useTheme";

applyPrototypes();

const queryClient = new QueryClient();

function ThemeProvider({ children }) {
  const { data, isLoading } = useTheme();
  const primaryColor = data?.primaryColor;
  const secondaryColor = data?.secondaryColor;
  return (
    <>
      {isLoading && !data ? null : (
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Quicksand",
              colorPrimary: primaryColor,
              colorInfo: secondaryColor,
              borderRadius: 6,
              controlOutline: primaryColor,
              colorLink: primaryColor,
            },
            components: {
              Input: { controlHeight: 48 },
              Modal: {
                borderRadiusLG: 20,
              },
              Form: {
                colorTextHeading: "#5A5A5D",
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      )}
    </>
  );
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const maps_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNDE0LCJuYW1hIjoiRGV2IFNJQkFSVSIsInVzZXJuYW1lIjoic2liYXJ1XzIwMjEiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJ5JDEwJDJTa1pHYW8uMUN1eER1TVFoTmo3dnV3WkVUM0ZVakNqRlZwRW9halBETFMxbGlMeXRTVlN1IiwiUm9sZUlkIjoxLCJQcm92aW5zaUlkIjpudWxsLCJLb250cmFrSWQiOm51bGwsImNpdHlJZCI6bnVsbCwicGVuZ2VtYmFuZ0lkIjpudWxsLCJyZWdpb24iOiJ7XCJwcm92aW5zaVwiOltdLFwia2FidXBhdGVuXCI6W119IiwiYWN0aXZlIjp0cnVlLCJpbnN0YW5zaSI6IlBlbmdlbWJhbmdhbiBTSUJBUlUiLCJhbGFtYXRJbnN0YW5zaSI6IktlbWVudGVyaWFuIFBVUFIiLCJuaXAiOm51bGwsImRpdFJ1c3VzVXNlcklkIjpudWxsLCJsdXBhVG9rZW4iOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMDUtMjVUMTA6MzA6MjUuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDUtMjVUMTA6MzA6MjUuMDAwWiIsIlBlbmdlbWJhbmdJZCI6bnVsbCwiRGlyZWt0b3JhdElkIjpudWxsLCJDaXR5SWQiOm51bGwsIlJvbGUiOnsiaWQiOjEsIm5hbWEiOiJTdXBlciBBZG1pbiIsInByaXZpbGVnZSI6IntcInN1cGVyQWRtaW5cIjoxLFwiZGl0UnVzdXNcIjp7XCJhY2Nlc3NcIjoxLFwibGlzdFVzdWxhblwiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfSxcImRldGFpbFVzdWxhblwiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfSxcInZlcm1pblwiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfSxcInZlcnRla1wiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfX0sXCJkaXRSdXN1blwiOntcImFjY2Vzc1wiOjEsXCJsaXN0VXN1bGFuXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwiZGV0YWlsVXN1bGFuXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwidmVybWluXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwidmVydGVrXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9fSxcImRpdFJ1a1wiOntcImFjY2Vzc1wiOjEsXCJsaXN0VXN1bGFuXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwiZGV0YWlsVXN1bGFuXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwidmVybWluXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9LFwidmVydGVrXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9fSxcImRpdFN3YWRheWFcIjp7XCJhY2Nlc3NcIjoxLFwibGlzdFVzdWxhblwiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfSxcImRldGFpbFVzdWxhblwiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfSxcInZlcm1pblwiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfSxcInZlcnRla1wiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfX0sXCJ1c2VyTWFuYWdlbWVudFwiOntcImFjY2Vzc1wiOjEsXCJsaXN0VXNlclwiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfX0sXCJyb2xlTWFuYWdlbWVudFwiOntcImFjY2Vzc1wiOjEsXCJsaXN0Um9sZVwiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfSxcImRldGFpbFJvbGVcIjp7XCJ2aWV3XCI6MSxcImNyZWF0ZVwiOjEsXCJ1cGRhdGVcIjoxLFwiZGVsZXRlXCI6MX19LFwiZGV2ZWxvcGVyTWFuYWdlbWVudFwiOntcImFjY2Vzc1wiOjEsXCJsaXN0RGV2ZWxvcGVyXCI6e1widmlld1wiOjEsXCJjcmVhdGVcIjoxLFwidXBkYXRlXCI6MSxcImRlbGV0ZVwiOjF9fSxcImtvbXBvbmVuUGVuZ2FqdWFuXCI6e1wiYWNjZXNzXCI6MSxcImxpc3RLb21wb25lblBlbmdhanVhblwiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfX0sXCJyZWthcGl0dWxhc2lVc3VsYW5cIjp7XCJhY2Nlc3NcIjoxLFwibGlzdFJla2FwaXR1bGFzaVVzdWxhblwiOntcInZpZXdcIjoxLFwiY3JlYXRlXCI6MSxcInVwZGF0ZVwiOjEsXCJkZWxldGVcIjoxfX0sXCJzZXR0aW5nc1wiOntcImFjY2Vzc1wiOjEsXCJsaXN0U2V0dGluZ1wiOntcIlBhcmFtZXRlclJ1a1wiOjEsXCJQYXJhbWV0ZXJTd2FkYXlhXCI6MSxcIlBhcmFtZXRlclJ1c3VuXCI6MSxcIlBhcmFtZXRlclJ1c3VzXCI6MSxcIkFwaVJ1c3VzXCI6MX19fSIsImxldmVsIjpudWxsLCJwZW5nZW1iYW5nIjpudWxsLCJEaXJla3RvcmF0SWQiOjk5OSwiU2NvcGVSZWdpb25Sb2xlSWQiOjEsImRpcmVrdGlmIjoyLCJwZW5ndXN1bCI6bnVsbCwic2NvcGVDcnVkIjoie1widmlld1wiOnRydWUsXCJ1cGRhdGVcIjp0cnVlLFwiZGVsZXRlXCI6dHJ1ZX0iLCJhZG1pbiI6dHJ1ZSwiZGFzaGJvYXJkIjoxLCJkZWZhdWx0TG9naW4iOjAsImNyZWF0ZWRBdCI6IjIwMTktMDktMjZUMTc6MDA6MDAuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMjlUMDE6NTI6MTcuMDAwWiJ9LCJQZW5nZW1iYW5nIjpudWxsLCJQcm92aW5zaSI6bnVsbCwiQ2l0eSI6bnVsbH0sImlhdCI6MTY5MjY2MjAwOCwiZXhwIjoxNjkzMjY2ODA4fQ.49sfMncy-HZhPl6WIaBdvQpcLULfnFAvfUOQecrD2NQ`;
    localStorage.setItem("maps_token", maps_token);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AntdApplicationWapper>
          <GlobalProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </GlobalProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </AntdApplicationWapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
