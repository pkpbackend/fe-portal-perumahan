import { useApiV3 } from "@helpers/ApiHelper";
import { useQuery } from "@tanstack/react-query";

interface LayananDeskripsi {
  id: number;
  key: string;
  params: string;
  createdAt: string;
  updatedAt: string;
}
const getDescription = (key: string) => {
  const apiV3 = useApiV3();
  return apiV3.get<{ data: LayananDeskripsi[] }>(
    `/portalperumahan/pengaturan?filtered=[{"id":"eq$key","value":"${key}"}]`
  );
};

export default function useDeskripsiLayanan(
  key: string,
  options?: { enabled: boolean }
) {
  return useQuery({
    queryKey: ["deskripsi-layanan", key],
    queryFn: () => getDescription(key),
    select(response) {
      return response.data?.data?.[0];
    },
    ...options,
  });
}
