import { useApiV3 } from "@helpers/ApiHelper";
import { useQuery } from "@tanstack/react-query";

interface Setting {
  id: string;
  key: string;
  params: string;
}
interface Settings {
  data: Array<Setting>;
  total: number;
}
export const getSettingByKey = (key: string) => {
  const apiV3 = useApiV3();
  return apiV3.get(`/portalperumahan/pengaturan`, {
    params: { filtered: JSON.stringify([{ id: "eq$key", value: key }]) },
  });
};

export default function useSettingByKey(key: string) {
  return useQuery({
    queryKey: ["pengaturan", key],
    queryFn: () => getSettingByKey(key),
    select(response: { data: Settings }) {
      return response?.data?.data[0] || null;
    },
    staleTime: Infinity,
    enabled: Boolean(key),
  });
}
