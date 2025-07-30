import { useApiV3 } from "@helpers/ApiHelper";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_THEME = {
  name: "Default",
  primaryColor: "#273763",
  secondaryColor: "#ffc928",
  applied: true,
};
export interface Theme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  applied: boolean;
}
const getTheme = () => {
  const apiV3 = useApiV3();
  return apiV3.get(`/portalperumahan/pengaturan`, {
    params: { filtered: JSON.stringify([{ id: "eq$key", value: "theme" }]) },
  });
};

export default function useTheme() {
  return useQuery({
    queryKey: ["applied-theme"],
    queryFn: () => getTheme(),
    select(response: any) {
      const data = response?.data?.data?.[0]?.params;
      const appliedTheme = data
        ? (JSON.parse(data)?.find((theme) => theme.applied) as Theme)
        : DEFAULT_THEME;
      return appliedTheme ? appliedTheme : DEFAULT_THEME;
    },
    initialData() {
      return DEFAULT_THEME;
    },
  });
}
